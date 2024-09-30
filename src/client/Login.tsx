import React, {useEffect, useState} from "react";
import "./css/Login.css"

import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

function Login({setUser}: { setUser: React.Dispatch<React.SetStateAction<string | undefined>> }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        async function checkLogin() {
            let response = await fetch("/login", {
                method: 'POST'
            });
            if (response.status !== 403) {
                const json = await response.json();
                setUser(json.user);
            }
        }
        checkLogin();
    }, []);

    async function login(e: React.MouseEvent): Promise<void> {
        e.preventDefault();
        const response: Response = await fetch("/login", {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        if (response.status === 403) {
            alert("Incorrect username or password");
        } else if (response.status === 200) {
            const json = await response.json();
            if (json.new === "new") {
                alert("User created");
            }
            setUser(json.user);
        }
    }

    return (
        <Form>
            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username: </Form.Label>
                <Form.Control type="text" placeholder="Username" onChange={(e) => {
                    setUsername(e.target.value);
                }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password: </Form.Label>
                <Form.Control type="password" placeholder="Password" onChange={(e) => {
                    setPassword(e.target.value);
                }}/>
            </Form.Group>
            <Button variant="primary" onClick={login}>Login</Button>
        </Form>
    );
}

export default Login;
