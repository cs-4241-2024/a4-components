import React, { useState, useEffect } from 'react' // anything with 'useX' in it is called a "hook"
import {Table} from './Components.jsx'
import {Input} from './Components.jsx'

function stopEdit() { // closes editing tab
  document.querySelector("#editor").style.display = "none";
}

function editRow(entry, setTodos) {
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
      id: entry.id
    };

    try {
      const response = await fetch(`/change/${id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(updatedEntry),
      });
      if (response.ok) {
        const data = await response.json();
        console.log("Updated data:", data);
        setTodos(data);
        stopEdit();
      } else {
        console.error("Failed to update entry.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
}

const deleteRow = async function(id, setTodos) {
  //let id = entry.id;
  try {
    const response = await fetch(`/delete/${id}`, {method: "DELETE"});
    if (response.ok) { // successfully deleted
      const data = await response.json();
      console.log("Received data:", data);
      setTodos(data); // display the new data
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
      <button onClick={(e) => {e.preventDefault(); editRow(props, props.setTodos)}}>Edit</button>
      <button onClick={(e) => {e.preventDefault(); deleteRow(props.id, props.setTodos)}}>Delete</button>
    </td>
  </tr>

)

const App = () => {
  const [todos, setTodos] = useState([ ]) 

  async function toggle(todo) {
    todo.completed = !todo.completed;

    const response = await fetch(`/change/${todo.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(todo),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("Updated data:", data);
      setTodos(data);
    }
  }

  function add() {
    //console.log("------------------------------------")
    const value = document.querySelector('#name').value
    const price = document.querySelector('#price').value
    const quant = document.querySelector('#quantity').value
    const totcost = price * quant

    if (!(value && price && quant)) {
      console.log("Nothing was submitted.");
    }
    else {
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
  }
  
  // make sure to only do this once
  if(todos.length === 0) {
    fetch('/read')
      .then(response => response.json())
      .then(json => {
        setTodos(json) 
      })
  }

  useEffect( ()=> {
    document.title = `${todos.length} todo(s)`
  })

  return (
    <div>
      <h1>
        Shopping List
      </h1>

      <form>
        <input type="text" id="name" placeholder="Item name:" required />
        <input type="number" id="price" placeholder="Price:" min="0" required />
        <input type="number" id="quantity" placeholder="Quantity:" min="1" required />
        <br/> <br/>
        <button onClick={ e => add()}>add</button>

      </form>
      
      <div className="App">
        <h2>Things to buy:</h2>
        
        <table className="tab">  
          <Table />
            <tbody id="body">
              { todos.map( (todo,i) => <Todo key={i} name={todo.name} price={todo.price} quantity={todo.quantity} tcost={todo.tcost} completed={todo.completed} id={todo.id} onclick={() => toggle(todo)} setTodos={setTodos} /> ) }
            </tbody>
        </table>
      </div>

      <div id="editor" style={{display: "none"}}>
        <h2>Edit Entry</h2>
        <form id="editForm">
          <label htmlFor="editItem">Item:</label>
          <input type="text" id="editItem" name="name" required /><br />
          <label htmlFor="editPrice">Price:</label>
          <input type="number" id="editPrice" name="price" min="0" step="any" required /><br />
          <label htmlFor="editQuantity">Quantity:</label>
          <input type="number" id="editQuantity" name="quantity" min="1" required /><br />
          <input type="hidden" id="editId" />
          <button type="submit">save</button>
          <button type="button" onClick={stopEdit}>cancel</button>
        </form>
      </div>
    
    </div>
    
  )
}

export default App