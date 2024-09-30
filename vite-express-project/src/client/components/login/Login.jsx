import {useState} from "react";
import InputTextBox from "../default_components/InputTextBox.jsx";
import LoginButtons from "./LoginButtons.jsx";
import LogoutButton from "./LogoutButton.jsx";


function Login(props) {
    const [loginType, setLoginType] = useState("login");
    const [user, setUser] = useState("username");
    const [pass, setPass] = useState("password");

    const loginDB = (e)=> {
        e.preventDefault();
        if (loginType.loginType === "login") {
            console.log("Logging in");
            login();
        } else if (loginType.loginType === "register") {
            console.log("Registering");
            register();
        } else {
            console.log("Logging out");
            props.changeLoggedin(false);
        }
    };

    function register(){
        const json = { shortname: props.shortname, username: user, password : pass},
            body = JSON.stringify(json)
        fetch( '/user/register', {
            headers: {"Content-Type": "application/json" },
            method:'POST',
            body: body
        }).then((res) => {
            if (res.status === 400) {
                alert("Username already in use")
            } else if (res.status === 200){
                alert("Registered. Now logged in")
                props.changeLoggedin(true)
            }
        })
    }
    function login(){
        const json = { username: user, password : pass},
            body = JSON.stringify(json)
        fetch( '/user/login', {
            headers: {"Content-Type": "application/json" },
            method:'POST',
            body: body
        }).then((res) => {
            if (res.status === 200) {
                alert("Log in successful")
                props.changeLoggedin(true)

            } else if (res.status === 400){
                alert("Credentials do not match any in our records. Please try again")

            }
        })
    }



    return (
        <form onSubmit={loginDB}>
            {!props.loggedin ?
                <div>
                    <InputTextBox id={"shortname"} defaulttext={"shortname"} onChange={(e)=> props.setShortname(e.target.value)}></InputTextBox>
                    <InputTextBox id={"username"} defaulttext={"username"} onChange={(e)=>setUser(e.target.value)}></InputTextBox>
                    <InputTextBox id={"password"} defaulttext={"password"} onChange={(e)=> setPass(e.target.value)}></InputTextBox>
                    <LoginButtons setType={setLoginType}></LoginButtons>
                </div>
                : <LogoutButton setType={setLoginType}></LogoutButton>}
        </form>
    );
}
export default Login;