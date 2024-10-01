import React, { useState, useEffect } from "react";

// Import and apply CSS stylesheet
import "./styles/styles.css";

// Where all of our pages come from
import SnakeGame from "./components/snake.jsx"
import SubmitPopup from "./components/submit.jsx"
import Leaderboard from "./components/leaderboard.jsx";
// import RefreshRuntime from "http://localhost:5173/@react-refresh"
// import RefreshRuntime from 'react-refresh/runtime';

// Home function that is reflected across the site
export default function Home() {
  let [showSubmit, setShowSubmit] = useState(false);
  let [score, setScore] = useState(0);
  let [reset, setReset] = useState(0);

  const onGameOver = function () {
    setShowSubmit(s => true);
  }

  const resetGame = function () {
    setReset(reset + 1)
    setShowSubmit(s => false);
  }

  const onVercel = true;
  
  useEffect(()=>{
    if(!onVercel){
      RefreshRuntime.injectIntoGlobalHook(window)
      window.$RefreshReg$ = () => {}
      window.$RefreshSig$ = () => (type) => type
      window.__vite_plugin_react_preamble_installed__ = true
    }
  }, [])

  return (
    <>
      <div style={{display: "flex", flexDirection: "row", justifyContent:"space-evenly"}}>
        <div style={{display: "flex", flexDirection: "column"}}>
          <SubmitPopup showForm={showSubmit} score={score} setReset={setReset} setShowSubmit={setShowSubmit}/>
          <SnakeGame score={score} setScore={setScore} onGameOver={onGameOver} reset={reset} />
        </div>
        <div style={{textAlign:"center"}}>
          <div className="page" style={{display: "flex", flexDirection: "column"}}>
            <h2 className="title">
              Kay Siegall
              <br />
              CS 4241 Assignment 4 - Components
            </h2>
            <p>
              <br />
              JavaScript Snake Game
              <br />
              Use Arrow Keys or Buttons to Play!
            </p>
            <Leaderboard reset={reset} />
          </div>
        </div>
      </div>
    </>
  );
}
