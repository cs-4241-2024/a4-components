import {useState} from "react";

function InputNumberBox(props) {
    return (
        <input id={props.id} value={props.defaulttext} type="number"/>
    );
}

export default InputNumberBox;