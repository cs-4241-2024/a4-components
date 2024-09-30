import React, { useState, useEffect } from 'react';
import GuestList from './GuestList.jsx';
import Login from './Login.jsx';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track auth status
  const [loading, setLoading] = useState(true); // Track loading state

  // Check authentication status when the app loads
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/protected'); // Check authentication API
        if (response.ok) {
          setIsAuthenticated(true); // Set authenticated if successful
        } else {
          setIsAuthenticated(false); // Otherwise, not authenticated
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false); // Stop loading regardless of auth status
      }
    };

    checkAuth();
  }, []);

  // Show loading message while checking auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render Login page if not authenticated
  if (!isAuthenticated) {
    return <Login setIsAuthenticated={setIsAuthenticated} />;
  }

  // Render the main app (GuestList) if authenticated
  return <GuestList />;
};

export default App;
