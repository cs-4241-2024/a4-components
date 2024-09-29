import React from 'react';

let loggedIn = false;
let lastRow = {};
let username = null;
let password = null;
let data = [];

class App extends React.Component {
	constructor(props) {
		super(props)
		// initialize our state
		this.state = { todos: [] }
		// this.load()
		this.getData()

	}

	showData = (e) => {
		if (loggedIn) {
			const dataTable = document.querySelector('#dataTable');
			let innerHTMLString = `
  <tr>
    <th>Class Code</th>
    <th>Class Name</th>
    <th>Assignment</th>
    <th>Days Left</th>
    <th>Due Date</th>
  </tr>`;
			console.log("Data: ", JSON.stringify(data));
			// lastRow = data[data.length - 1];
			// console.log("Last Row" + lastRow);
			data.forEach(element => {
				if (element.classCode != null) {
					innerHTMLString += `<tr>
    <td>${element.classCode}</td>
    <td>${element.className}</td>
    <td>${element.assignment}</td>
    <td>${element.daysLeft}</td>
    <td>${element.dueDate}</td>
  	</tr>`;

					//Not optimal
					lastRow = {
						"Username": username,
						"Password": password,
						"classCode": element.classCode,
						"className": element.className,
						"assignment": element.assignment,
						"daysLeft": element.daysLeft,
						"dueDate": element.date
					};
				}

			});
			dataTable.innerHTML = innerHTMLString;
			console.log(dataTable.innerHTML)
			console.log(innerHTMLString)
		}
	}

	//Getting data for the table
	getData = (e) => {
		if (loggedIn) {
			fetch(`/data/${username}`, {
				method: 'GET',
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(json => {
					console.log(json)
					data = json
					this.showData();
				})
		}
	}

	submit = (e) => {
		if (loggedIn) {

			const classCode = document.querySelector('#Code').value;
			const className = document.querySelector('#Name').value;
			const assignment = document.querySelector('#Assignment').value;
			const daysLeft = document.querySelector('#Days').value;

			let daysToAdd = parseInt(daysLeft);
			if (isNaN(daysLeft)) {
				//Is not a number
				daysToAdd = 0;
			}
			if (daysToAdd === null) {
				daysToAdd = 0;
			}
			let date = new Date();
			date.setDate(date.getDate() + daysToAdd);

			const newData = {
				"Username": username,
				"Password": password,
				"classCode": classCode,
				"className": className,
				"assignment": assignment,
				"daysLeft": daysLeft,
				"dueDate": date
			};

			//Sumbitting a new to-do item
			fetch('/submit', {
				method: 'POST',
				body: JSON.stringify(newData),
				headers: { "Content-Type": "application/json" },
			})
				.then(response => response.text())
				.then(text => {
					console.log('text:', text);
					console.log("data:", newData);
					this.getData();
				})
		}
	}

	deleteRow() {
		if (loggedIn && lastRow != {}) {
			fetch('/delete', {
				method: 'POST',
				body: JSON.stringify(lastRow),
				headers: { "Content-Type": "application/json" },
			})
				.then(response => response.json())
				.then(json => {
					this.getData()
				})
		}
	}

	logIn = (e) => {
		console.log("Logged In Called")
		if (!loggedIn) {
			username = document.querySelector('#Username').value;
			password = document.querySelector('#Password').value;

			const newData = {
				"Username": username,
				"Password": password
			};
			fetch(`/logIn`, {
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
						fetch(`/logIn`, {
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
									this.getData();
								}
							})
					}
					else {
						loggedIn = true;
						this.getData();
					}
				})
		}
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
				<table id="dataTable">

				</table>
			</div>
		)
	}
}

export default App;