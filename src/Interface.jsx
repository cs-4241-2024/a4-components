import AddPlayerForm from "./components/AddPlayerForm.jsx";
import PlayerTable from "./components/PlayerTable.jsx";
import {useEffect, useState} from "react";
import LogoutButton from "./components/LogoutButton.jsx";
import {useNavigate} from "react-router-dom";


function Interface(){
    const [players,setPlayers] = useState([]);
    const [user,setUser] = useState("");
    const navigate = useNavigate();


    useEffect(()=> {
            getLoggedInUser().then((userString)=>{
                if(userString === ""){
                    navigate("/")
                }
                setUser(userString)
            })
            getPlayers().then(
                (playerData) => {
                    setPlayers(playerData)
                })
    },[])
    if(user !== "") {
        return <main className="w-screen h-screen m-0 p-0 flex justify-center">
            <div className="flex flex-col w-1/5 bg-stone-300">
                <header className="bg-stone-950 text-white p-2.5 text-center text-2xl">
                    Fantasy Football Database<br/>Dynasty vs PPR
                </header>
                <p className="bg-stone-800 text-white p-2.5 text-center text-2xl" id="loggedInUser">{user}</p>
                <div className="pr-2.5 pl-2.5">
                    <AddPlayerForm players={players} setPlayers={setPlayers}></AddPlayerForm>
                </div>
                <div className="flex flex-row flex-grow justify-center">
                    <LogoutButton></LogoutButton>
                </div>
            </div>
            <div className="w-4/5 overflow-auto bg-stone-100 p-2">
                <PlayerTable players={players} setPlayers={setPlayers}></PlayerTable>
            </div>
        </main>
    }
    else{
        return <div></div>
    }
}

async function getPlayers(){
    // fetch table data from backend
    const response = await fetch('/FFtable', {
        method: 'GET'
    })
    console.log(response)
    return JSON.parse(await response.text())
}

async function getLoggedInUser(){
    const response = await fetch('/userName', {
        method: 'get'
    })
    if(response.ok){
        return "User: " + JSON.parse(await response.text())["userName"]
    }
    else{
        return ""
    }
}



export default Interface