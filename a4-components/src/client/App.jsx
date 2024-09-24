import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

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
                                       name="game1A" min="0" value="0" required /></td>
                            <td><input aria-label="Game 1 Score for School B" id="game1B" className="input" type="number"
                                       name="game1B" min="0" value="0" required /></td>
                        </tr>
                        <tr>
                            <td className="p-2">GAME 2</td>
                            <td><input aria-label="Game 2 Score for School A" id="game2A" className="input" type="number"
                                       name="game2A" min="0" value="0" required /></td>
                            <td><input aria-label="Game 2 Score for School B" id="game2B" className="input" type="number"
                                       name="game2B" min="0" value="0" required /></td>
                        </tr>
                        <tr>
                            <td className="p-2">GAME 3</td>
                            <td><input aria-label="Game 3 Score for School A" id="game3A" className="input" type="number"
                                       name="game3A" min="0" value="0" required /></td>
                            <td><input aria-label="Game 3 Score for School B" id="game3B" className="input" type="number"
                                       name="game3B" min="0" value="0" required /></td>
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
                                    <td><input id="game1AChange" className="input" type="number" name="game1A" min="0" value="0" required /></td>
                                    <td><input id="game1BChange" className="input" type="number" name="game1B" min="0" value="0" required /></td>
                                </tr>
                                <tr>
                                    <td className="p-2">GAME 2</td>
                                    <td><input id="game2AChange" className="input" type="number" name="game2A" min="0" value="0" required /></td>
                                    <td><input id="game2BChange" className="input" type="number" name="game2B" min="0" value="0" required /></td>
                                </tr>
                                <tr>
                                    <td className="p-2">GAME 3</td>
                                    <td><input id="game3AChange" className="input" type="number" name="game3A" min="0" value="0" required /></td>
                                    <td><input id="game3BChange" className="input" type="number" name="game3B" min="0" value="0" required /></td>
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