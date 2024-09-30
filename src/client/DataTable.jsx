import {useEffect, useState} from "react";
// import "./DataTable.css";

function getTableHeader(id)
{
  switch (id)
  {
  case "id":
    return "Laptop ID";
  
  case "firstname":
    return "First Name";
  
  case "lastname":
    return "Last Name";

  case "dup":
    return "Duplicate Client?"

  default:
    return "Unknown";
  }
}

export async function refreshTable()
{
  // Reference: https://www.geeksforgeeks.org/javascript-fetch-method/
  let tableData;

  // Get data from server
  await fetch("/table").then(response => response.json()).then(data =>
    {
      tableData = data;
      // console.log(tableData);
    }
  );

  // Reference: https://stackoverflow.com/questions/27594957/how-to-create-a-table-using-a-loop
  let newTable = document.createElement("table");
  let tr, th, td, row, col, btn;

  // Get row and column count of table
  let rowCount = tableData.length - 1;
  let colCount = (rowCount > 0) ? (Object.keys(tableData[0]).length + 1) : 5;

  newTable.id = "laptops";
  
  // Rebuild headers
  tr = document.createElement("tr");
  for (col = 0; col < colCount; col++)
  {
    th = document.createElement("th");
    if (col !== colCount - 1)
    {
      th.textContent = getTableHeader(Object.keys(tableData[0])[col]);
    }
    else
    {
      th.className = "removecol";
    }
    tr.appendChild(th);
  }

  newTable.appendChild(tr);

  // Build new data rows
  for (row = 1; row <= rowCount; row++)
  {
    tr = document.createElement("tr");
    for (col = 0; col < colCount; col++)
    {
      td = document.createElement("td");
      
      switch(col)
      {
      case 0:
        td.textContent = tableData[row].id;
        break;

      case 1:
        td.textContent = tableData[row].firstname;
        break;

      case 2:
        td.textContent = tableData[row].lastname;
        break;

      case 3:
        td.textContent = (tableData[row].dup === true) ? "Yes" : "No";
        break;

      // Add remove button to each row
      case 4:
        btn = document.createElement("button");
        btn.id = `removebtn-${row}`;
        btn.textContent = "Remove";
        btn.className = "removebtn";
        btn.onclick = onClick_Remove;
        td.className = "removecol";
        td.appendChild(btn);
        break;

      default:
        td.textContent = "No such attribute.";
        break;
      }

      tr.appendChild(td);
    }
    newTable.appendChild(tr);
  }

  // Replace existing table
  document.querySelector("#laptops").replaceWith(newTable);
}

const onClick_Remove = async (event) =>
{
  // Get corresponding laptop ID
  let button = document.querySelector(`#${event.currentTarget.id}`);
  let row = button.parentNode.parentNode;
  let laptopID = parseInt(row.cells[0].innerText);
  
  // Convert to JSON
  let json = {id: laptopID};
  let body = JSON.stringify(json);

  // Send POST request
  let response = await fetch("/remove", {method:"POST", headers: {"Content-Type": "application/json"}, body});

  if (response.ok)
  {
    // Refresh table if OK
    refreshTable();
  }
};

export default function DataTable()
{
  useEffect(() => {refreshTable()}, []);

  return (
    <div className="DataTable">
      <table id="laptops">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Duplicate Client?</th>
            <th className="removecol"></th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  )
}