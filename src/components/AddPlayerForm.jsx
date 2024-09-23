import {useState} from "react";
import ObjectFormInput from "./ObjectFormInput.jsx";


function AddPlayerForm({players,setPlayers}) {
    const  [teams, setTeams] = useState(["ARI","BAL","BUF","CAR","CHI","CIN","CLE","DAL","DEN","DET","GB","HOU","IND","JAC","KC","LAC","LAR","LV",
        "MIA","MIN","NE","NO","NYG","NYJ","PHI","PIT","SEA","SF","TB","TEN","WAS","FA"]);
    const  [positions, setPositions] = useState(["WR","RB","QB","TE","K","DST"]);

    const  [newPlayer, setNewPlayer] = useState({
        rDyn : "",
        rPPR : "",
        name : "",
        team : "ARI",
        pos : "WR",
        byeWeek : "",
        age : ""
    });

    let inputCss ="border-0 bg-stone-300 placeholder-gray-600"

    return <form id="playerEntry" className="flex flex-col mt-5 rounded-xl bg-stone-800 p-2.5">
        <header className="font-bold text-white mb-2.5 flex justify-center text-xl">
            Add Player
        </header>
        <div className="bg-stone-500 rounded h-1"></div>
        <label className="mt-1 text-white" htmlFor="rDyn">Rank Dynasty</label>
        <ObjectFormInput css={inputCss} field={"rDyn"} object={newPlayer}  setObject={setNewPlayer}
                         type={"number"} placeholder={"1-*"} id={"rDyn"}></ObjectFormInput>

        <label className="mt-1 text-white" htmlFor="rPPR">Rank PPR</label>
        <ObjectFormInput css={inputCss} field={"rPPR"} object={newPlayer}  setObject={setNewPlayer}
                         type={"number"} placeholder={"1-*"} id={"rPPR"}></ObjectFormInput>

        <label className="mt-1 text-white" htmlFor="name">Name</label>
        <ObjectFormInput css={inputCss} field={"name"} object={newPlayer}  setObject={setNewPlayer}
                         placeholder={"Cool Person"} id={"name"}></ObjectFormInput>

        <label className="mt-1 text-white" htmlFor="team">Team</label>
        <select className="border-0 bg-stone-300" id="team" value={newPlayer["team"]}
                onChange={(e)=>{
                    let edit = structuredClone(newPlayer)
                    edit["team"] = e.target.value
                    setNewPlayer(edit)
                }} >
            {
                teams.map((team)=>{
                    return makeOption(team)
                })
            }
        </select>

        <label className="mt-1 text-white" htmlFor="pos">Position</label>
        <select className="border-0 bg-stone-300" id="pos" value={newPlayer["pos"]}
                onChange={(e)=>{
                    let edit = structuredClone(newPlayer)
                    edit["pos"] = e.target.value
                    setNewPlayer(edit)
                }} >
            {
                positions.map((position)=>{
                    return makeOption(position)
                })
            }
        </select>

        <label className="mt-1 text-white" htmlFor="byeWeek">Bye Week</label>
        <ObjectFormInput css={inputCss} field={"byeWeek"} object={newPlayer}  setObject={setNewPlayer} type={"number"}
                         placeholder={"1-18"} id={"byeWeek"}></ObjectFormInput>

        <label className="mt-1 text-white" htmlFor="age">Age</label>
        <ObjectFormInput css={inputCss} field={"age"} object={newPlayer}  setObject={setNewPlayer} type={"number"}
                         placeholder={"1-99"} id={"age"}></ObjectFormInput>

        <div className="mt-2.5 bg-stone-500 rounded h-1"></div>
        <button
            className="self-center w-2/5 mt-2.5 mb-1 py-2  justify-center border-0 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded"
            id="EntrySubmit" onClick={(e)=>{e.preventDefault(); addPlayer().then()}}>Submit
        </button>
    </form>

    function makeOption(val){
        return <option value={val}>{val}</option>
    }

    async function addPlayer() {
        let message = JSON.stringify(newPlayer)

        const response = await fetch('/submit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: message
        })
        if (response.ok) {
            //get new player added and add it to players so that we do not have to get all the records again
            let dbIdToGet = {dbId: await response.text()}
            console.log(dbIdToGet)
            let mes = JSON.stringify(dbIdToGet)

            const res = await fetch('/record', {
                method: 'POST',
                headers:{'Content-Type': 'application/json'},
                body:mes
            })
            let newRecord = JSON.parse(await res.text())
            let newPlayers = structuredClone(players)
            newPlayers.push(newRecord)
            setPlayers(newPlayers)
        }
        else{
            console.error("failed to add player")
        }
    }
}


export default AddPlayerForm
