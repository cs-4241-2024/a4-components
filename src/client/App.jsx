import React, { useState, useEffect } from 'react'

const Todo = props => (
  <table>
    <tbody>
    <tr>
      <th>{props.number} </th>
      <th> {props.operation} </th>
      <th>{props.currentTotal}</th>
    </tr>
    </tbody>
  </table>
)

const App = () => {
  const [todos, setTodos] = useState([])

  /*function toggle( name, completed ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
  }*/

  function add() {
    const value = document.getElementById('number').value
    const opera = document.getElementById('operation').value
    //console.log(value);
    fetch('/add', {
      method: 'POST',
      body: JSON.stringify({ number: value, operation: opera }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        setTodos(json)
      })
  }

  function kill() {
    fetch('/kill', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(json => {
        setTodos(json)
      })
  }



  // make sure to only do this once
  if (todos.length === 0) {
    fetch('/read')
      .then(response => response.json())
      .then(json => {
        setTodos(json)
      })
  }

  useEffect(() => {
    document.title = `${todos.length} todo(s)`
  })

  return (
    <center>
      <label htmlFor="number">Inserted Number:</label>
      <input type="number" id="number"></input><br></br>
      <br></br>
      <label htmlFor="operation">Your Operation:</label>
      <input type="text" id="operation"></input><br></br>
      <p id="KindsOfDivision">Only whole numbered integers are allowed in the first box (you can write negative inputs)</p>
      <p id="KindsOfDivision2">Please note the only aceptable options for the second box are: Add, Sub, Mult, Div</p>
      <button onClick={e => add()}>submit</button>
      {todos.map((todo, i) => <Todo key={i} number={todo.number} operation={todo.operation} currentTotal={todo.currentTotal} />)}
      <p>If you do not like your latest input, press this button and delete the row!</p>
      <button onClick={e => kill()}>KILL</button>
    </center>

  )
}

export default App