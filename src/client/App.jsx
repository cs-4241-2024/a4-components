import React, { useState, useEffect } from 'react'


function Header() {
  return (
    <header>
      <h1>Classmates Tracker</h1>
    </header>
  );
}

function Body() {


  return (
    <main>
      <h2>How to use</h2>
      <p className="p-skinny">
        Use this to keep track of classmates and friends' contact information that you meet throughout the years. 
        To add a person, enter their name, email, phone number, age separated by commas and click submit. 
        To delete a classmate, enter the person's full name into the delete bar, then click delete. 
        To edit a classmate, enter their name, select what you want to edit, and enter the new value.
      </p>

      <h2>Add Classmates</h2>
      <form>
        <input type="text" id="yourname" placeholder="Name,email,phone,age" required />
        <button id="add-button" className="start-button" type="submit">Add</button>
      </form>

      <h2>My Classmates</h2>
      <table className="h-table" id="friend-list"></table>

      <h2>Delete Name</h2>
      <form>
        <input className="input-d" type="text" id="editname" placeholder="Name" required />
        <button id="delete-button" className="delete-button" type="submit">Delete</button>
      </form>

      <h2>Edit List</h2>
      <form className="form-signin">
        <input className="input-d" type="text" id="name-to-edit" placeholder="Name To Edit" required />
        <select id="edit-list">
          <option value="1">Name</option>
          <option value="2">Email</option>
          <option value="3">Phone</option>
          <option value="4">Grade</option>
        </select>
        <input className="input-d" type="text" id="new-value" placeholder="New Value" required />
        <button id="edit-button" className="signin-button" type="submit">Edit</button>
      </form>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <p>Created by Andrew Cash</p>
      <p>Email: arcash@wpi.edu</p>
    </footer>
  );
}

const Todo = props => (
  <tr>
    <td>{props.name}</td>
    <td>{props.email}</td>
    <td>{props.phone}</td>
    <td>{props.grade}</td>
  </tr>
)

function App() {
  const [todos, setTodos] = useState([ ])

  async function add() {
    event.preventDefault();
    const value = document.querySelector('#submit').value

    const json = { str: value};
    const body = JSON.stringify(json);

    const response = await fetch( '/submit', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })

    const text = await response.text();
    updateList();
  }

  async function deletet() {
    event.preventDefault();
    const value = document.querySelector('#delete').value

    const json = { str: value};
    const body = JSON.stringify(json);

    const response = await fetch( '/delete', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })

    const text = await response.text();
    updateList();
  }

  async function edit() {
    event.preventDefault();
    const edit_value = document.querySelector( '#edit-list' ).value
    const name = document.querySelector( '#name-to-edit' ).value
    const new_value = document.querySelector( '#new-value' ).value
    const json = {'edit' : edit_value, 'name' : name, 'new_value' : new_value}
    const body = JSON.stringify( json )

    const response = await fetch( '/edit', {
      method:'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    })

    const text = await response.text();
    updateList();
  }

  async function updateList() {
    try {
      const response = await fetch('/data');
      const data = await response.json();
      setTodos(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    updateList();
  }, []);

  return (
    <div>
      <Header />
      <h2>How to use</h2>
      <p className="p-skinny">
        Use this to keep track of classmates and friends' contact information that you meet throughout the years. 
        To add a person, enter their name, email, phone number, age separated by commas and click submit. 
        To delete a classmate, enter the person's full name into the delete bar, then click delete. 
        To edit a classmate, enter their name, select what you want to edit, and enter the new value.
      </p>

      <h2>Add Classmates</h2>
      <input id = 'submit' type='text' /><button onClick={ e => add()}>Submit</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, i) => (
              <Todo key={i} name={todo.name} email={todo.email} phone={todo.phone} grade={todo.grade} />
          ))}
        </tbody>
      </table>
      <h2>Delete Name</h2>
      <input id = 'delete' type='text' /><button onClick={ e => deletet()}>Delete</button>
      <h2>Edit List</h2>
      <form>
        <input className="input-d" type="text" id="name-to-edit" placeholder="Name To Edit" required />
        <select id="edit-list">
          <option value="1">Name</option>
          <option value="2">Email</option>
          <option value="3">Phone</option>
          <option value="4">Grade</option>
        </select>
        <input className="input-d" type="text" id="new-value" placeholder="New Value" required />
        <button id="edit-button" type="submit" onClick={ e => edit()}>Edit</button>
      </form>
      <Footer />
    </div>
  );
}

export default App