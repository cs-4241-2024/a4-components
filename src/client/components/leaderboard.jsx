import React, { useState, useEffect } from "react";

import "../styles/styles.css";

export default function Leaderboard(props){
    const [dataArray, setDataArray] = useState([]);

    const get_data = async function () {

        const response = await fetch("/data", {
            method: "GET",
        });
        
        const data = await response.json();
        
        //console.log("Data received from Server:");
        //console.log(data);
        setDataArray(data)
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
      
        get_data(data);
    };

   useEffect(()=>{
        get_data();
    }, [props.reset])

    useEffect(()=>{
        get_data();
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
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Score</th>
                            <th>Date</th>
                        </tr>
                        </thead>
                        <tbody id="score_tbody"> 
                        { 
                            // dataArray.length > 0 ? (
                            // console.log(dataArray[0].name)) : console.log("No data found")
                    
                            dataArray.length > 0 ? (
                                dataArray.map((dataPoint, i)=> { 
                                    return <tr key ={i}>
                                        <td>{dataPoint.name}</td>
                                        <td>{dataPoint.score}</td>
                                        <td>{dataPoint.date}</td>
                                    </tr>
                                })

                            ) : (
                                    <tr span="3"><td>No data available</td></tr>
                            ) 
                        }
                    </tbody>
                </table>
            </>;
}