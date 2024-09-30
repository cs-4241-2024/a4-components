import dotenv from "dotenv";
import express from "express";
import ViteExpress from "vite-express";
import mongoose from "mongoose";
import cookie from "cookie-session";

dotenv.config();
const app = express();
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}/a3-persistence?retryWrites=true&w=majority&appName=a3-persistence`;
const clientOptions = {serverApi: {version: '1', strict: true, deprecationErrors: true}};

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
}, {versionKey: false});
const UserModel = mongoose.model("User", userSchema);

const eventSchema = new mongoose.Schema<IEvent>({
    name: {type: String, default: "New Event"},
    time: {type: Date, required: true},
    travel_hrs: {type: Number, min: 0, max: 23},
    travel_mins: {type: Number, min: 0, max: 59},
    depart_time: {type: String, match: /([01]\d|2[0-3]):[0-5][0-9]/},
    user: {type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User"}
}, {versionKey: false});
const EventModel = mongoose.model<IEvent>("Event", eventSchema);

interface IEventTime {
    time: string;
    date: string;
}

interface IEvent {
    _id?: mongoose.Types.ObjectId;
    name: string;
    time: Date | IEventTime;
    travel_hrs?: number | null;
    travel_mins?: number | null;
    depart_time?: string | null;
    user: mongoose.Types.ObjectId;
}

function calc_times(event: IEvent) {
    if (event.time instanceof Date) {
        throw new Error("date is not string");
    }
    if (!event.travel_hrs || !event.travel_mins) {
        throw new Error("travel_hrs & travel_mins is required in calc_depart");
    }
    let time = event.time.time.split(":").slice(0, 2);
    let depart_hr: number = (Number(time[0]) - event.travel_hrs) % 24;
    let depart_min: number = (Number(time[1]) - event.travel_mins) % 60;
    if (depart_min < 0) {
        depart_hr -= 1;
        depart_min += 60;
    }
    depart_hr = depart_hr < 0 ? depart_hr + 24 : depart_hr;
    event.depart_time = ""
    if (depart_hr < 10) {
        event.depart_time += "0";
    }
    event.depart_time += depart_hr + ":";
    if (depart_min < 10) {
        event.depart_time += "0";
    }
    event.depart_time += depart_min;

    event.time = new Date(`${event.time.date}T${event.time.time}:00.000Z`)
    return event;
}

async function run() {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    // @ts-ignore
    await mongoose.connect(uri, clientOptions);
    if (mongoose.connection.db) {
        await mongoose.connection.db.admin().command({ping: 1});
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } else {
        throw new Error("Mongoose not connected");
    }

    app.use(cookie({
        secret: process.env.SESSION_SECRET
    }));

    app.post('/login', express.json(), async (req, res) => {
        console.log(req.body);
        if (!req.session) {
            throw Error("Session not found!");
        }
        if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
            if (!req.session.isPopulated) {
                res.sendStatus(403);
            } else {
                res.json({new: false, user: req.session.user});
            }
            return;
        }
        let user = await UserModel.findOne({'username': req.body.username});

        if (user === null) {
            console.log("Adding user");
            user = await new UserModel(req.body).save();
            req.session.user = user._id;
            res.set('Content-Type', 'text/plain');
            res.status(200);
            res.json({new: true, user: user._id});
        } else if (user.password === req.body.password) {
            req.session.user = user._id;
            res.json({new: true, user: user._id});
        } else {
            res.sendStatus(403);
        }
    });

    app.post('/logout', (req, res) => {
        if (!req.session) {
            throw Error("Session not found!");
        }
        console.log(`Logging out ${req.session.user}`);
        req.session = null;
        res.sendStatus(200);
    });

    app.get("/getEvents", express.json(), async (req, res) => {
        if (!req.session) {
            throw Error("Session not found!");
        }
        console.log("Sending events");

        const events: IEvent[] = await EventModel.find({user: req.session.user}).exec();
        const events2: IEvent[] = JSON.parse(JSON.stringify(events));
        console.log(events2);
        for (let event of events2) {
            console.log(event);
            let parsedTime = (event.time as unknown as string).split("T");
            event.time = {date: parsedTime[0], time: parsedTime[1].slice(0, 5)};
            console.log(event);
        }
        console.log(events2);
        res.json(events2);
    });

    app.post("/addEvent", express.json(), async (req, res) => {
        if (!req.session) {
            throw Error("Session not found!");
        }
        let event: IEvent = req.body;
        event = calc_times(event);
        event.user = req.session.user;
        event._id = undefined;
        console.log(`Add event: ${JSON.stringify(event)}`);
        let new_event = await new EventModel(event).save();
        console.log(JSON.stringify(new_event));
        res.json(new_event);
    });

    app.put("/updateEvent", express.json(), async (req, res) => {
        if (!req.session) {
            throw Error("Session not found!");
        }
        let event: IEvent = req.body;
        console.log(`Update event: ${JSON.stringify(event)}`);
        event = calc_times(event);
        event.user = req.session.user;
        await EventModel.replaceOne({_id: event._id}, event).exec();
        console.log(JSON.stringify(event));
        res.json(event);
    });

    app.delete("/deleteEvent", express.json(), async (req, res) => {
        let id: mongoose.Types.ObjectId = req.body._id;
        console.log(`Delete event: ${JSON.stringify(req.body)}`);
        await EventModel.deleteOne({_id: id}).exec();
        res.end();
    });

    ViteExpress.listen(app, 3000, () =>
        console.log("Server is listening on port 3000..."),
    );
}

run().catch(async (err) => {
    console.error(err);
    await mongoose.disconnect();
});
