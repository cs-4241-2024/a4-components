import reactLogo from "./assets/react.svg";
import "./App.css";

import React, { useState, useEffect } from 'react'




const Book = props => (
  <tr>
    <th>{props.title}</th>
    <th>{props.author}</th>
    <th>{props.year}</th>
    <th>{props.genre}</th>
    <th>{props.ranking}</th>
    <th>{props.authorStars}</th>
  </tr>
)



const App = () => {

  const [books, setBooks] = useState([])


  function change() {//need to change this
    const value = Number(document.querySelector('#row').value)
    const value2 = Number(document.querySelector('#col').value)
    const value3 = document.querySelector('#newVal').value

    fetch('/change', {
      method: 'POST',
      body: JSON.stringify({ row: value, col: value2, newVal: value3 }),
      headers: { 'Content-Type': 'application/json' }
    })
    fetch('/read')
      .then(response => response.json())
      .then(json => {
        setBooks(json)
      })
  }

  function toggle(name, completed) {
    fetch('/change', {
      method: 'POST',
      body: JSON.stringify({ name, completed }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        setBooks(json)
      })
  }

  function add() {
    const value = document.querySelector('#title').value
    const value2 = document.querySelector('#author').value
    const value3 = Number(document.querySelector('#year').value)
    const value4 = document.querySelector('#genre').value
    const value5 = Number(document.querySelector('#ranking').value)

    fetch('/add', {
      method: 'POST',
      body: JSON.stringify({ title: value, author: value2, year: value3, genre: value4, ranking: value5, authorStars: Number(0) }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        setBooks(json)
      })
  }

  function deleter() {
    const value6 = document.querySelector('#delTitle').value

    fetch('/deleter', {
      method: 'POST',
      body: JSON.stringify({ title: value6 }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then(json => {
        setBooks(json)
      })
  }

  // make sure to only do this once
  if (books.length === 0) {
    fetch('/read')
      .then(response => response.json())
      .then(json => {
        setBooks(json)
      })
  }
  //useEffect( ()=> {
  //document.title = `${todos.length} todo(s)`
  //})

  return (
    <div className="App">

      <h2>Book Collection Manager</h2>

      <div class="box">
      <h3>Input</h3>
      <p> All books inputted must have a different Title</p>
      <p>Meaning 2 of the same book can't be entered</p>
      <p>Years must be entered in the 1000s and less than 2025</p>


      <h5 class="has-text-link" >Title:</h5>
      <input type="text" id="title" name="title" required minlength="1" maxlength="40" size="30" />

      <h5 class="has-text-link" >Author:</h5>
      <input type="text" id="author" name="author" required minlength="1" maxlength="40" size="10" />

      <h5 class="has-text-link" >Publication Year:</h5>
      <input type="number" id="year" name="year" min="1000" max="2025" /><br />

      <h5 class="has-text-link" >Genre:</h5>
      <input type="text" id="genre" name="genre" />

      <h5 class="has-text-link" >Ranking (1-5 stars): </h5>
      <input type="number" id="ranking" name="ranking" min="1" max="5" />

      <p id="options">
        Here is a list of ideas for genre entries:
        (fiction, non-fiction, sci-fi, fantasy, and romance)
      </p>

      <button type='submit' id="newBook" onClick={e => add()}>add</button>

      </div>

      <table>
        {/* Render header only once */}
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Author</th>
            <th>Publication Year</th>
            <th>Genre</th>
            <th>Ranking</th>
            <th>Author&Stars</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, i) => <Book key={i} title={book.title} author={book.author} year={book.year} genre={book.genre} ranking={book.ranking} authorStars={book.authorStars} onclick={toggle} />)}
        </tbody>
      </table>

      <div class="box">

      <h3>Modify</h3>
      <p>Type the row and column you want to change in integer form (like 0 0)</p>
      <p class="inline">  r:  </p>
      <input id="row" type="number" min="0" max="100" />
      <p class="inline">  c:  </p>
      <input id="col" type="number" min="0" max="100" />
      <p>put in the what you want to change the entry in the table to</p>
      <input id="newVal" />
      <br></br>
      <button id="changing" onClick={e => change()}>Press Here to change the data</button>
      </div>

      <div class="box">
      <h3>Delete Entry</h3>
      <h5>Title:</h5>
      <input type="text" id="delTitle" name="delTitle" required minlength="1" maxlength="40" size="30" />
      <button type='submit' id="delBook" onClick={e => deleter()}>delete</button>
      </div>
    </div>
  )

}



export default App