const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const session = require('express-session');
const mongoose = require('mongoose');
const path = require('path');

// Initialize express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'client/build'))); // Serve static files without auto-indexing
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // For handling JSON requests
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// MongoDB connection string
const mongoURI = 'mongodb+srv://zli29:1225931003l@cluster0.sa8ge.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error: ', err));

// Define User Schema and Model
const userSchema = new mongoose.Schema({
    githubId: String,
    username: String,
});

const User = mongoose.model('User', userSchema);

// Define Activity Schema and Model
const activitySchema = new mongoose.Schema({
    username: String,    // Associate the activity with the username
    activityType: String,
    details: Object
});

const Activity = mongoose.model('Activity', activitySchema);


// GitHub OAuth Setup
passport.use(new GitHubStrategy({
        clientID: 'Ov23liWVmeftceR3mKHf',
        clientSecret: '83ad4d496479dfd7ffc383b3d4e17fb853dcb319',
        callbackURL: 'https://a4-zihan-li-1.onrender.com/auth/github/callback'

    },
    async function (accessToken, refreshToken, profile, done) {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
            user = new User({ githubId: profile.id, username: profile.username });
            await user.save();
        }
        return done(null, user);
    }
));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

// Middleware to ensure authentication
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/github');
}

// GitHub Authentication Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    (req, res) => {
        req.session.username = req.user.username;
        res.redirect('/index');  // Redirect to index after successful authentication
    }
);

// Logout route
app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');  // Redirect to the login page after logging out
    });
});

app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));

// Routes for managing activities
app.post('/addActivity', ensureAuthenticated, async (req, res) => {
    const { activityType, details } = req.body;
    const username = req.session.username;

    console.log('Add Activity Request:', { activityType, details, username });

    if (!activityType || !details) {
        return res.status(400).json({ message: 'Activity type and details are required.' });
    }

    try {
        const newActivity = new Activity({ username, activityType, details });
        await newActivity.save();
        res.json({ message: 'Activity saved successfully!', activity: newActivity });
    } catch (error) {
        console.error('Error saving activity:', error);
        res.status(500).json({ message: 'Error saving activity', error });
    }
});

app.get('/getActivities', ensureAuthenticated, async (req, res) => {
    const username = req.session.username;

    try {
        const activities = await Activity.find({ username });
        res.json(activities); // Make sure to send a JSON response
    } catch (error) {
        console.error('Error fetching activities:', error);
        res.status(500).json({ message: 'Error fetching activities', error });
    }
});



app.post('/updateActivity', ensureAuthenticated, async (req, res) => {
    const { activityId, activityType, details } = req.body;
    const username = req.session.username;

    try {
        const updatedActivity = await Activity.findOneAndUpdate(
            { _id: activityId, username },
            { activityType, details },
            { new: true }
        );
        res.json({ message: 'Activity updated successfully!', activity: updatedActivity });
    } catch (error) {
        res.status(500).json({ message: 'Error updating activity', error });
    }
});

app.post('/deleteActivity', ensureAuthenticated, async (req, res) => {
    const { activityId } = req.body;
    const username = req.session.username;

    try {
        await Activity.findOneAndDelete({ _id: activityId, username });
        res.json({ message: 'Activity deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting activity', error });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
