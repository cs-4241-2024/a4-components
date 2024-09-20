import './App.css';
import { useState } from 'react';
import { React } from 'react';



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
    setScores(newScores);
    setName("");
    setCount(0);
  }

  function deleteScore() {
    let index = scores.findIndex((score) => score.name === name);
    if (index !== -1) {
      let newScores = [...scores];
      newScores.splice(index, 1);
      setScores(newScores);
    }
  }

  function ScoresTable() {
    const tableRows = scores.map(score => {
      return (<tr>
        <td><label>{score.name}</label></td>
        <td><label>{score.count}</label></td>
      </tr>);
    });

    return (
      <table>
        {tableRows}
      </table>
    );
  }

  return (
    <div className="parent-div">
      <div className="area-block">
        <p id="first-para" class="disp-element">
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
        <button onClick={saveScore}>Submit</button>
        <button onClick={deleteScore}>Delete</button>
        <ScoresTable />
      </div>
    </div>
  );
}

export default App;
