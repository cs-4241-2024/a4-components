import express from "express";
import ViteExpress from "vite-express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let moods = []

const generateId = () => {
  if (moods.length === 0) return 1;
  return Math.max(...moods.map(m=> m.id || 0)) + 1; //default to 0
};

const calculateMoodScore = (mood) => {
  switch (mood) {
    case 'happy' : return 8;
    case 'sad' : return 3;
    case 'angry': return 2;
    case 'excited': return 7;
    case 'stressed': return 4;
    default : return 5;
  }
};


app.get( '/results', ( req, res ) => res.json( moods ) )

app.post( '/submit', ( req,res ) => {
  const moodWithId = {...req.body, id: generateId(), timestamp: new Date().toISOString(), moodScore: calculateMoodScore(req.body.mood)};
  moods.push( moodWithId )
  res.json( moods )
});

app.delete('/delete/:id', (req, res) => {
  const {id} = req.params;
  moods = moods.filter(mood => mood.id !== parseInt(id));
  res.json(moods);
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Pass control to the next middleware
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

ViteExpress.listen(app, PORT, () =>
  console.log("Server is listening on port 3000..."),
);
