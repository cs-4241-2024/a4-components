import React, { useState, useEffect } from 'react';

// Main component
const GuestList = () => {
  const [name, setName] = useState(''); // Store form input value
  const [names, setNames] = useState([]); // Store the list of names

  // Fetch the names from the server when the component loads
  useEffect(() => {
    fetchNames();
  }, []);

  // Function to edit a name in the list
  const editName = async (guestNameToEdit) => {
    const newGuestName = prompt(`Editing: ${guestNameToEdit}. Enter New Name:`);
    if (!newGuestName) return;

    try {
      const response = await fetch('/editName', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest_name: guestNameToEdit, newGuestName }),
      });
      const result = await response.json();
      console.log('Edited:', result);
      fetchNames(); // Refresh the list after editing
    } catch (error) {
      console.error('Error editing name:', error);
    }
  };

  // Function to delete a name from the list
  const deleteName = async (guestNameToDelete) => {
    try {
      const response = await fetch('/deleteName', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ guest_name: guestNameToDelete }),
      });
      const result = await response.json();
      console.log('Deleted:', result);
      fetchNames(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting name:', error);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    addName(name);
    setName(''); // Clear the input field after submission
  };

  // Fetch names from the server
  const fetchNames = async () => {
    try {
      const response = await fetch('/getNames');
      const data = await response.json();
      setNames(data);
    } catch (error) {
      console.error('Error fetching names:', error);
    }
  };

  // Add a new name to the server
  const addName = async (newName) => {
    try {
      const response = await fetch('/addName', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      const result = await response.json();
      console.log('Added:', result);
      fetchNames(); // Refresh the list
    } catch (error) {
      console.error('Error adding name:', error);
    }
  };

  // Render the form and name list
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Guest List</h1>

      <form onSubmit={handleSubmit} className="flex items-center space-x-4 mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter name"
          required
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>

      <h2 className="text-xl font-semibold text-gray-700 mb-4">List</h2>
      <ul className="space-y-2">
        {names.map((item, index) => (
          <li key={index} className="bg-gray-100 p-4 rounded-lg flex justify-between items-center shadow-sm">
            <div>
              <span className="font-medium text-lg text-gray-800">{item.guest_name}</span>
              <p className="text-sm text-gray-500">Invited by: {item.invited_by}</p>
            </div>
            <div className="flex space-x-2">
              {/* Edit Button */}
              <button
                onClick={() => editName(item.guest_name)}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Edit
              </button>
              {/* Delete Button */}
              <button
                onClick={() => deleteName(item.guest_name)}
                className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GuestList;
