import {useState} from "react";

function InputNumberBox(props) {
    return (
        <input id={props.id} placeholder={props.hint} value={props.value} onChange={props.onChange} type="number"/>
    );
}

export default InputNumberBox;