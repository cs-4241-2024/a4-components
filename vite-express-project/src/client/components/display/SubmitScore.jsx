import {useState} from "react";
import InputTextBox from "../default_components/InputTextBox.jsx";
import InputDateBox from "../default_components/InputDateBox.jsx";
import InputNumberBox from "../default_components/InputNumberBox.jsx";
import BlueButton from "../default_components/BlueButton.jsx";


function SubmitScore(props) {
    const [points, setPoints] = useState();
    const [date, setDate] = useState(Date.now);

    const SubmitScore = (e) => {
        e.preventDefault();
        const json = { name: props.shortname, date: date, points: points},
            body = JSON.stringify(json)
        fetch( '/score/add', {
            headers: {"Content-Type": "application/json" },
            method:'POST',
            body: body
        }).then(res => {
            if (res.status === 200){
                alert("Score added")
            } else {
                alert("Something went wrong")
            }
        })
        props.load();
    }
    return (
        <form onSubmit={SubmitScore}>
            <InputDateBox id={"thedate"} hint={"the date"} onChange={(e)=> setDate(e.target.value)}></InputDateBox>
            <InputNumberBox id={"points"} hint={"points"} onChange={(e) => setPoints(e.target.value)}></InputNumberBox>
            <BlueButton id={"submitbutton"} label={"submit"} ></BlueButton>
        </form>
    );
}

export default SubmitScore;