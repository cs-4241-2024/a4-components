import {useState} from "react";

function InputTextBox(props) {
    return (
        <input id={props.id} placeholder={props.defaulttext}/>
    );
}

export default InputTextBox;
