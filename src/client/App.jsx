import {useEffect, useState} from "react";
import "./App.css";
import DataInput from "./DataInput.jsx"
import DataTable, { refreshTable } from "./DataTable.jsx"
import DataRefresh from "./DataRefresh.jsx";

function App() {
  return (
    <div className="block">
      <h1>Active Laptop Loans</h1>
      <DataInput />
      <DataTable />
      <DataRefresh />
    </div>
  );
}

export default App;
