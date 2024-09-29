import {useState} from "react";
import InputTextBox from "../default_components/InputTextBox.jsx";
import LoginButtons from "./LoginButtons.jsx";
import LogoutButton from "./LogoutButton.jsx";


function Login(props) {
    const [loginType, setLoginType] = useState("login");
    const [user, setUser] = useState("username");
    const [pass, setPass] = useState("password");

    const loginDB = (e)=> {
        //TODO: Actually add functionality here lol
        console.log("loginType:")
        console.log(loginType.loginType)
        e.preventDefault();
        if (loginType.loginType === "login") {
            console.log("Logging in");
            props.changeLoggedin(true)
        } else if (loginType.loginType === "register") {
            console.log("Registering");
            props.changeLoggedin(true)

        } else {
            console.log("Logging out");
            props.changeLoggedin(false);
        }
    };
    return (
        <form onSubmit={loginDB}>
            {!props.loggedin ?
                <div>
                    <InputTextBox id={"shortname"} defaulttext={props.shortname}></InputTextBox>
                    <InputTextBox id={"username"} defaulttext={user}></InputTextBox>
                    <InputTextBox id={"password"} defaulttext={pass}></InputTextBox>
                    <LoginButtons setType={setLoginType}></LoginButtons>
                </div>
                : <LogoutButton setType={setLoginType}></LogoutButton>}
        </form>
    );
}

export default Login;