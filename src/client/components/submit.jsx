import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useState, useEffect } from "react";

import "../styles/styles.css";

export default function SubmitPopup(props){

  const submit = async function (event) {
      // stop form submission from trying to load
      // a new .html page for displaying results...
      // this was the original browser behavior and still
      // remains to this day
      event.preventDefault();

      const name = document.getElementById("nameField").value;
      // need to do a little processing to get the score to only be the number
      let score = document.getElementById("score").innerText;
      score = score.split(" ")[1];
      // Log for debugging
      console.log("Name:", name, "Score", score)
      let json, body;
      (json = { name, score }), (body = JSON.stringify(json));
      
      console.log("sending " + body);
      
      const response = await fetch("/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body,
      });
      
      const data = await response.json();
      console.log(data);
      reset()
    };
  
  const reset = function(){
    props.setReset(s=>s+1);
    props.setShowSubmit(s=>false);
  }

  return <Dialog open={props.showForm}>
    <DialogTitle>Game Over</DialogTitle>
    <form className="form-container">
        <input type="text" id="nameField" placeholder="Enter name" />
        <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
          <button type="button" id="submit-button" className="nes-btn is-success" onClick={submit}>Submit score</button>
          <button type="button" id="close-button" className="nes-btn is-error" onClick={reset}>Close</button>
        </div>
      </form>
  </Dialog>
}