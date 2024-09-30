import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import Login from "./components/login/Login.jsx";
import Display from "./components/display/Display.jsx";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
    const [shortname, setShortname] = useState("display name");

  return (
    <div className="App">
      <Login loggedin={loggedIn}
             changeLoggedin={setLoggedIn}
             setShortname={setShortname}
             shortname={shortname}
      />
      {!loggedIn ? null : <Display shortname={shortname}></Display>}
    </div>
  );
}

export default App;
