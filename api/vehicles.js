let vehicles = [
    { model: 'Toyota', year: 1999, mpg: 23 },
    { model: 'Honda', year: 2004, mpg: 30 },
    { model: 'Ford', year: 1987, mpg: 14 },
  ];
  
  export default function handler(req, res) {
    if (req.method === 'GET') {
      // Fetch all vehicles
      res.status(200).json(vehicles);
    } else if (req.method === 'POST') {
      // Add a new vehicle
      vehicles.push(req.body);
      res.status(200).json(vehicles);
    } else if (req.method === 'PUT') {
      // Update a vehicle
      const { oldModel, model, year, mpg } = req.body;
      vehicles = vehicles.map((v) =>
        v.model === oldModel ? { model, year, mpg } : v
      );
      res.status(200).json(vehicles);
    } else if (req.method === 'DELETE') {
      // Delete a vehicle
      const { model } = req.body;
      vehicles = vehicles.filter((v) => v.model !== model);
      res.status(200).json(vehicles);
    } else {
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  