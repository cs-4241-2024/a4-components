import React, { useState, useEffect } from 'react' // anything with 'useX' in it is called a "hook"
import {Table} from './Components.jsx'
import {Input} from './Components.jsx'

const Todo = props => (
  <tbody>
    {props.name}
    {props.price}
    {props.quantity}
    {props.tcost}
    <input type="checkbox" defaultChecked={props.completed} onChange={ e => props.onclick( props.name, e.target.checked ) }/>

  </tbody>

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
    const value = document.querySelector('input').value
    const price = document.querySelector('price').value
    const quant = document.querySelector('quantity').value
    const totcost = price * quantity

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
      
      <table class="tab">  
        <Table />
        <td>
          <tbody id="body">
            { todos.map( (todo,i) => <Todo key={i} name={todo.name} price={todo.price} quantity={todo.quantity} tcost={todo.tcost} completed={todo.completed} onclick={ toggle } /> ) }
          </tbody>
        </td>
      </table>

      <tr id="rows"> 
        
      </tr>
    </div>
    
  )
}

export default App