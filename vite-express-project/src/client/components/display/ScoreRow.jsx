import SubmitScore from "./SubmitScore.jsx";
import InputDateBox from "../default_components/InputDateBox.jsx";
import InputNumberBox from "../default_components/InputNumberBox.jsx";
import BlueButton from "../default_components/BlueButton.jsx";
import {useState} from "react";

function ScoreRow(props) {
    const [points, setPoints] = useState(props.score.points);
    const [date, setDate] = useState(props.score.date);

    const del = ()=> {
        fetch('/score/delete/' + props.score._id, {
            headers: {"Content-Type": "application/json"},
            method: 'DELETE',
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully deleted");
                props.load();
            } else {
                alert("Something went wrong");
            }
        })
    }
    const save = ()=>{
        const data = props.score;
        data.points = points;
        data.date = date;
        const json = {data : data},
            body = JSON.stringify(json)

        fetch('/score/update/', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: body
        }).then(res => {
            if (res.status === 200) {
                alert("Successfully edited");
                props.load();
            } else {
                alert("Something went wrong");
            }
        })
    }

    return (
        <tr>
            <td>{props.score.name}</td>
            <td><InputDateBox value={date} onChange={(e)=> setDate( e.target.value)}></InputDateBox></td>
            <td><InputNumberBox value={points} onChange={(e)=> setPoints(e.target.value)}></InputNumberBox></td>
            <td>{props.score.rank}</td>
            <td><BlueButton label={"save"} onclick={(e)=>save()}></BlueButton></td>
            <td><BlueButton label={"delete"} onclick={(e)=>del()}></BlueButton></td>
        </tr>
    );
}

export default ScoreRow;