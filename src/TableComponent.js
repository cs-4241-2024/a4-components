import React from 'react';
import './TableComponent.css'; // Import the CSS file

const TableComponent = ({ data, editData, deleteData }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Points</th>
                <th>Score</th>
                <th>Difficulty</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.points}</td>
                    <td>{item.score}</td>
                    <td>{item.difficulty}</td>
                    <td className="actions">
                        <button className="edit-button" onClick={() => editData(index)}>Edit</button>
                        <button className="delete-button" onClick={() => deleteData(index)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default TableComponent;