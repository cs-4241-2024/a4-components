import "./App.css";
import editModal, {editMatch} from "./components/editModal.jsx";
import form, {add} from "./components/form.jsx";
import {generateMatches} from "./components/matches.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

window.onload = async function() {
    await generateMatches()
    const changeButton = document.querySelector('input[name="changeButton"]');
    changeButton.onclick = editMatch;

    document.querySelector('.modal-close').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });
    document.querySelector('.cancel-modal').addEventListener('click', () => {
        document.getElementById('editModal').style.display = 'none';
    });


}
async function onLogout(event, navigate) {

    const response = await fetch('/logout', {
        method: 'GET',
    });
    if (response.ok) {
        navigate('/');
        // window.location.href='/'; // Redirect to the root URL
    } else {
        console.error('Logout failed');
    }
}

function Dashboard() {
    const navigate = useNavigate()
    return (
        <>
            <h1 className="title is-family-primary is-size-1 pt-6 is-flex is-flex-direction-row">Submit your Match! <button
                id="logoutButton" className="button is-info" onClick={(e) => onLogout(e, navigate)}>Logout</button>
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

export default Dashboard;