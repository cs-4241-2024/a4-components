import React from 'react';

export default function ShowTable({ title, filter, shows }) {
  const filtered = shows.filter(filter);

  return (
    <div>
      <h2 className="center-txt table-label">{title}</h2>
      <div style={{ height: '150px', overflowY: 'auto' }}>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Name</th>
              <th>Director</th>
              <th>Comments</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.showName}>
                <td>{s.showName}</td>
                <td>{s.directorName}</td>
                <td>{s.comments}</td>
                <td>{s.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
