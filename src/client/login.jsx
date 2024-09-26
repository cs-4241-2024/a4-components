import React from 'react';
import { useNavigate } from 'react-router-dom';

async function loginFunc(event, navigate) {
  event.preventDefault();
  const input = { user: document.getElementById('username'), pass: document.getElementById('password') },
    json = { user: input.user.value, pass: input.pass.value },
    body = JSON.stringify(json);

  console.log("test:", body);

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });
  console.log(response.status);
  if (response.status === 200) {
    alert("Login Successful");
    navigate('/dashboard');
    // window.location.href='/dashboard';
  } else {
    alert("Login failed");
  }
}

const newLogin = async function (event) {
  event.preventDefault();
  const input = { user: document.getElementById('username'), pass: document.getElementById('password') },
    json = { user: input.user.value, pass: input.pass.value },
    body = JSON.stringify(json);

  const response = await fetch('/newLogin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body
  });

  if (response.status === 200) {
    alert("New Login Created");
  } else {
    alert("No New Login Created");
  }
}

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex-vertical container">
      <form className="is-fullheight">
        <h1 className="is-size-6 is-font-family-primary mb-4">Login or Create New Account</h1>
        <div className="field">
          <p className="control has-icons-left has-icons-right">
            <input id="username" className="input" type="text" name="username" placeholder="Username" />
            <span className="icon is-small is-left">
              <i className="fas fa-envelope"></i>
            </span>
            <span className="icon is-small is-right">
              <i className="fas fa-check"></i>
            </span>
          </p>
        </div>
        <div className="field">
          <p className="control has-icons-left">
            <input className="input" id="password" type="password" name="password" placeholder="Password" />
            <span className="icon is-small is-left">
              <i className="fas fa-lock"></i>
            </span>
          </p>
        </div>
        <button id="login" type="button" className="button" onClick={(e) => loginFunc(e, navigate)}>Login</button>
        <button id="newLogin" type="button" className="button is-dark" onClick={newLogin}>Create New Login</button>
      </form>
    </div>
  );
}