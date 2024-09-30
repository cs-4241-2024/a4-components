import React, { useState } from 'react';

const Login = () => {
  // States to manage username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page

    try {
      // Send the username and password to the server
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json(); // Parse the response as JSON

      if (data.success) {
        // Store username in session storage and redirect to home page
        sessionStorage.setItem('username', username);
        window.location.href = '/home.html';
      } else {
        setErrorMessage(data.message); // Show error message from server
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Something went wrong. Please try again.');
    }

    // Clear the input fields
    setUsername('');
    setPassword('');
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="input-field">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Update username state
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="input-field">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2 text-center">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
