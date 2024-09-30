import express from "express";
import ViteExpress from "vite-express";

const appdata = [];

const app = express();
app.use(express.json());
app.use(express.static('dist'));

app.get("/data", (req, res) => res.json(appdata));

app.post("/submit", (req, res) => {
  const newData = req.body;

  const game = newData.game;
  const genre = newData.genre;
  const cost = newData.cost;
  const discount = newData.discount;
  let amountOff = (parseInt(discount) / 100) * parseInt(cost);
  if (isNaN(amountOff) || amountOff === null) {
    amountOff = 0;
  }

  appdata.push({
    game,
    genre,
    cost,
    discount,
    discountCost: cost - amountOff,
  });

  res.json(appdata);
});

app.delete("/data", function (req, res) {
  const index = req.body.index;

  appdata.splice(index, 1);

  res.json(appdata);
});

ViteExpress.listen(app, process.env.PORT || 3000);
