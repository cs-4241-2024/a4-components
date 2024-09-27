import { useEffect, useState } from 'react';
import ActivityList from './ActivityList';
import WorkForm from './WorkForm';
import Entertainment from './Entertainment';
import Sleep from './Sleep';
import { API } from '../config';

function Home() {
  const [showActivityList, setShowActivityList] = useState(false);
  const [formType, setFormType] = useState('');
  const [activities, setActivities] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingActivity, setEditingActivity] = useState();

  useEffect(() => {
    fetchActivities();
  }, []);

  // Fetch and display activities on initial load
  async function fetchActivities() {
    try {
      const response = await fetch(`${API}getActivities`);
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      const data = await response.json();
      setActivities(data); // Update the activities array with server data
      setShowActivityList(true); // Call the function to display the activities
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  }

  const onSubmit = async (type, details) => {
    try {
      const activityData = {
        activityType: type,
        details
      }
      const response = await fetch(editingIndex !== null ? `${API}updateActivity` : `${API}addActivity`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...activityData, activityId: activities[editingIndex]?._id }) // Send ID if editing
      });

      if (!response.ok) {
        throw new Error('Failed to save activity');
      }

      alert('Activity saved successfully!');
      setFormType('');
      fetchActivities();  // Refresh the list after saving
      setEditingIndex(null) // Reset the editing index after saving
    } catch (error) {
      console.error('Error saving activity:', error);
    }
  }

  const onEdit = (activity) => {
    setFormType(activity.activityType)
    setEditingActivity(activity)
    setEditingIndex(activities.findIndex(item => item._id === activity._id))
  }

  const onDelete = async (activity) => {
    const confirmed = window.confirm('Are you sure you want to delete this activity?');

    if (confirmed) {
      try {
        const response = await fetch(`${API}deleteActivity`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activityId: activity._id })
        });

        if (!response.ok) {
          throw new Error('Failed to delete activity');
        }

        alert('Activity deleted successfully!');
        fetchActivities();  // Reload the activity list
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  }

  return (
    <div>
      <h1>Activity Tracker</h1>

      <div id="start-page">
        <h2>What would you like to track?</h2>
        <button id="choose-work" onClick={() => setFormType('work')}>Work</button>
        <button id="choose-entertainment" onClick={() => setFormType('entertainment')}>Entertainment</button>
        <button id="choose-sleep" onClick={() => setFormType('sleep')}>Sleep</button>
        <button id="check-list">Check My List</button>
      </div>

      {
        formType && (
          <div id="form-container">
            {
              formType === 'work' ? <WorkForm onSubmit={onSubmit} editingIndex={editingIndex} activity={editingActivity} /> :
                formType === 'entertainment' ? <Entertainment onSubmit={onSubmit} editingIndex={editingIndex} activity={editingActivity} /> :
                  formType === 'sleep' ? <Sleep onSubmit={onSubmit} editingIndex={editingIndex} activity={editingActivity} /> :
                    null
            }
          </div>
        )
      }

      {
        showActivityList && <ActivityList activities={activities} onEdit={onEdit} onDelete={onDelete} />
      }

      <button id="logout-button" onClick={() => window.location.href = `${API}logout`}>Logout</button>
    </div>
  )
}

export default Home;
