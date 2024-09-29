import React from 'react';

let loggedIn = false;
let lastRow = {};
let username = null;
let password = null;

class Todo extends React.Component {
	// our .render() method creates a block of HTML using the .jsx format
	render() {
		if (loggedIn) {
			return (
				<tr>
					<td>${this.props.classCode}</td>
					<td>${this.props.className}</td>
					<td>${this.props.assignment}</td>
					<td>${this.props.daysLeft}</td>
					<td>${this.props.dueDate}</td>
				</tr>
			)
		}
		else {
			return;
		}
	}
}

// main component
class App extends React.Component {
	constructor(props) {
		super(props)
		// initialize our state
		this.state = { todos: [] }
		this.load()

	}

	//Getting data for the table
	getData() {
		if (loggedIn) {
			fetch('/data/${username}', {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(json => {
					this.setState({ todos: json })
				})

			// showData(json);
		}
	}

	//TODO: Submit function here

	deleteRow() {
		if (loggedIn && lastRow != {}) {
			fetch('/delete', {
				method: 'POST',
				body: JSON.stringify(lastRow),
				headers: { "Content-Type": "application/json" },
			})
				.then(response => response.json())
				.then(json => {
					// getData(json)
					// getData()
					//Doesn't work so copy and pasting code
					if (loggedIn) {
						fetch('/data/${username}', {
							method: 'GET',
							headers: { "Content-Type": "application/json" }
						})
							.then(response => response.json())
							.then(json => {
								this.setState({ todos: json })
							})

						// showData(json);
					}
				})
		}
	}

	logIn() {
		console.log("gotcalled")
		if (!loggedIn) {
			username = document.querySelector('#Username').value;
			password = document.querySelector('#Password').value;

			const newData = {
				"Username": username,
				"Password": password
			};
			fetch('/logIn', {
				method: 'POST',
				body: JSON.stringify(newData),
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(json => {
					console.log(json);
					console.log("Username " + json.Username);
					console.log("Password " + json.Password);
					if (json.Username != username || json.Password != password) {
						//Making the call again incase during the last call a new user was made
						fetch('/logIn', {
							method: 'POST',
							body: JSON.stringify(newData),
							headers: { "Content-Type": "application/json" }
						})
							.then(response2 => response2.json())
							.then(json2 => {
								if (json2.Username != username || json2.Password != password) {
									alert("Your password is incorrect!");
								}
								else {
									loggedIn = true;
									//Doesn't work so copy and pasting code
									if (loggedIn) {
										fetch('/data/${username}', {
											method: 'GET',
											headers: { "Content-Type": "application/json" }
										})
											.then(response => response.json())
											.then(json => {
												this.setState({ todos: json })
											})

										// showData(json);
									}
								}
							})
					}
					else {
						loggedIn = true;
						//Doesn't work so copy and pasting code
						if (loggedIn) {
							fetch('/data/${username}', {
								method: 'GET',
								headers: { "Content-Type": "application/json" }
							})
								.then(response => response.json())
								.then(json => {
									this.setState({ todos: json })
								})

							// showData(json);
						}
					}
				})
		}
	}


	// load in our data from the server
	load() {
		fetch('/read', { method: 'get', 'no-cors': true })
			.then(response => response.json())
			.then(json => {
				this.setState({ todos: json })
			})
	}

	// render component HTML using JSX 
	//I think will call the render of each element
	render() {
		return (
			<div className="App">
				<form id="logInForm">
					<input type="text" id="Username" placeholder="Username" />
					<input type="text" id="Password" placeholder="Password" />
					<button className="button" type="button" id="logInButton" onClick={this.logIn}>Log In</button>
				</form>
				<form id="homeworkList">
					<input type="text" id="Code" placeholder="Class Code" />
					<input type="text" id="Name" placeholder="Class Name" />
					<input type="text" id="Assignment" placeholder="Assignment" />
					<input type="text" id="Days" placeholder="Days Left" />
					<button className="button" type="button" id="submitButton" onClick={this.submit}>Submit</button>
					<button className="button" type="button" id="deleteButton" onClick={this.deleteRow}>Delete Last Row</button>
				</form>
				{this.state.todos.map((todo, i) => <Todo username={todo.username} password={todo.password} />)}

			</div>
		)
	}
}

export default App;