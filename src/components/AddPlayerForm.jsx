import {useState} from "react";


function AddPlayerForm() {
    const  [teams, setTeams] = useState(["ARI","BAL","BUF","CAR","CHI","CIN","CLE","DAL","DEN","DET","GB","HOU","IND","JAC","KC","LAC","LAR","LV",
        "MIA","MIN","NE","NO","NYG","NYJ","PHI","PIT","SEA","SF","TB","TEN","WAS","FA"]);

    const  [positions, setPositions] = useState(["WR","RB","QB","TE","K","DST"]);



    return <form id="playerEntry" className="flex flex-col mt-5 rounded-xl bg-stone-800 p-2.5">
        <header className="font-bold text-white mb-2.5 flex justify-center text-xl">
            Add Player
        </header>
        <div className="bg-stone-500 rounded h-1"></div>
        <label className="mt-1 text-white" htmlFor="rDyn">Rank Dynasty</label>
        <input className="border-0 bg-stone-300 placeholder-gray-600" type="number" id="rDyn"
               placeholder="1-*"/>

        <label className="mt-1 text-white" htmlFor="rPPR">Rank PPR</label>
        <input className="border-0 bg-stone-300 placeholder-gray-600" type="number" id="rPPR"
               placeholder="1-*"/>

        <label className="mt-1 text-white" htmlFor="name">Name</label>
        <input className="border-0 bg-stone-300 placeholder-gray-600" type="text" id="name"
               placeholder="Cool Person"/>

        <label className="mt-1 text-white" htmlFor="team">Team</label>
        <select className="border-0 bg-stone-300" id="team">
            {
                teams.map((team)=>{
                    return makeOption(team)
                })
            }
        </select>

        <label className="mt-1 text-white" htmlFor="pos">Position</label>
        <select className="border-0 bg-stone-300" id="pos">
            {
                positions.map((position)=>{
                    return makeOption(position)
                })
            }
        </select>

        <label className="mt-1 text-white" htmlFor="byeWeek">Bye Week</label>
        <input className="border-0 bg-stone-300 placeholder-gray-600" type="number" id="byeWeek"
               placeholder="1-18"/>

        <label className="mt-1 text-white" htmlFor="age">Age</label>
        <input className="border-0 bg-stone-300 placeholder-gray-600" type="number" id="age"
               placeholder="1-99"/>

        <div className="mt-2.5 bg-stone-500 rounded h-1"></div>
        <button
            className="self-center w-2/5 mt-2.5 mb-1 py-2  justify-center border-0 bg-blue-600 hover:bg-blue-800 text-white font-bold rounded"
            id="EntrySubmit">Submit
        </button>
    </form>

    function makeOption(val){
        return <option value={val}>{val}</option>
    }

}


export default AddPlayerForm
