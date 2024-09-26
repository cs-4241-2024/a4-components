import React, { useState } from 'react';
import './App.css';

function App() {
  const [employeeData, setEmployeeData] = useState({
    employeeId: '',
    name: '',
    salary: '',
    regDate: ''
  });

  const [employeeList, setEmployeeList] = useState([]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEmployeeData({
      ...employeeData,
      [id]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const expirationYear = parseInt(employeeData.regDate) + 5; // Example expiration year logic
    const newEmployee = {
      ...employeeData,
      expirationYear
    };
    setEmployeeList([...employeeList, newEmployee]);
    
    // Reset form
    setEmployeeData({
      employeeId: '',
      name: '',
      salary: '',
      regDate: ''
    });
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
        <button type="submit">Submit</button>
      </form>

      <table id="employeeTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Salary</th>
            <th>Registration Year</th>
            <th>Expiration Year</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
