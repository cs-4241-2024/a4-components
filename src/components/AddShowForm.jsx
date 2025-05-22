import React, { useState } from 'react';

export default function AddShowForm({ onSuccess }) {
  const [name, setName] = useState('');
  const [director, setDirector] = useState('');
  const [comments, setComments] = useState('');
  const [rating, setRating] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const newShow = {
      showName: name,
      directorName: director,
      comments,
      rating,
      status: ['1','2'].includes(rating) ? 'bad' : 'good'
    };

    fetch('/addShow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newShow)
    })
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        setName(''); setDirector(''); setComments(''); setRating('');
        onSuccess();
      })
      .catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>Have Any Shows You Want To Watch?</legend>

        <label>
          Show Name:<br/>
          <input value={name} onChange={e => setName(e.target.value)} />
        </label><br/>

        <label>
          Director:<br/>
          <input value={director} onChange={e => setDirector(e.target.value)} />
        </label><br/>

        <label>
          Comments:<br/>
          <input value={comments} onChange={e => setComments(e.target.value)} />
        </label><br/>

        <label>
          Rating (1–5):<br/>
          <input value={rating} onChange={e => setRating(e.target.value)} />
        </label><br/><br/>

        <button type="submit">Add My Show</button>
      </fieldset>
    </form>
  );
}
