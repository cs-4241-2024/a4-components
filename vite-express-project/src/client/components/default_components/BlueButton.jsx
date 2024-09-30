import {useState} from "react";
import InputTextBox from "./InputTextBox.jsx";

function BlueButton(props) {
    //TODO: add color
    return (
        <button id={props.id} onClick={props.onclick}>{props.label}</button>
    );
}

export default BlueButton;