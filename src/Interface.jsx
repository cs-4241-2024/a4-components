import AddPlayerForm from "./components/AddPlayerForm.jsx";
import PlayerTable from "./components/PlayerTable.jsx";
import {useEffect, useState} from "react";


function Interface(){
    const [players,setPlayers] = useState([]);



    useEffect(()=> {
            getPlayers().then(
                (playerData) => {
                    setPlayers(playerData)
                })
    },[])

    return <main className="w-screen h-screen m-0 p-0 flex justify-center">
        <div className="flex flex-col w-1/5 bg-stone-300">
            <header className="bg-stone-950 text-white p-2.5 text-center text-2xl">
                Fantasy Football Database<br/>Dynasty vs PPR
            </header>
            <p className="bg-stone-800 text-white p-2.5 text-center text-2xl" id="loggedInUser"></p>
            <div className="pr-2.5 pl-2.5">
               <AddPlayerForm></AddPlayerForm>
            </div>
            <div className="flex flex-row flex-grow justify-center">

            </div>
        </div>
        <div className="w-4/5 overflow-auto bg-stone-100 p-2">
            <PlayerTable players={players}></PlayerTable>
        </div>
    </main>
}

async function getPlayers(){
    // fetch table data from backend
    const response = await fetch('/FFtable', {
        method: 'GET'
    })
    console.log(response)
    return JSON.parse(await response.text())
}

export default Interface