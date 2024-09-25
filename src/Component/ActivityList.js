import React from 'react';

const ActivityList = ({ activities, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Activity Type</th>
                <th>Details</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
            </thead>
            <tbody>
            {activities.map((activity, index) => (
                <tr key={index}>
                    <td>{activity.activityType}</td>
                    <td>{activity.details.course || activity.details.entertainmentType || activity.details.sleepDate}</td>
                    <td><button onClick={() => onEdit(activity, index)}>Edit</button></td>
                    <td><button onClick={() => onDelete(activity._id)}>Delete</button></td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default ActivityList;
