// FRONT-END (CLIENT) JAVASCRIPT HERE
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'


let recent_attempt = 1;


const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();
  
  const input = document.querySelector( '#password_entry' ),
        json = { password_entry: input.value },
        body = JSON.stringify( json );

  
  const results = new App.Table();
  results.render();
  
  
  let response = await fetch( '/submit', {
    method:'POST',
    body 
  })

  let text = await response.json();
  
  results.update_table(text);
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}
