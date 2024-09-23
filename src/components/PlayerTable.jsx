import {useState} from "react";
import ObjectFormInput from "./ObjectFormInput.jsx";


function PlayerTable({players, setPlayers}) {
    const  [columnNames, setColumnNames] = useState(["Rank Dyn","Rank PPR","Rank Delta","Player Name","Team","Position","Bye Week","Age","Edit","Delete"]);

    const  [currentEditID, setCurrentEditID] = useState("");
    const  [editedRecord, setEditedRecord] = useState({});

    return <table className="w-full">
        <tbody className="" id="FFtable">
            <tr id="tableHeaders">
                {columnNames.map((name)=>{return makeTableHeader(name)})}
            </tr>
            {players.map((player)=>{
                return createTableRow(player)
            })}
        </tbody>
    </table>

    function makeTableHeader(name){
        let css = "border-4 border-collapse border-stone-100 w-10Prec text-white p-1.5"

        if(name === 'Edit'){
            css = css + ' bg-green-950'
        }
        else if (name === 'Delete'){
            css = css + ' bg-rose-950'
        }
        else{
            css = css + ' bg-stone-900'
        }

        return <th className={css}>{name}</th>
    }

    function createTableRow(player){

        let playerFields = ["rDyn","rPPR","rDelta","name","team","pos","byeWeek","age"]
        let inputCss = "bg-emerald-50 w-full text-black p-0 m-0 border-0"

        if(player["_id"]===currentEditID){
            //do other render
            return <tr className={"even:bg-neutral-400 odd:bg-stone-300"}>
                {
                    playerFields.map((field,index)=> {
                        return <td className={"border-4 border-collapse border-stone-100 p-1.5 text-center"}>
                            <ObjectFormInput field={field} object={editedRecord} setObject={setEditedRecord}
                                             css={inputCss}></ObjectFormInput>
                        </td>
                    })
                }
                <td className={"border-4 border-collapse border-stone-100 bg-green-700 hover:bg-green-800 text-white font-bold p-1.5 text-center"}
                    onClick={()=>{ handleSave().then()}}>Save</td>
                <td className={"border-4 border-collapse border-stone-100 bg-red-800 hover:bg-red-900 text-white font-bold p-1.5 text-center"}
                    onClick={()=>{ handleDelete(player["_id"]).then()}}>Delete</td>
            </tr>
        }
        return <tr className={"even:bg-neutral-400 odd:bg-stone-300"}>
            {
                playerFields.map((field)=> {
                    return <td className={"border-4 border-collapse border-stone-100 p-1.5 text-center"}>{player[field]}</td>
                })
            }
            <td className={"border-4 border-collapse border-stone-100 bg-green-700 hover:bg-green-800 text-white font-bold p-1.5 text-center"}
                onClick={()=>{ handleEdit(player)}}>Edit</td>
            <td className={"border-4 border-collapse border-stone-100 bg-red-800 hover:bg-red-900 text-white font-bold p-1.5 text-center"}
                onClick={()=>{ handleDelete(player["_id"]).then()}}>Delete</td>
        </tr>
    }

    function handleEdit(player){
        setCurrentEditID(player["_id"])
        setEditedRecord(player)
    }

    async function handleSave() {
        let editMessage = {dbId:currentEditID , editedRecord: editedRecord}
        const responseEdit = await fetch('/edit', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(editMessage)
        })

        if (responseEdit.ok) {
            //add edit to players so no need to go back to request again from db
            let editedPlayers = structuredClone(players)
            for(let i=0;i<editedPlayers.length;i++){
                if(editedRecord["_id"] === editedPlayers[i]["_id"]){
                    editedPlayers[i] = structuredClone(editedRecord)
                    break;
                }
            }
            setPlayers(editedPlayers)
            //no longer editing
            setEditedRecord({})
            setCurrentEditID("")

        } else {
            console.error("edit failed")
        }
    }

    async function handleDelete(dbIdToDelete){
        let message = JSON.stringify({dbId: dbIdToDelete})

        const response = await fetch('/delete', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: message
        })

        if(response.ok){
            //update players so no need to go back to db
            let deletedPlayers = structuredClone(players)
            for(let i=0;i<deletedPlayers.length;i++){
                if(dbIdToDelete === deletedPlayers[i]["_id"]){
                    deletedPlayers.splice(i,1) //delete the record
                    break;
                }
            }
            setPlayers(deletedPlayers)
        }
        else{
            console.error("delete failed")
        }


    }

}

export default PlayerTable
