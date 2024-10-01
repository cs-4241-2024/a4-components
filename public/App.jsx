import React from "react";

// we could place this Todo component in a separate file, but it's
// small enough to alternatively just include it in our App.js file.

class Todo extends React.Component {
  // our .render() method creates a block of HTML using the .jsx format
  render() {
    return (
      <li>
        {this.props.name} :
        <input type="checkbox" defaultChecked={this.props.completed} onChange={(e) => this.change(e)}/>
      </li>
    );
  }
  // call this method when the checkbox for this component is clicked
  change(e) {
    this.props.onclick(this.props.name, e.target.checked);
  }
}

// main component
class App extends React.Component {
  constructor(props) {
    super(props);
    // initialize our state
    this.state = { todos: [] };
    this.load();
  }

  // load in our data from the server
  load() {
    fetch("/read", { method: "get", "no-cors": true })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ todos: json });
      });
  }

  // render component HTML using JSX
  render() {
    return (
      <div className="App">
        <input type="text" />
        <button onClick={(e) => this.add(e)}>add</button>
        <ul>
          {this.state.todos.map((todo, i) => (
            <Todo
              key={i}
              name={todo.name}
              completed={todo.completed}
              onclick={this.toggle}
            />
          ))}
        </ul>
      </div>
    );
  }
}


class Table extends React.Component {
  constructor() {
    
  }
  
  load() {
    fetch("/read", { method: "get", "no-cors": true })
      .then((response) => response.json())
      .then((json) => {
        this.setState({ todos: json });
      });
  }
  
  render(){
    return (
      <body>
        <p>
          Hello, please enter the password:
        </p>
        <div class="flex-container">
          <form action="/my-handling-form-page" method="post">
            <input type="text" id="password_entry" value="Password">
            <button>submit</button>
            </input>
          </form>
        </div>
        <h2>Past Attempts:</h2>
        <table id="password_attempts">
          <tr>
            <th>Correct?</th>
            <th>Password Entered</th>
            <th>number of correct letters</th>
            <th>Does the Length Match?</th>
          </tr>
        </table>
      </body>
    );
  }
  
  update_table(text){
    const table = document.getElementById("password_attempts");
    for(let j = 1; j < document.getElementById("password_attempts").rows.length - 1; j++)
      {
        table.deleteRow(j);
      }

      console.log(text);


      for(let j = 0; j < text.length; j++)
      {
        let correct = text[j].correct;
        let password_entered = text[j].password_entry;
        let num_correct_letters = text[j].num_correct_letters;
        let length_match = text[j].correct_length;

        let row = table.insertRow(1);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.innerHTML = correct;
        cell2.innerHTML = password_entered;
        cell3.innerHTML = num_correct_letters;
        cell4.innerHTML = length_match;
      }
    }
  }


export default Table;
