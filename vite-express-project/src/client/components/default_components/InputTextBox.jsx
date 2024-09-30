import {useState} from "react";

function InputTextBox(props) {
    return (
        <input id={props.id} placeholder={props.defaulttext} onChange={props.onChange}/>
    );
}

export default InputTextBox;
