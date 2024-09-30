import React, { useState, useEffect } from "react";

import "../styles/styles.css";

export default function Leaderboard(props){
    const get_data = async function () {
        const response = await fetch("/data", {
            method: "GET",
        });
        
        const data = await response.json();
        
        console.log(data);

        return data;
    };

    const delete_row = async function (event) {
        event.preventDefault();
        const name = document.getElementById("removeField").value;
        if (name == null) return;
        const json = { name };
        const body = JSON.stringify(json);
      
        console.log("requesting delete for " + body);
      
        const response = await fetch("/delete", { 
          method: "POST", 
          headers: {
            "Content-Type": "application/json"
          },
          body });
      
        const data = await response.json();
      
        update_table(data);
    };

    const update_table = function (data) {
        const table = document.getElementById("score_table");
        const rows = table.rows;
        for (var i = 0; i < rows.length; i++) {
          table.deleteRow(0);
        }
        add_rows_to_table(table, data);
    };

    const add_rows_to_table = function (table, data) {
        var tmp_tbody = document.createElement("tbody");
        let name = document.createElement("th");
        name.innerText = "Name";
        let score = document.createElement("th");
        score.innerText = "Score";
        let rank = document.createElement("th");
        rank.innerText = "Date";
      
        let header_row = tmp_tbody.insertRow();
        header_row.appendChild(name);
        header_row.appendChild(score);
        header_row.appendChild(rank);
      
        for (var i = 0; i < data.length; i++) {
            let row = tmp_tbody.insertRow();
            let cell = row.insertCell();
            row.id = "row" + toString(i);
            cell.innerText = data[i].name;
            cell = row.insertCell();
            cell.innerText = data[i].score;
            cell = row.insertCell();
            cell.innerText = data[i].date;
        }
        var tbody = document.getElementById("score_tbody");
        // console.log(tbody)
        tbody.innerHTML = tmp_tbody.innerHTML;
        tmp_tbody.remove();
    };

    useEffect(()=>{
        const data = get_data();
        update_table(data);
    }, [props.reset])

    useEffect(()=>{
        const data = get_data();
        update_table(data);
    }, [])
    
    return  <>
                <h3>
                    <br />
                    Leaderboard:
                </h3>
                <div style={{display: "flex", flexDirection: "row", justifyContent:"center", paddingLeft:"40px"}}>
                    <input type="text" id="removeField" className="nes-input" placeholder="Enter name" />
                    <button id="delete-button" type="button" className="nes-btn is-warning" onClick={delete_row}>Delete score</button>
                </div>
                <table id="score_table">
                    <tbody id="score_tbody">
                    </tbody>
                </table>
            </>;
}