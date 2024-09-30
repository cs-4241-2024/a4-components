import React from 'react';

const AssignmentList = ({ assignments }) => {
  return (
    <div>
      <h2>Your Assignments</h2>
      <ul>
        {assignments.map((assignment, index) => (
          <li key={index}>
            {assignment.className} - {assignment.assignmentName} (Due: {assignment.dueDate})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;
