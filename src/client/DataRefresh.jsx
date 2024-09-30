import {useState} from "react";
// import "./DataRefresh.css";
import {refreshTable} from "./DataTable";

export default function DataRefresh()
{
  const onClick_Refresh = async (event) =>
  {
    refreshTable();
  };

  return (
    <div className="DataRefresh">
      <button id="rfrsh" className="refreshbtn" onClick={onClick_Refresh}>Pull from Server</button>
    </div>
  )
}