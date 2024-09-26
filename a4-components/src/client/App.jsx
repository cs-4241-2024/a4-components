import { useState } from "react";
import "./App.css";
import "/components/editModal.jsx";
import editModal, {editMatch} from "./components/editModal.jsx";
import form, {add} from "./components/form.jsx";
import {generateMatches} from "./components/matches.jsx";

window.onload = async function() {
    const addButton = document.getElementById("add");
    addButton.onclick = add;

    await generateMatches()

    const changeButton = document.querySelector('input[name="changeButton"]');
    changeButton.onclick = editMatch;


    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });
    document.querySelector('.cancel-modal').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });

    document.getElementById('logoutButton').addEventListener('click', async () => {
        const response = await fetch('/logout', {
            method: 'GET',
        });
        if (response.ok) {
            window.location.href = '/'; // Redirect to the root URL
        } else {
            console.error('Logout failed');
        }
    });

    // window.onclick = function(event) {
    //     if (event.target === document.getElementById('editModal')) {
    //         document.getElementById('editModal').style.display = 'none';
    //     }
    // };


}

function App() {

  return (
      <>
          <h1 className="title is-family-primary is-size-1 pt-6 is-flex is-flex-direction-row">Submit your Match! <button
              id="logoutButton" className="button is-info">Logout</button>
          </h1>
          <div>
              {form()}
            <div id="matches-container">

            </div>
            {editModal()}

          </div>
      </>
  );
}

export default App;