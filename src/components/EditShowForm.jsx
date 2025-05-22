import React, { useState } from 'react';

export default function EditShowForm({ onSuccess }) {
  const [editName, setEditName] = useState('');
  const [editRating, setEditRating] = useState('');
  const [delName, setDelName] = useState('');

  const handleEdit = e => {
    e.preventDefault();
    fetch('/editShow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ showName: editName, rating: editRating })
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        setEditName(''); setEditRating('');
        onSuccess();
      })
      .catch(console.error);
  };

  const handleDelete = e => {
    e.preventDefault();
    fetch('/delShow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ showName: delName })
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        setDelName('');
        onSuccess();
      })
      .catch(console.error);
  };

  return (
    <form className="edit-show-form">
      <fieldset>
        <legend>Oops, Made A Mistake?</legend>

        <div id="wrapper">
          <div id="left-edit">
            <label>
              Name of Show:<br/>
              <input
                value={editName}
                onChange={e => setEditName(e.target.value)}
              />
            </label>
          </div>
          <div id="right-edit">
            <label>
              New Rating:<br/>
              <input
                value={editRating}
                onChange={e => setEditRating(e.target.value)}
              />
            </label>
          </div>
        </div><br/>

        <button onClick={handleEdit}>Update Show</button><br/><br/>

        <label>
          Show Name to Delete:<br/>
          <input
            value={delName}
            onChange={e => setDelName(e.target.value)}
          />
        </label><br/><br/>

        <button onClick={handleDelete}>Delete Show</button>
      </fieldset>
    </form>
  );
}
