import React, { useState } from 'react';
import axios from 'axios';

const ActivityForm = ({ activityType, activity, onSubmit }) => {
    const [formData, setFormData] = useState({
        course: activity?.details?.course || '',
        ddl: activity?.details?.ddl || '',
        expectedTime: activity?.details?.expectedTime || '',
        actualTime: activity?.details?.actualTime || '',
        entertainmentType: activity?.details?.entertainmentType || 'video-game',
        sleepDate: activity?.details?.sleepDate || '',
        sleepTime: activity?.details?.sleepTime || '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiEndpoint = activity ? '/updateActivity' : '/addActivity';
        const payload = { activityType, details: formData, activityId: activity?._id };

        try {
            await axios.post(apiEndpoint, payload);
            alert('Activity saved successfully!');
            onSubmit();  // Notify parent component to refresh the list
        } catch (error) {
            console.error('Error saving activity:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>{activityType === 'work' ? 'Work Form' : activityType === 'entertainment' ? 'Entertainment Form' : 'Sleep Form'}</h3>
            {activityType === 'work' && (
                <>
                    <label>Course:</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} required />
                    <label>Deadline (DDL):</label>
                    <input type="date" name="ddl" value={formData.ddl} onChange={handleChange} required />
                    <label>Expected Finish Time:</label>
                    <input type="time" name="expectedTime" value={formData.expectedTime} onChange={handleChange} required />
                    <label>Actual Finish Time:</label>
                    <input type="time" name="actualTime" value={formData.actualTime} onChange={handleChange} />
                </>
            )}
            {activityType === 'entertainment' && (
                <>
                    <label>Type of Entertainment:</label>
                    <select name="entertainmentType" value={formData.entertainmentType} onChange={handleChange}>
                        <option value="video-game">Video Game</option>
                        <option value="music">Music</option>
                        <option value="fitness">Fitness</option>
                    </select>
                </>
            )}
            {activityType === 'sleep' && (
                <>
                    <label>Date of Sleep:</label>
                    <input type="date" name="sleepDate" value={formData.sleepDate} onChange={handleChange} required />
                    <label>Time of Sleep:</label>
                    <input type="time" name="sleepTime" value={formData.sleepTime} onChange={handleChange} required />
                </>
            )}
            <button type="submit">{activity ? 'Edit' : 'Add'} {activityType}</button>
        </form>
    );
};

export default ActivityForm;
