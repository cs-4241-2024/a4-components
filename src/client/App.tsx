import 'bootstrap/dist/css/bootstrap.min.css';
// import "./css/App.css";
import {useState} from "react";
import Login from "./Login"
import Home from "./Home";
import mongoose from "mongoose";

function App() {
    const [user, setUser] = useState<string | undefined>(undefined);



    return (
        <>
            {user ? (
                <Home setUser={setUser} />
            ) : (
                <Login setUser={setUser} />
            )}
        </>
    );
}

export interface IEventTime {
    time: string;
    date: string;
}

export interface IEvent {
    _id: string;
    name: string;
    time: IEventTime;
    travel_hrs: string;
    travel_mins: string;
    depart_time: string;
    user: string;
}

export default App;
