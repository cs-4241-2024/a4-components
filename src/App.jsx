import React, { useState, useEffect,useCallback } from 'react';


function App() {
  const [playerName,setPlayerName] =useState('');
  const [clicks,setClicks]=useState(0);
    const [gameState,setGameState] = useState('idle'); 
  const [highScores, setHighScores] = useState([]);



        const [timeLeft,setTimeLeft] = useState(5);
  const [gameStartTime, setGameStartTime]= useState(null);


  const handleStart =useCallback(() => {
    if ((gameState ==='idle' || gameState ==='finished') && playerName.trim()) {


      setClicks(0);
      setTimeLeft(5);


      setGameState('running');
      setGameStartTime(Date.now());
    }
  }, [gameState,playerName]);


  const handleButtonClick = useCallback(() => {
    if (gameState ==='running') {
      setClicks((c) => c + 1);
    }
  }, [gameState]);


  const handleSubmit = useCallback(async (finalClicks) => {
    if (playerName.trim()) {


      try {
        const response = await fetch('/highscores', {
          method:'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({yourname: playerName.trim(), clicks: finalClicks })



        });
        if (!response.ok) throw new Error('Network response wasnot ok');
        await fetchScores();
      } catch (error) {
        console.error("Eror submitting score:", error);
      }
    }
  }, [playerName]);
  const fetchScores=useCallback(async () => {
    if (playerName.trim()) {



      try {
        const response=await fetch(`/highscores?player=${encodeURIComponent(playerName.trim())}`);
        if (!response.ok) throw new Error('Network response wasnot ok');
        const data = await response.json();
        setHighScores(data);
      } catch (error) {
        console.error("Error fetchingscores:", error);
      }
    }
  }, [playerName]);
  useEffect(() => {
    let timer;
    if (gameState === 'running') {
      timer = setInterval(() => {
        const elapsedTime = Math.floor((Date.now() - gameStartTime) / 1000);

        
        const newTimeLeft = Math.max(5 - elapsedTime, 0);
        setTimeLeft(newTimeLeft);
        
        if (newTimeLeft === 0) {
          setGameState('finished');


          handleSubmit(clicks);
        }
      }, 100);
    }
    return () => clearInterval(timer);
  }, [gameState,gameStartTime, clicks, handleSubmit]);

  useEffect(() => {
    if (playerName.trim()) {



      fetchScores();
    }
  }, [playerName, fetchScores]);
  return (
    <div>
      <h1>Clicker Game</h1>
      <input
        type="text"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
        placeholder="Enter your name"



        disabled={gameState==='running'}
      />
          <button 
            onClick={handleStart} 
            disabled={gameState==='running'||!playerName.trim()}
          >
            {gameState==='finished'?'Play Again':'Start Game'}
          </button>
          <button onClick={handleButtonClick} disabled={gameState!=='running'}>
            Click Me!
            </button>
            <p>Clicks:{clicks}</p>

          <p>Time you have Left:{timeLeft.toFixed(1)} seconds</p>
           <h2>High Scores</h2>
      <ul>




            {highScores.map((score,index) => (
              <li key={index}>{score.player}: {score.clicks} clicks (on {score.date})</li>


        ))}
      </ul>
    </div>
  );
}



export default App;