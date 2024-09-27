import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [employeeData, setEmployeeData] = useState({
    employeeId: '',
    name: '',
    salary: '',
    regDate: ''
  });

  const [employeeList, setEmployeeList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  // Load employees from localStorage on initial render
  useEffect(() => {
    const savedEmployees = JSON.parse(localStorage.getItem('employees'));
    if (savedEmployees) {
      setEmployeeList(savedEmployees);
    }
  }, []);

  // Save employees to localStorage whenever the employeeList changes
  useEffect(() => {
    if (employeeList.length > 0) {
      localStorage.setItem('employees', JSON.stringify(employeeList)); // Save to localStorage on every update
    }
  }, [employeeList]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const expirationYear = parseInt(employeeData.regDate) + 5;
    const newEmployee = {
      ...employeeData,
      expirationYear
    };

    if (isEditing) {
      const updatedList = employeeList.map((emp, index) => 
        index === editIndex ? newEmployee : emp
      );
      setEmployeeList(updatedList);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      setEmployeeList([...employeeList, newEmployee]);
    }

    // Reset form
    setEmployeeData({
      employeeId: '',
      name: '',
      salary: '',
      regDate: ''
    });
  };

  const handleEdit = (index) => {
    const employeeToEdit = employeeList[index];
    setEmployeeData({
      employeeId: employeeToEdit.employeeId,
      name: employeeToEdit.name,
      salary: employeeToEdit.salary,
      regDate: employeeToEdit.regDate
    });
    setIsEditing(true);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedList = employeeList.filter((_, i) => i !== index);
    setEmployeeList(updatedList);
  };

  return (
    <div className="App">
      <header>
        Employee Form
      </header>
      <p>Fill out ALL of the form before submitting data.</p>
      <form id="employeeForm" onSubmit={handleSubmit}>
        <input 
          type="text" 
          id="employeeId" 
          value={employeeData.employeeId} 
          onChange={handleInputChange} 
          placeholder="Your employee ID" 
          required
        />
        <input 
          type="text" 
          id="name" 
          value={employeeData.name} 
          onChange={handleInputChange} 
          placeholder="Your name here" 
          required
        />
        <input 
          type="text" 
          id="salary" 
          value={employeeData.salary} 
          onChange={handleInputChange} 
          placeholder="Your yearly salary" 
          required
        />
        <input 
          type="text" 
          id="regDate" 
          value={employeeData.regDate} 
          onChange={handleInputChange} 
          placeholder="ID registration year" 
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Submit'}</button>
      </form>

      <table id="employeeTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Registration Year</th>
            <th>Expiration Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee, index) => (
            <tr key={index}>
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>{employee.salary}</td>
              <td>{employee.regDate}</td>
              <td>{employee.expirationYear}</td>
              <td>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
