import {useState} from "react";

function InputDateBox(props) {
    return (
        <input id={props.id} value={props.defaulttext} type="date"/>
    );
}

export default InputDateBox;
