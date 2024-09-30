import React, { useState, useEffect } from 'react'

const Todo = props => (
        <tr>
          <th>{props.name} </th>
          <th> {props.date} </th>
          <th>{props.sold}</th>
          <th>{props.capacity}</th>
          <th>{props.status}</th>
        </tr>
)

const App = () => {
  const [todos, setTodos] = useState([ ]) 

  function add() {
    const name = document.getElementById('name').value
    const date = document.getElementById('date').value
    const sold = document.getElementById('sold').value
    const capacity = document.getElementById('capacity').value

    //console.log(value);
    fetch('/add', {
      method: 'POST',
      body: JSON.stringify({ name: name, date: date, sold: sold, capacity: capacity}),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        setTodos(json)
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
    
  useEffect( ()=> {
    document.title = `${todos.length} todo(s)`
  })

  return (
    <div class="app">
      <div id="event-form">
        <h1>New Event Form</h1>
        <form>
          <label for="name">Event:</label>
          <input type="text" id="name" required></input><br></br>

          <label for="date">Date:</label>
          <input type="date" id="date" required></input><br></br>

          <label for="sold">Tickets Sold:</label>
          <input type="number" id="sold" required></input><br></br>

          <label for="capacity">Capacity:</label>
          <input type="number" id="capacity" required></input><br></br>

          <button onClick={e => add()}>submit</button>
        </form>
      </div>
      <div id="event-list">
        <h2>Event List</h2>
        <table>
      <thead>
          <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Tickets Sold</th>
              <th>Capacity</th>
              <th>Status</th>
          </tr>
      </thead>
      <tbody>
      {todos.map((todo, i) => <Todo key={i} name={todo.name} date={todo.date} sold={todo.sold} capacity={todo.capacity} status={todo.status}/>)}
      </tbody>
  </table> 
      </div>
    </div>
  )
}

export default App