import React, { useState, useEffect } from 'react';

const Mood = ({ name, mood, comment, timestamp, moodScore, onDelete }) => (
  <tr>
    <td>{name}</td>
    <td>{mood}</td>
    <td>{comment}</td>
    <td>{timestamp}</td>
    <td>{moodScore}</td>
    <td>
      <button onClick={onDelete}>Delete</button>
    </td>
  </tr>
);

const App = () => {
  const [moods, setMoods] = useState([]);
  const [name, setName] = useState('');
  const [mood, setMood] = useState('');
  const [comment, setComment] = useState('');

  const fetchMoods = async () => {
    const response = await fetch('./results');
    const data = await response.json();
    setMoods(data);
  };

  const submit = async (event) => {
    event.preventDefault();

    if (!mood || !name) {
      alert('Please fill in all the required fields');
      return;
    }

    const json = { name, mood, comment };

    const response = await fetch('/submit', {
      method: 'POST',
      body: JSON.stringify(json),
      headers: { 'Content-Type': 'application/json' },
    });

    const updatedMoods = await response.json();

    setMoods(updatedMoods);

    setName('');
    setMood('');
    setComment('');
  };

  const deleteMood = async (id) => {
    await fetch(`/delete/${id}`, { method: 'DELETE' });
    fetchMoods();
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  return (
    <div className="app-container">
      <div className="form-container">
        <form onSubmit={submit} autocomplete="off">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            required
          />
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            required
          >
            <option value="">Select a mood</option>
            <option value="happy">Happy</option>
            <option value="sad">Sad</option>
            <option value="neutral">Neutral</option>
            <option value="excited">Excited</option>
            <option value="stressed">Stressed</option>
          </select>
          <input
            type="text"
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Comment"
          />
          <button type="submit">Submit</button>
        </form>
      </div>

      <table className="mood-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mood</th>
            <th>Comment</th>
            <th>Timestamp</th>
            <th>Mood Score</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {moods.map((mood) => (
            <Mood
              key={mood.id}
              name={mood.name}
              mood={mood.mood}
              comment={mood.comment}
              timestamp={mood.timestamp}
              moodScore={mood.moodScore}
              onDelete={() => deleteMood(mood.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
