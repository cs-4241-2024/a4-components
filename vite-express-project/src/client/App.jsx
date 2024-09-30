import React, { useState, useEffect } from 'react'

const Todo = props => (
  <li>{props.name} : 
    <input type="checkbox" defaultChecked={props.completed} onChange={ e => props.onclick( props.name, e.target.checked ) }/>
  </li>
)

const App = () => {
  const [todos, setTodos] = useState([ ]) 

  function toggle( name, completed ) {
    fetch( '/change', {
      method:'POST',
      body: JSON.stringify({ name, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  function add() {
    const value = document.querySelector('input').value

    fetch( '/add', {
      method:'POST',
      body: JSON.stringify({ name:value, completed:false }),
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

  useEffect(()=> {
    fetch( '/read' )
      .then( response => response.json() )
      .then( json => {
        setTodos( json ) 
      })
  }, [] )
    
  useEffect( ()=> {
    document.title = `${todos.length} todo(s)`
  })

  return (
    <div className="App">
  <form className="vertical-form" onSubmit={e => { e.preventDefault(); add(); }}>
    <label htmlFor="ToDo">Item To Do:</label>
    <input type="text" id="ToDo" placeholder="Enter a to-do item" required />

    <label htmlFor="type">Type of Work:</label>
    <select name="type" id="type" required>
      <option value="school">School</option>
      <option value="work">Work</option>
      <option value="personal">Personal</option>
    </select>

    <label htmlFor="date">Due Date:</label>
    <input type="date" id="date" required />

    <button type="submit">Add</button> {/* Set type to "submit" */}
    
    <ul>
      {todos.map((todo, i) => (
        <Todo key={i} name={todo.name} completed={todo.completed} onclick={toggle} />
      ))}
    </ul>
  </form>
</div>
  )
}

export default App