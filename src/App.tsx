"use client";

import AddGroceryItem from "./components/AddGroceryItem";
import GroceryList from "./components/GroceryList";

import "./App.css";

function getCookie(key: string) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop() : "";
}

function App() {
    const loggedIn = getCookie("accessToken");

    if (!loggedIn) {
        return (
            <div>
                <h1 className="block">Your Grocery List</h1>
                <form action="/auth">
                    <button id="login" className="block accent">
                        Login
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div>
            <h1 className="block">Your Grocery List</h1>
            <h2>Edit the table by double clicking on a section.</h2>
            <div className="main">
                <GroceryList />
                <AddGroceryItem />
            </div>
        </div>
    );
}

export default App;
