import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [games, setGames] = useState([]);
  const [game, setGame] = useState("");
  const [genre, setGenre] = useState("");
  const [cost, setCost] = useState("");
  const [discount, setDiscount] = useState("");

  const submit = async function (event) {
    event.preventDefault();

    const game = document.getElementById("game").value;
    const genre = document.getElementById("genre").value;
    const cost = document.getElementById("cost").value;
    const discount = document.getElementById("discount").value;
    const data = { game, genre, cost, discount };

    const postResponse = await fetch("/submit", {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const newData = await postResponse.json();

    setGames(newData);
  };

  const deleteGame = async function (index) {
    const response = await fetch("/data", {
      method: "DELETE",
      body: JSON.stringify({ index }),
      headers: { "Content-Type": "application/json" },
    });

    getResponse();
  };

  const getResponse = async function (event) {
    const response = await fetch("/data", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    const newData = await response.json();

    setGames(newData);
  };

  useEffect(() => {
    const submitButton = document.getElementById("submit");
    submitButton.onclick = submit;

    getResponse();
  }, []);

  return (
    <div className="App">
      <h1>Game Wishlist</h1>
      <p>
        Ever needed to keep track of games you've been meaning to play? Just
        enter the title of a game, the genre, its cost (no $), and any discount
        it has (no %, 0-100).
      </p>
      <form>
        <input
          type="text"
          id="game"
          placeholder="Enter game title"
          value={game}
          onChange={(event) => setGame(event.target.value)}
          required
        />
        <input
          type="text"
          id="genre"
          placeholder="Enter genre"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          required
        />
        <input
          type="number"
          id="cost"
          placeholder="Enter cost"
          value={cost}
          onChange={(event) => setCost(event.target.value)}
          required
        />
        <input
          type="number"
          id="discount"
          placeholder="Enter discount"
          value={discount}
          onChange={(event) => setDiscount(event.target.value)}
          required
        />
        <button id="submit">Submit</button>
      </form>
      <table id="data">
        <thead>
          <tr>
            <th>Game Title</th>
            <th>Genre</th>
            <th>Cost</th>
            <th>Discount</th>
            <th>Discounted Cost</th>
          </tr>
        </thead>
        <tbody id="bodyData">
          {games.map((game, index) => (
            <tr key={index}>
              <td>{game.game}</td>
              <td>{game.genre}</td>
              <td>${game.cost}</td>
              <td>{game.discount}%</td>
              <td>${game.discountCost}</td>
              <td>
                <button onClick={() => deleteGame(index)} id="delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
