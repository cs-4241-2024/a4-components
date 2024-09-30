import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isGameActive, setIsGameActive] = useState(false);
  const [name, setName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    let timer;
    if (isGameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [isGameActive, timeLeft]);

  const handleClick = () => {
    if (isGameActive) {
      setClicks(clicks + 1);
    }
  };

  const startGame = () => {
    setClicks(0);
    setTimeLeft(5);
    setIsGameActive(true);
    setShowInput(false);
  };

  const endGame = () => {
    setIsGameActive(false);
    setShowInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    const newScore = { name, clicks, date };
    const updatedLeaderboard = [...leaderboard, newScore];

    // Sort leaderboard by highest clicks first
    updatedLeaderboard.sort((a, b) => b.clicks - a.clicks);

    setLeaderboard(updatedLeaderboard);
    setName('');
    setShowInput(false);
  };

  return (
    <div className="App">
      <h1>Clicker Game</h1>
      <p>Click as many times as you can in 5 seconds!</p>
      <p>Time Left: {timeLeft}s</p>
      <p>Clicks: {clicks}</p>
      {!isGameActive && !showInput && (
        <button onClick={startGame}>Start Game</button>
      )}
      {isGameActive && (
        <div onClick={handleClick} className="clickable-area">
          Click here!
        </div>
      )}
      {showInput && (
        <form onSubmit={handleSubmit}>
          <label>
            Your Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <button type="submit">Submit Score</button>
        </form>
      )}
      <h2>Leaderboard</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Clicks</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={index}>
              <td>{entry.name}</td>
              <td>{entry.clicks}</td>
              <td>{entry.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
