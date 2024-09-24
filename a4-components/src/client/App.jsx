import { useState } from "react";
import "./App.css";

// FRONT-END (CLIENT) JAVASCRIPT HERE


const add = async function(event) {
    event.preventDefault();

    const input = {
        MatchType:document.querySelector('input[name="match-type"]:checked'),
        MatchFormat:document.querySelector('input[name="match-format"]:checked'),
        Match:document.getElementById('match'),
        SchoolA:document.getElementById("schoolA"),
        SchoolB:document.getElementById("schoolB"),
        PlayerA1:document.getElementById("playerA1"),
        PlayerB1:document.getElementById("playerB1"),
        PlayerA2:document.getElementById("playerA2"),
        PlayerB2:document.getElementById("playerB2"),
        Game1A:document.getElementById("game1A"),
        Game1B:document.getElementById("game1B"),
        Game2A:document.getElementById("game2A"),
        Game2B:document.getElementById("game2B"),
        Game3A:document.getElementById("game3A"),
        Game3B:document.getElementById("game3B"),
    }
    if(input.MatchType === null ||
        input.MatchFormat === null ||
        input.Match.value === '' ||
        input.SchoolA.value === '' ||
        input.SchoolB.value === '' ||
        input.PlayerA1.value === '' ||
        input.PlayerB1.value === '') {
        alert('Please fill out all required fields')
        return
    }
    const json = {
            MatchType: input.MatchType.value,
            MatchFormat: input.MatchFormat.value,
            Match: input.Match.value,
            SchoolA: input.SchoolA.value,
            SchoolB: input.SchoolB.value,
            PlayerA1: input.PlayerA1.value,
            PlayerB1: input.PlayerB1.value,
            PlayerA2: input.PlayerA2.value,
            PlayerB2: input.PlayerB2.value,
            Game1A: input.Game1A.value,
            Game1B: input.Game1B.value,
            Game2A: input.Game2A.value,
            Game2B: input.Game2B.value,
            Game3A: input.Game3A.value,
            Game3B: input.Game3B.value,
        },
        body = JSON.stringify( json )
    console.log(body)

    const response = await fetch( '/add', {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
    const data = await response.json()
    console.log(data)
    await generateMatches()
}

const addMatch = function(data) {
    const matchContainer = document.getElementById('matches-container'); // Assuming you have a container to append the matches

    const matchHTML = `
    <div class="fixed-grid">
      <div class="grid">
        <div class="cell match-info is-col-span-3 is-inline is-size-5">
          <p class="is-inline is-size-4">${data.SchoolA} -</p>
          <p class="is-inline is-size-4">${data.SchoolB} -</p>
          <p class="is-inline is-size-4"> ${data.Match} -</p>
          <p class="is-inline is-size-4"> ${data.MatchType}</p>
        </div>

        <div class="cell is-col-start-1">
          <div>
            <p class="is-inline-block">${data.SchoolA}</p>
             ${data.winner === data.SchoolA ? '<p class="is-inline-block">✔</p>' : ''}
          </div>
          <div>
            <p class="is-inline">${data.PlayerA1}</p>
            ${data.PlayerA2 === '' ? '' : '<p class="is-inline"> / </p>'+'<p class="is-inline-block">'+data.PlayerA2+'</p>'}
            
          </div>
        </div>
        <div class="cell columns is-gapless is-flex ">
          <p class="column is-size-3">${data.Game1A}</p>
          <p class="column is-size-3">${data.Game2A}</p>
          ${data.Game3A === '0' && data.Game3B === '0' ? '' : '<h3 class="column is-size-3">' + data.Game3A+'</h3>'}
        </div>
        <button id="${data._id}" name="edit" class="cell is-1-one-fifth button is-warning">Edit</button>

        <div class="cell is-col-start-1">
          <div>
            <p class="is-inline-block">${data.SchoolB}</p>
            ${data.winner === data.SchoolB ? '<p class="is-inline-block">✔</p>' : ''}
          </div>
          <div>
            <p class="is-inline">${data.PlayerB1}</p>
            ${data.PlayerB2 === '' ? '' : '<p class="is-inline"> / </p>'+'<p class="is-inline-block">'+data.PlayerB2+'</p>'}
            
            
          </div>
        </div>
        <div class="cell columns is-gapless is-flex is-justify-content-space-between">
          <h3 class="column is-size-3">${data.Game1B}</h3>
          <h3 class="column is-size-3">${data.Game2B}</h3>
          ${data.Game3A === '0' && data.Game3B === '0' ? '' : '<h3 class="column is-size-3">' + data.Game3B+'</h3>'}
        </div>
        <button id="${data._id}" name="delete" class="cell is-1-one-fifth button is-danger">Delete</button>
      </div>
    </div>
  `;

    matchContainer.insertAdjacentHTML('beforeend', matchHTML);
};

const deleteMatch = async function(event) {
    event.preventDefault();

    const matchId = event.target.id; // Get the id from the button's id attribute
    const body = JSON.stringify({ _id: matchId });

    const response = await fetch('/remove', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body
    });

    const result = await response.json();
    console.log(result);

    // Refresh the matches list
    await generateMatches();
};

const generateMatches = async function() {
    const matchContainer = document.getElementById('matches-container');
    matchContainer.innerHTML = '';
    const response = await fetch('/userMatches', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const jsonData = await response.json();
    jsonData.forEach(match => {
        addMatch(match);
    });

    // Add event listeners to delete buttons
    document.querySelectorAll('button[name="delete"]').forEach(button => {
        button.addEventListener('click', deleteMatch);
    });

    // Add event listeners to edit buttons
    document.querySelectorAll('button[name="edit"]').forEach(button => {
        button.addEventListener('click', openEditModal);
    });
};




const alterRow = async function(event) {
    event.preventDefault();

    const input = { index: document.getElementById( 'indexOfChange' ), name: document.getElementById("nameChange"), clickCount: document.getElementById("scoreChange") },
        json = { index: input.index.value, name: input.name.value, clickCount: input.clickCount.value },
        body = JSON.stringify( json )

    const response = await fetch( '/alterRow', {
        method:'PUT',
        headers: { 'Content-Type': 'application/json' },
        body
    })
    const jsonData = await response.json();
    console.log(jsonData)
    let table = document.getElementById('table')
    table.innerHTML = ''
    // How to fetch from response instead
    // generateTable(jsonData)
}

const editMatch = async function(event) {
    event.preventDefault()


    const input = {
        MatchType:document.querySelector('input[name="match-typeChange"]:checked'),
        MatchFormat:document.querySelector('input[name="match-formatChange"]:checked'),
        Match:document.getElementById('matchChange'),
        SchoolA:document.getElementById("schoolAChange"),
        SchoolB:document.getElementById("schoolBChange"),
        PlayerA1:document.getElementById("playerA1Change"),
        PlayerB1:document.getElementById("playerB1Change"),
        PlayerA2:document.getElementById("playerA2Change"),
        PlayerB2:document.getElementById("playerB2Change"),
        Game1A:document.getElementById("game1AChange"),
        Game1B:document.getElementById("game1BChange"),
        Game2A:document.getElementById("game2AChange"),
        Game2B:document.getElementById("game2BChange"),
        Game3A:document.getElementById("game3AChange"),
        Game3B:document.getElementById("game3BChange"),
    }
    if(input.MatchType === null ||
        input.MatchFormat === null ||
        input.Match.value === '' ||
        input.SchoolA.value === '' ||
        input.SchoolB.value === '' ||
        input.PlayerA1.value === '' ||
        input.PlayerB1.value === '') {
        alert('Please fill out all required fields')
        return
    }
    const matchId = event.target.id; // Get the id from the button's id attribute
    const json = {
            MatchType: input.MatchType.value,
            MatchFormat: input.MatchFormat.value,
            Match: input.Match.value,
            SchoolA: input.SchoolA.value,
            SchoolB: input.SchoolB.value,
            PlayerA1: input.PlayerA1.value,
            PlayerB1: input.PlayerB1.value,
            PlayerA2: input.PlayerA2.value,
            PlayerB2: input.PlayerB2.value,
            Game1A: input.Game1A.value,
            Game1B: input.Game1B.value,
            Game2A: input.Game2A.value,
            Game2B: input.Game2B.value,
            Game3A: input.Game3A.value,
            Game3B: input.Game3B.value,
        },
        body = JSON.stringify( json )

    const response = await fetch( `/update?id=${matchId}`, {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body
    })
    const jsonData = await response.json();


    await generateMatches().then(document.getElementById('editModal').style.display = 'none');

}

const openEditModal = async function(event) {
    event.preventDefault()
    document.getElementById('editModal').style.display = 'block';
    const docID = event.target.id;


    const response = await fetch(`/getMatch?id=${docID}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    document.querySelector('input[name="changeButton"]').id = docID;
    const jsonData = await response.json();
    const input = {
        MatchType:document.querySelector('input[name="match-typeChange"]:checked'),
        MatchFormat:document.querySelector('input[name="match-formatChange"]:checked'),
        Match:document.getElementById('matchChange'),
        SchoolA:document.getElementById("schoolAChange"),
        SchoolB:document.getElementById("schoolBChange"),
        PlayerA1:document.getElementById("playerA1Change"),
        PlayerB1:document.getElementById("playerB1Change"),
        PlayerA2:document.getElementById("playerA2Change"),
        PlayerB2:document.getElementById("playerB2Change"),
        Game1A:document.getElementById("game1AChange"),
        Game1B:document.getElementById("game1BChange"),
        Game2A:document.getElementById("game2AChange"),
        Game2B:document.getElementById("game2BChange"),
        Game3A:document.getElementById("game3AChange"),
        Game3B:document.getElementById("game3BChange"),
    }
    console.log(jsonData)
    input.SchoolA.value = jsonData.SchoolA
    input.SchoolB.value = jsonData.SchoolB
    input.Match.value = jsonData.Match
    input.PlayerA1.value = jsonData.PlayerA1
    input.PlayerB1.value = jsonData.PlayerB1
    input.PlayerA2.value = jsonData.PlayerA2
    input.PlayerB2.value = jsonData.PlayerB2
    input.Game1A.value = Number(jsonData.Game1A)
    input.Game1B.value = Number(jsonData.Game1B)
    input.Game2A.value = Number(jsonData.Game2A)
    input.Game2B.value = Number(jsonData.Game2B)
    input.Game3A.value = Number(jsonData.Game3A)
    input.Game3B.value = Number(jsonData.Game3B)
    if(jsonData.MatchType === 'round-robin') {
        document.getElementById('round-robinChange').checked = true
    }
    else {
        document.getElementById('eliminationChange').checked = true
    }
    if(jsonData.MatchFormat === 'singles') {
        document.getElementById('singlesChange').checked = true
    }
    else {
        document.getElementById('doublesChange').checked = true
    }




};




window.onload = async function() {
    const addButton = document.getElementById("add");
    addButton.onclick = add;


    await generateMatches()

    const changeButton = document.querySelector('input[name="changeButton"]');
    changeButton.onclick = editMatch;


    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });
    document.querySelector('.cancel-modal').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });

    document.getElementById('logoutButton').addEventListener('click', async () => {
        const response = await fetch('/logout', {
            method: 'GET',
        });
        if (response.ok) {
            window.location.href = '/'; // Redirect to the root URL
        } else {
            console.error('Logout failed');
        }
    });

    window.onclick = function(event) {
        if (event.target === document.getElementById('editModal')) {
            document.getElementById('editModal').style.display = 'none';
        }
    };


}

function App() {

  return (
      <>
          <h1 className="title is-family-primary is-size-1 pt-6 is-flex is-flex-direction-row">Submit your Match! <button
              id="logoutButton" className="button is-info">Logout</button>
          </h1>
          <div>
            <form>
                <h2 className="is-size-4 is-flex is-justify-content-start is-align-items-start has-text-weight-semibold">Match
                    Formatting:</h2>
                <div className="is-flex is-flex-direction-row is-justify-content-space-between ">
                    <div className="is-flex is-flex-direction-column">
                        <h3>Match Type:</h3>
                        <div className="flex-horizontal">
                            <input type="radio" id="round-robin" name="match-type" value="Round Robin" required />
                                <label htmlFor="round-robin">Round Robin</label>
                        </div>
                        <div className="is-flex is-flex-direction-row">
                            <input type="radio" id="elimination" name="match-type" value="Elimination" required />
                                <label htmlFor="elimination">Elimination</label>
                        </div>
                    </div>


                    <div className="is-flex is-flex-direction-column">
                        <h3 className="pb-1">Match Format:</h3>
                        <div className="is-flex is-flex-direction-row">
                            <input type="radio" id="singles" name="match-format" value="singles" required />
                                <label htmlFor="singles">Singles</label>
                        </div>
                        <div className="is-flex is-flex-direction-row">
                            <input type="radio" id="doubles" name="match-format" value="doubles" required />
                                <label htmlFor="doubles">Doubles</label>
                        </div>
                    </div>


                    <div className="is-flex is-justify-content-start is-flex-direction-column">
                        <label className="pb-1">Match:</label>
                        <div className="select">
                            <select aria-label="What Match Group is this for i.e. Singles 3" id="match" name="match"
                                    required>
                                <option value="">Choose Match Type</option>
                                <option value="Singles 1">Singles 1</option>
                                <option value="Singles 2">Singles 2</option>
                                <option value="Singles 3">Singles 3</option>
                                <option value="Singles 4">Singles 4</option>
                                <option value="Doubles 1">Doubles 1</option>
                                <option value="Doubles 2">Doubles 2</option>
                                <option value="Doubles 3">Doubles 3</option>
                            </select>
                        </div>
                    </div>
                </div>
                <datalist id="schools">
                    <option value="SAN">Sandburg</option>
                    <option value="AND">Andrew</option>
                    <option value="NT">New Trier</option>
                    <option value="DGN">Downers Grove North</option>
                    <option value="FR">Fremd</option>
                    <option value="HER">Hersey</option>
                    <option value="HS">Hinsdale South</option>
                    <option value="LT">Lockport</option>
                    <option value="NN">Naperville North</option>
                    <option value="DF">Deerfield</option>
                    <option value="WY">Whitney Young</option>
                    <option value="YK">York</option>
                </datalist>

                <div className="pt-3">

                    <table>
                        <tr>
                            <td><h3 className="has-text-weight-semibold is-size-4 is-flex is-justify-content-start">Scores:</h3>
                            </td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="p-2">Schools</td>
                            <td className="school-a">
                                <input aria-label="Input for School A" className="input" list="schools" id="schoolA"
                                       name="schoolA" placeholder="Select School" required />
                            </td>
                            <td className="school-b">
                                <input aria-label="Input for School B" className="input" list="schools" id="schoolB"
                                       name="schoolB" placeholder="Select School" required />
                            </td>
                        </tr>

                        <tr>
                            <td className="p-2">PLAYER 1</td>
                            <td><input aria-label="Player 1 for School A" className="input" type="text" id="playerA1"
                                       name="playerA1" placeholder="NT1" required /></td>
                            <td><input aria-label="Player 1 for School B" className="input" type="text" id="playerB1"
                                       name="playerB1" placeholder="AND2" required /></td>
                        </tr>
                        <tr>
                            <td className="p-2">PLAYER 2</td>
                            <td><input aria-label="Player 2 for School A" className="input" type="text" id="playerA2"
                                       name="playerA2" placeholder="NT2" /></td>
                            <td><input aria-label="Player 2 for School B" className="input" type="text" id="playerB2"
                                       name="playerB2" placeholder="AND4" /></td>
                        </tr>

                        <tr>
                            <td className="p-2">GAME 1</td>
                            <td><input aria-label="Game 1 Score for School A" id="game1A" className="input" type="number"
                                       name="game1A" min={0} placeholder={"0"} required /></td>
                            <td><input aria-label="Game 1 Score for School B" id="game1B" className="input" type="number"
                                       name="game1B" min={0} placeholder={"0"} required /></td>
                        </tr>
                        <tr>
                            <td className="p-2">GAME 2</td>
                            <td><input aria-label="Game 2 Score for School A" id="game2A" className="input" type="number"
                                       name="game2A" min={0} placeholder={"0"} required /></td>
                            <td><input aria-label="Game 2 Score for School B" id="game2B" className="input" type="number"
                                       name="game2B" min={0} placeholder={"0"} required /></td>
                        </tr>
                        <tr>
                            <td className="p-2">GAME 3</td>
                            <td><input aria-label="Game 3 Score for School A" id="game3A" className="input" type="number"
                                       name="game3A" min={0} placeholder={"0"}  /></td>
                            <td><input aria-label="Game 3 Score for School B" id="game3B" className="input" type="number"
                                       name="game3B" min={0} placeholder={"0"}  /></td>
                        </tr>
                    </table>
                </div>


                <div className="mt-2 submit-clear flex-horizontal is-justify-content-end is-align-items-end">
                    <input type="submit" id="add" className="button is-link" value="Submit" />
                        <button type="reset" className="ml-2 button is-link is-light">Clear</button>
                </div>
            </form>
            <div id="matches-container">

            </div>



            <div id="editModal" className="modal">
                <div className="modal-background"></div>
                <div className="modal-content">
                    <form>
                        <h2 className="is-size-4 is-flex is-justify-content-start is-align-items-start has-text-weight-semibold">Match
                            Formatting:</h2>
                        <div className="is-flex is-flex-direction-row is-justify-content-space-between ">

                            <div className="is-flex is-flex-direction-column">
                                <label className="pb-1" htmlFor="match-typeChange">Match Type:</label>
                                <div className="flex-horizontal">
                                    <input type="radio" id="round-robinChange" name="match-typeChange" value="round-robin"
                                           required />
                                        <label htmlFor="round-robin">Round Robin</label>
                                </div>
                                <div className="is-flex is-flex-direction-row">
                                    <input type="radio" id="eliminationChange" name="match-typeChange" value="elimination"
                                           required />
                                        <label htmlFor="elimination">Elimination</label>
                                </div>
                            </div>


                            <div className="is-flex is-flex-direction-column">
                                <label className="pb-1" htmlFor="match-formatChange">Match Format:</label>
                                <div className="is-flex is-flex-direction-row">
                                    <input type="radio" id="singlesChange" name="match-formatChange" value="singles"
                                           required />
                                        <label htmlFor="singles">Singles</label>
                                </div>
                                <div className="is-flex is-flex-direction-row">
                                    <input type="radio" id="doublesChange" name="match-formatChange" value="doubles"
                                           required />
                                        <label htmlFor="doubles">Doubles</label>
                                </div>
                            </div>


                            <div className="is-flex is-justify-content-start is-flex-direction-column">
                                <h4 className="pb-1">Match:</h4>
                                <div className="select">
                                    <select id="matchChange" name="match" required>
                                        <option value="">Choose Match Type</option>
                                        <option value="Singles 1">Singles 1</option>
                                        <option value="Singles 2">Singles 2</option>
                                        <option value="Singles 3">Singles 3</option>
                                        <option value="Singles 4">Singles 4</option>
                                        <option value="Doubles 1">Doubles 1</option>
                                        <option value="Doubles 2">Doubles 2</option>
                                        <option value="Doubles 3">Doubles 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3">

                            <table>
                                <tr>
                                    <td><h3
                                        className="has-text-weight-semibold is-size-4 is-flex is-justify-content-start">Scores:</h3>
                                    </td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td className="p-2">Schools</td>
                                    <td className="school-a">
                                        <input className="input" list="schools" id="schoolAChange" name="schoolA"
                                               placeholder="Select School" required />
                                    </td>
                                    <td className="school-b">
                                        <input className="input" list="schools" id="schoolBChange" name="schoolB" placeholder="Select School" required />
                                    </td>
                                </tr>

                                <tr>
                                    <td className="p-2">PLAYER 1</td>
                                    <td><input className="input" type="text" id="playerA1Change" name="playerA1" placeholder="NT1" required /></td>
                                    <td><input className="input" type="text" id="playerB1Change" name="playerB1" placeholder="AND2" required /></td>
                                </tr>
                                <tr>
                                    <td className="p-2">PLAYER 2</td>
                                    <td><input className="input" type="text" id="playerA2Change" name="playerA2" placeholder="NT2" /></td>
                                    <td><input className="input" type="text" id="playerB2Change" name="playerB2" placeholder="AND4" /></td>
                                </tr>

                                <tr>
                                    <td className="p-2">GAME 1</td>
                                    <td><input id="game1AChange" className="input" type="number" name="game1A" min={0} placeholder={"0"} required /></td>
                                    <td><input id="game1BChange" className="input" type="number" name="game1B" min={0} placeholder={"0"} required /></td>
                                </tr>
                                <tr>
                                    <td className="p-2">GAME 2</td>
                                    <td><input id="game2AChange" className="input" type="number" name="game2A" min={0} placeholder={"0"} required /></td>
                                    <td><input id="game2BChange" className="input" type="number" name="game2B" min={0} placeholder={"0"} required /></td>
                                </tr>
                                <tr>
                                    <td className="p-2">GAME 3</td>
                                    <td><input id="game3AChange" className="input" type="number" name="game3A" min={0} placeholder={"0"}  /></td>
                                    <td><input id="game3BChange" className="input" type="number" name="game3B" min={0} placeholder={"0"}  /></td>
                                </tr>
                            </table>
                        </div>


                        <div className="mt-2 submit-clear flex-horizontal is-justify-content-end is-align-items-end">
                            <input type="submit" name="changeButton" className="changeButton button is-link" value="Change" />
                                <button type="button" className="cancel-modal ml-2 button is-link is-light">Cancel</button>
                        </div>
                    </form>

                </div>
                <button className="modal-close is-large" aria-label="close"></button>
            </div>
          </div>
      </>
  );
}

export default App;