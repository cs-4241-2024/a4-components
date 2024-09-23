import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [scores, setScores] = useState([]);

  function incrementCount() {
    setCount(count + 1);
  }

  function saveScore() {
    const newScores = [...scores];
    newScores.push({ name, count });
    newScores.sort((s1, s2) => {
      return s2.count - s1.count;
    });
    fetch('/submit', {
      method: "POST",
      body: JSON.stringify({
        name,
        score: count
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(json => {
        setScores(json);
      });
    setName("");
    setCount(0);
  }

  function deleteScore() {
    fetch('/delete', {
      method: "POST",
      body: JSON.stringify({
        name
      }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then(json => {
        setScores(json);
        setName("");
      });
  }

  function ScoresTable() {
    const tableRows = scores.map(score => {
      return (<tr key={`${score.name}${score.count}`}>
        <td>{score.name}</td>
        <td>{score.score}</td>
        <td>{score.rank}</td>
      </tr>);
    });


    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Ranking</th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </table>
    );
  }
  useEffect(() => {
    fetch('/data', { method: 'GET' })
      .then(response => {
        let res = response.json()
        return res
      })
      .then(json => setScores(json))
  }, []);


  return (
    <div className="parent-div">
      <div className="area-block">
        <p id="first-para" className="disp-element">
          Click the button below to increase your score!
          <br />
          When you are done, enter your name and press submit to submit your high score.
          <br />
          You can edit your score by entering your name and pressing submit again.
        </p>
        <button onClick={incrementCount} id="game-button">Click me!</button>
        <p>{count}</p>

      </div>
      <div className="area-block">
        <input type="text" id="name-input" onChange={e => setName(e.target.value)} value={name} />
        <button onClick={saveScore} className="form-button">Submit</button>
        <button onClick={deleteScore} className="form-button">Delete</button>
        <ScoresTable />
      </div>
    </div>
  );
}

export default App;
