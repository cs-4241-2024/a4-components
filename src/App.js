import React, { useEffect, useState } from 'react';
import AddShowForm from './components/AddShowForm';
import ShowTable    from './components/ShowTable';
import EditShowForm from './components/EditShowForm';
import './style.css';

function App() {
  const [shows, setShows] = useState([]);

  // Fetch all shows from the server
  const loadData = () => {
    fetch('/shows')
      .then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => setShows(data))
      .catch(err => console.error('Fetch /shows failed:', err));
  };

  // On mount, load the data
  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="content">
      <h1 id="big-title">Show Tracker</h1>
      <img
        src="https://www.514blog.ca/wp-content/uploads/2020/03/1_dBJMknulIZSAC36tTmanVA.jpeg"
        width="300"
        alt="top shows"
      />

      {/* Add‐Show form will call loadData() on success */}
      <AddShowForm onSuccess={loadData} />

      {/* Three tables */}
      <section id="table-view">
        <ShowTable
          title="Full Show List"
          filter={() => true}
          shows={shows}
        />
        <ShowTable
          title="Shows You Liked"
          filter={s => ['3','4','5'].includes(s.rating)}
          shows={shows}
        />
        <ShowTable
          title="Shows You Didn’t Like"
          filter={s => ['1','2'].includes(s.rating)}
          shows={shows}
        />
      </section>

      {/* Edit/Delete form will also call loadData() on success */}
      <EditShowForm onSuccess={loadData} />
    </div>
  );
}

export default App;
