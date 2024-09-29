import {useState} from "react";
import InputTextBox from "../default_components/InputTextBox.jsx";
import InputDateBox from "../default_components/InputDateBox.jsx";
import InputNumberBox from "../default_components/InputNumberBox.jsx";
import BlueButton from "../default_components/BlueButton.jsx";


function SubmitScore(props) {
    const SubmitScore = (e) => {
        e.preventDefault();
        console.log("aaaaag")
    }
    return (
        <form onSubmit={SubmitScore}>
            <InputDateBox id="thedate" value="the date"></InputDateBox>
            <InputNumberBox id="points" value="points"></InputNumberBox>
            <BlueButton id="submitbutton" label={"submit"} ></BlueButton>
        </form>
    );
}

export default SubmitScore;