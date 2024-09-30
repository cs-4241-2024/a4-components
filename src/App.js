import React, { useState } from 'react';
import AssignmentList from './components/AssignmentList';
import TaskForm from './components/TaskForm'; 

function App() {
  const [assignments, setAssignments] = useState([]);

  const addAssignment = (assignment) => {
    setAssignments([...assignments, assignment]);
  };

  return (
    <div className="App">
      <h1>Assignment Tracker</h1>
      <TaskForm onAddAssignment={addAssignment} />
      <AssignmentList assignments={assignments} />
    </div>
  );
}

export default App;
