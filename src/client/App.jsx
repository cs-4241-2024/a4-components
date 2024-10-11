import React, { useState, useEffect } from 'react' // anything with 'useX' in it is called a "hook"
import {Table} from './Components.jsx'
import {Input} from './Components.jsx'

function editRow(entry) {
  document.querySelector("#editItem").value = entry.name;
  document.querySelector("#editPrice").value = entry.price;
  document.querySelector("#editQuantity").value = entry.quantity;
  document.querySelector("#editId").value = entry.id;
  document.querySelector("#editor").style.display = "block";

  document.querySelector("#editForm").onsubmit = async function(event) {
    event.preventDefault();

    const id = document.querySelector("#editId").value;
    const updatedEntry = {
      name: document.querySelector("#editItem").value,
      price: document.querySelector("#editPrice").value,
      quantity: document.querySelector("#editQuantity").value,
    };

    try {
      const response = await fetch(`/editor/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedEntry),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Updated data:", data);
        displayRows(data);
        stopEdit();
      } else {
        console.error("Failed to update entry.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

function stopEdit() { // closes editing tab
  document.querySelector("#editor").style.display = "none";
}

const deleteRow = async function(id) {
  try {
    const response = await fetch(`/delete/${id}`, {method: "DELETE"});
    if (response.ok) { // successfully deleted
      const data = await response.json();
      console.log("Received data:", data);
      displayRows(data); // display the new data
    } else {
      console.error("Failed to delete entry.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};


const Todo = props => (
  <tr> 
    
    <td>{props.name}</td>
    <td>{props.price}</td>
    <td>{props.quantity}</td>
    <td>{props.tcost}</td>
    <td><input type="checkbox" defaultChecked={props.completed} onChange={ e => props.onclick( props.name, props.price, props.quantity, props.tcost, e.target.checked ) }/></td>
    
    <td>
      <button onClick={() => editRow(props)}>Edit</button>
      <button onClick={() => deleteRow(props)}>Delete</button>
    </td>
    {/* const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editRow(entry);
    tr.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteRow(entry.id);
    tr.appendChild(deleteButton); */}


  </tr>

)

const App = () => {
  const [todos, setTodos] = useState([ ]) 

  function toggle( name, price, quantity, tcost, completed ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name, price, quantity, tcost, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  function add() {
    console.log("------------------------------------")
    const value = document.querySelector('#name').value
    const price = document.querySelector('#price').value
    const quant = document.querySelector('#quantity').value
    const totcost = price * quant
    debugger
    fetch( '/add', {
      method:'POST',
      body: JSON.stringify({ name:value, price:price, quantity:quant, tcost:totcost, completed:false }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       setTodos( json )
    })
  }
  
  // make sure to only do this once
  if( todos.length === 0 ) {
    fetch( '/read' )
      .then( response => response.json() )
      .then( json => {
        setTodos( json ) 
      })
  }
  
  // render() {
  //   let heading = ["Item", "Price", "Quantity", "Total Cost", "Completed", "Settings"];
  // }

  useEffect( ()=> {
    document.title = `${todos.length} todo(s)`
  })

  return (
    <div className="App" id="root">
      <button onClick={ e => add()}>add</button>
      <h2>Things to buy:</h2>
      
      <table className="tab">  
        <Table />
          <tbody id="body">
            { todos.map( (todo,i) => <Todo key={i} name={todo.name} price={todo.price} quantity={todo.quantity} tcost={todo.tcost} completed={todo.completed} id={todo.id} onclick={ toggle } /> ) }
          </tbody>
      </table>
    </div>
    
  )
}

export default App