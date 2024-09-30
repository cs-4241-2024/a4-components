import {useState} from "react";
// import "./DataInput.css";
import {refreshTable} from "./DataTable";

export default function DataInput()
{
  const onClick_Submit = async (event) =>
  {
    // Prevent browser from loading a new page
    event.preventDefault();
    
    // Get data from form
    const lt_id        = document.querySelector("#input-id");
    const lt_firstname = document.querySelector("#input-firstname");
    const lt_lastname  = document.querySelector("#input-lastname");

    // Convert data to JSON
    const json = {id: lt_id.value, firstname: lt_firstname.value, lastname: lt_lastname.value};
    const body = JSON.stringify(json);
    
    // Send POST request
    const response = await fetch("/submit", {method:"POST", headers: {"Content-Type": "application/json"}, body});
    const text     = await response.text();

    if (response.ok)
    {
      // Refresh table if OK
      refreshTable();
    }
    else
    {
      // Alert window if error
      window.alert(`ERROR: ${text}`);
    }
  };

  return (
    <div className="DataInput">
      <form>
        <input type="text" id="input-id" defaultValue="Laptop ID"></input>
        <input type="text" id="input-firstname" defaultValue="First Name"></input>
        <input type="text" id="input-lastname" defaultValue="Last Name"></input>
        <button className="removebtn" onClick={onClick_Submit}>Submit</button>
      </form>
    </div>
  )
}