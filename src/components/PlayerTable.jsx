import {useState} from "react";


function PlayerTable({players}) {
    const  [columnNames, setColumnNames] = useState(["Rank Dyn","Rank PPR","Rank Delta","Player Name","Team","Position","Bye Week","Age","Edit","Delete"]);
    const  [currentEdit, setCurrentEdit] = useState("");
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

        let tdCss = "border-4 border-collapse border-stone-100 p-1.5 text-center"
        if(player["_id"]===currentEdit){
            //do other render
        }
        return <tr className={"even:bg-neutral-400 odd:bg-stone-300"}>
            <td className={tdCss}>{player["rDyn"]}</td>
            <td className={tdCss}>{player["rPPR"]}</td>
            <td className={tdCss}>{player["rDelta"]}</td>
            <td className={tdCss}>{player["name"]}</td>
            <td className={tdCss}>{player["team"]}</td>
            <td className={tdCss}>{player["pos"]}</td>
            <td className={tdCss}>{player["byeWeek"]}</td>
            <td className={tdCss}>{player["age"]}</td>
            <td className={"border-4 border-collapse border-stone-100 bg-green-700 hover:bg-green-800 text-white font-bold p-1.5 text-center"}
                onClick={()=>{ setCurrentEdit(player["_id"])}}>Edit</td>
            <td className={"border-4 border-collapse border-stone-100 bg-red-800 hover:bg-red-900 text-white font-bold p-1.5 text-center"}>Delete</td>
        </tr>
    }
}

export default PlayerTable
