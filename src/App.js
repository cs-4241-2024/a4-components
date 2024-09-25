import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ActivityForm from './components/ActivityForm';
import ActivityList from './components/ActivityList';

const App = () => {
    const [activities, setActivities] = useState([]);
    const [activityType, setActivityType] = useState(null);
    const [editingActivity, setEditingActivity] = useState(null);

    // Fetch activities from server
    const fetchActivities = async () => {
        try {
            const response = await axios.get('/getActivities');
            setActivities(response.data);
        } catch (error) {
            console.error('Error fetching activities:', error);
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleEdit = (activity) => {
        setActivityType(activity.activityType);
        setEditingActivity(activity);
    };

    const handleDelete = async (activityId) => {
        if (window.confirm('Are you sure you want to delete this activity?')) {
            try {
                await axios.post('/deleteActivity', { activityId });
                fetchActivities();  // Refresh the list
            } catch (error) {
                console.error('Error deleting activity:', error);
            }
        }
    };

    const handleFormSubmit = () => {
        fetchActivities();
        setActivityType(null);  // Hide form after submission
    };

    return (
        <div>
            <h1>Activity Tracker</h1>
            {!activityType ? (
                <div>
                    <button onClick={() => setActivityType('work')}>Track Work</button>
                    <button onClick={() => setActivityType('entertainment')}>Track Entertainment</button>
                    <button onClick={() => setActivityType('sleep')}>Track Sleep</button>
                </div>
            ) : (
                <ActivityForm activityType={activityType} activity={editingActivity} onSubmit={handleFormSubmit} />
            )}
            <ActivityList activities={activities} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
    );
};

export default App;
