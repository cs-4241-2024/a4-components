"use client";

import AddGroceryItem from "./components/AddGroceryItem";
import GroceryList from "./components/GroceryList";

import "./App.css";
import { getCookie } from "./utils";
import { useEffect, useState } from "react";
import { Item } from "./types";

function App() {
    const [data, setData] = useState<Item[]>([]);
    const [updated, setUpdated] = useState(false);
    const [loading, setLoading] = useState(false);
    const accessToken = getCookie("accessToken");

    useEffect(() => {
        if (!accessToken) {
            return;
        }

        setLoading(true);
        fetch("/data", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setData(data);
                setUpdated(false);
                setLoading(false);
            });
    }, [updated, accessToken]);

    if (!accessToken) {
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
                <GroceryList
                    data={data}
                    loading={loading}
                    onUpdate={setUpdated}
                />
                <AddGroceryItem onUpdate={setUpdated} />
            </div>
        </div>
    );
}

export default App;
