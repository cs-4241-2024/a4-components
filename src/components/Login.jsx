
import React, { useState } from 'react';

const Login = ({ onAuthSuccess }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(isRegistering ? '/register' : '/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            onAuthSuccess();
        } else {
            const errorText = await response.text();
            alert(`Operation failed: ${errorText}`);
        }
    };

    const toggleForms = () => {
        setIsRegistering(!isRegistering);
    };

    return (
        <div className="bg-indigo-600 text-white font-sans flex items-center justify-center min-h-screen">
            <div className="text-center">
                <h1 className="text-4xl my-8">To-Do List</h1>
                <div className="flex flex-col items-center mb-6">
                    <div className={`form-container bg-gray-800 rounded-lg p-8 mb-6 w-full max-w-md mx-auto ${isRegistering ? 'hidden' : ''}`}>
                        <h2 className="text-xl mb-4">Login</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit} aria-label="User Login">
                            <input
                                type="text"
                                className="p-2 border border-gray-400 rounded text-black bg-gray-300 focus:bg-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                className="p-2 border border-gray-400 rounded text-black bg-gray-300 focus:bg-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit" className="p-2 bg-gray-600 hover:bg-gray-500 rounded">Login</button>
                        </form>
                        <p className="mt-4">
                            Don't have an account? <a href="#" className="text-blue-300 hover:underline" onClick={toggleForms}>Register here</a>
                        </p>
                    </div>

                    <div className={`form-container bg-gray-800 rounded-lg p-8 mb-6 w-full max-w-md mx-auto ${isRegistering ? '' : 'hidden'}`}>
                        <h2 className="text-xl mb-4">Register</h2>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit} aria-label="User Registration">
                            <input
                                type="text"
                                className="p-2 border border-gray-400 rounded text-black bg-gray-300 focus:bg-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder="Username"
                                required
                            />
                            <input
                                type="password"
                                className="p-2 border border-gray-400 rounded text-black bg-gray-300 focus:bg-gray-300 focus:outline-none focus:border-blue-500"
                                placeholder="Password"
                                required
                            />
                            <button type="submit" className="p-2 bg-gray-600 hover:bg-gray-500 rounded">Register</button>
                        </form>
                        <p className="mt-4">
                            Already have an account? <a href="#" className="text-blue-300 hover:underline" onClick={toggleForms}>Login here</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;