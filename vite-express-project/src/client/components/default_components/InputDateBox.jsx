import {useState} from "react";

function InputDateBox(props) {
    return (
        <input id={props.id} placeholder={props.hint} value={props.value} onChange={props.onChange} type="date"/>
    );
}

export default InputDateBox;
