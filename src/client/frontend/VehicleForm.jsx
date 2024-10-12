import React, { useState, useEffect } from 'react';

function VehicleForm() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ model: '', year: '', mpg: '' });

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    const response = await fetch('/vehicles');
    const data = await response.json();
    setVehicles(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/vehicles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setVehicles(data);
    setFormData({ model: '', year: '', mpg: '' });
  };

  const handleDelete = async (model) => {
    const response = await fetch('/vehicles', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model }),
    });
    const data = await response.json();
    setVehicles(data);
  };

  const handleSave = async (oldModel, updatedVehicle) => {
    const response = await fetch('/vehicles', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ oldModel, ...updatedVehicle }),
    });
    const data = await response.json();
    setVehicles(data);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Vehicle Entry Form</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          placeholder="Model"
          required
        />
        <input
          type="number"
          name="year"
          value={formData.year}
          onChange={handleChange}
          placeholder="Year"
          required
        />
        <input
          type="number"
          name="mpg"
          value={formData.mpg}
          onChange={handleChange}
          placeholder="MPG"
          required
        />
        <button type="submit">Submit</button>
      </form>

      <h2>Vehicle List</h2>
      <table>
        <thead>
          <tr>
            <th>Model</th>
            <th>Year</th>
            <th>MPG</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle) => (
            <tr key={vehicle.model}>
              <td>
                <input
                  type="text"
                  defaultValue={vehicle.model}
                  onChange={(e) => (vehicle.model = e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={vehicle.year}
                  onChange={(e) => (vehicle.year = e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  defaultValue={vehicle.mpg}
                  onChange={(e) => (vehicle.mpg = e.target.value)}
                />
              </td>
              <td>
                <button onClick={() => handleSave(vehicle.model, vehicle)}>Save</button>
                <button onClick={() => handleDelete(vehicle.model)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehicleForm;
