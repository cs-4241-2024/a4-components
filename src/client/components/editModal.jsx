import {generateMatches} from "./matches.jsx";

export const editMatch = async function(event) {
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
    console.log(jsonData)
    console.log(document.getElementById("editModal").style.display = 'none')
    await generateMatches().then(document.getElementById("editModal").style.display = 'none');

}

export const openEditModal = async function(event) {
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

export default function editModal(){
    return <div id="editModal" className="modal">
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
                                   required/>
                            <label htmlFor="round-robin">Round Robin</label>
                        </div>
                        <div className="is-flex is-flex-direction-row">
                            <input type="radio" id="eliminationChange" name="match-typeChange" value="elimination"
                                   required/>
                            <label htmlFor="elimination">Elimination</label>
                        </div>
                    </div>


                    <div className="is-flex is-flex-direction-column">
                        <label className="pb-1" htmlFor="match-formatChange">Match Format:</label>
                        <div className="is-flex is-flex-direction-row">
                            <input type="radio" id="singlesChange" name="match-formatChange" value="singles"
                                   required/>
                            <label htmlFor="singles">Singles</label>
                        </div>
                        <div className="is-flex is-flex-direction-row">
                            <input type="radio" id="doublesChange" name="match-formatChange" value="doubles"
                                   required/>
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
                                       placeholder="Select School" required/>
                            </td>
                            <td className="school-b">
                                <input className="input" list="schools" id="schoolBChange" name="schoolB"
                                       placeholder="Select School" required/>
                            </td>
                        </tr>

                        <tr>
                            <td className="p-2">PLAYER 1</td>
                            <td><input className="input" type="text" id="playerA1Change" name="playerA1"
                                       placeholder="NT1" required/></td>
                            <td><input className="input" type="text" id="playerB1Change" name="playerB1"
                                       placeholder="AND2" required/></td>
                        </tr>
                        <tr>
                            <td className="p-2">PLAYER 2</td>
                            <td><input className="input" type="text" id="playerA2Change" name="playerA2"
                                       placeholder="NT2"/></td>
                            <td><input className="input" type="text" id="playerB2Change" name="playerB2"
                                       placeholder="AND4"/></td>
                        </tr>

                        <tr>
                            <td className="p-2">GAME 1</td>
                            <td><input id="game1AChange" className="input" type="number" name="game1A" min={0}
                                       placeholder={"0"} required/></td>
                            <td><input id="game1BChange" className="input" type="number" name="game1B" min={0}
                                       placeholder={"0"} required/></td>
                        </tr>
                        <tr>
                            <td className="p-2">GAME 2</td>
                            <td><input id="game2AChange" className="input" type="number" name="game2A" min={0}
                                       placeholder={"0"} required/></td>
                            <td><input id="game2BChange" className="input" type="number" name="game2B" min={0}
                                       placeholder={"0"} required/></td>
                        </tr>
                        <tr>
                            <td className="p-2">GAME 3</td>
                            <td><input id="game3AChange" className="input" type="number" name="game3A" min={0}
                                       placeholder={"0"}/></td>
                            <td><input id="game3BChange" className="input" type="number" name="game3B" min={0}
                                       placeholder={"0"}/></td>
                        </tr>
                    </table>
                </div>


                <div className="mt-2 submit-clear flex-horizontal is-justify-content-end is-align-items-end">
                    <input type="button" name="changeButton" className="changeButton button is-link"
                           value="Change"/>
                    <button type="button" className="cancel-modal ml-2 button is-link is-light">Cancel</button>
                </div>
            </form>

        </div>
        <button className="modal-close is-large" aria-label="close"></button>
    </div>

}