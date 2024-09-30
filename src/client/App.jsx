import React, { useState, useEffect } from 'react' // anything with 'useX' in it is called a "hook"

const Todo = props => (
  <table>
    <tbody>
      {props.name}
      {props.price}
      {props.quantity}
      {props.tcost}
      <input type="checkbox" defaultChecked={props.completed} onChange={ e => props.onclick( props.name, e.target.checked ) }/>

    </tbody>
  </table>
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
    const totcost = price * quantity

    fetch( '/add', {
      method:'POST',
      body: JSON.stringify({ name:value, price:value, quantity:value, tcost:totcost, completed:false }),
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
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Cost</th>
            <th>Checked</th>
            <th>Settings</th>
          </tr>
        </thead>

        <tbody id="body">
          { todos.map( (todo,i) => <Todo key={i} name={todo.name} price={todo.price} quantity={todo.quantity} tcost={todo.tcost} completed={todo.completed} onclick={ toggle } /> ) }
        </tbody> 

      </table>

      <tr id="rows"> 
        
      </tr>
    </div>
    
  )
}

export default App