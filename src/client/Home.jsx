import { useState, useEffect } from 'react'

export default function Home() {
    const [name, setName] = useState('')
    const [game, setGame] = useState('')
    const [score, setScore] = useState('')
    let [displayData, setDisplayData] = useState([])

    const submit = async (event) => {
        event.preventDefault()

        await fetch("/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            yourname: name,
            game: game,
            score: score}),
        }).then(async function (response) {
            let result = await response.json();
            if (result) {
                setDisplayData(result)
            } else {
                console.error(result.message); 
            }
        });
    };

    const del = async (event) => {
        event.preventDefault()

        await fetch("/delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            yourname: name,
            game: game,
            score: score}),
        }).then(async function (response) {
            let result = await response.json();
            if (result) {
                setDisplayData(result)
            } else {
                console.error(result.message); 
            }
        });
    };

    const modify = async (event) => {
        event.preventDefault();

        const form = event.target;
        console.log(form.input)
        await fetch("/modify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            yourname1: form.input.value,
            game1: form.input2.value,
            score1: form.input3.value,
            yourname2: form.input4.value,
            game2: form.input5.value,
            score2: form.input6.value}),
        }).then(async function (response) {
            let result = await response.json();
            if (result) {
                setDisplayData(result)
            } else {
                console.error(result.message); 
            }
        });
      };

    const print = async function() {  
        //const ul = document.querySelector('ul')
        //ul.innerHTML = ''
        console.log('here')
        const response = await fetch( '/docs', {
          method: 'GET',
          headers: {
            'Content-type': 'application/json'
          }
        })
        
        const data = await response.json()
        console.log(data)
        //  data.forEach((element) => {
        //  console.log(element.yourname, element.game, element.score, element.rank)
        //  const li = document.createElement('li')
        //  li.innerText = 'Name: ' + element.yourname + ', Game: ' + element.game + ', Score: ' + element.score + ', Rank: ' + element.rank + '  ';
        //  ul.appendChild(li)
        //})
    }

    /*useEffect(() => {
        print();
    }, [])*/

    return (
        <div>
        <h1 className="nes-text is-primary">
            Arcade Scoreboard
        </h1>
        <p className="nes-text is-warning">
            This is an arcade game scoreboard. Submit your Name, Game and Score in the fields below.
            You will receive a letter rank based on your score.
            When deleting and modifying, make sure all the fields exactly match the fields of the existing record (you don't need to input rank).
        </p>
        <form>
            <label className="nes-text is-success" name="Name:" /><input aria-labelledby="yourname" type="text" name="input" placeholder="Name" onChange = {(e) => setName(e.target.value)}/>
            <label className="nes-text is-success" name="Game:" /><input type="text" name="input2" placeholder="Game" onChange = {(e) => setGame(e.target.value)}/>
            <label className="nes-text is-success" name="Score:" /><input type="text" name="input3" placeholder="Score" onChange = {(e) => setScore(e.target.value)}/>
            <button type="submit" className="nes-btn is-success" onClick={submit}>Submit</button>
            <button type="delete" className="nes-btn is-error" onClick={del}>Delete</button>
        </form>
        <form onSubmit={modify}>
            <label className="nes-text is-success" name="Existing Name:" /><input type="text" name="input" placeholder="Name1" />
            <label className="nes-text is-success" name="New Name:" /><input type="text" name="input4" placeholder="Name2" />
            <label className="nes-text is-success" name="Existing Game:" /><input type="text" name="input2" placeholder="Game1" />
            <label className="nes-text is-success" name="New Game:" /><input type="text" name="input5" placeholder="Game2" />
            <label className="nes-text is-success" name="Existing Score:" /><input type="text" name="input3" placeholder="Score1" />
            <label className="nes-text is-success" name="New Score:" /><input type="text" name="input6" placeholder="Score2" /> 
            <button type="modify" className="nes-btn is-warning">Modify</button>
        </form>
        <ul className="nes-text is-primary">
            {
        displayData.map((element) => {
            return (
                <li key={element._id}>{'Name: ' + element.yourname + ', Game: ' + element.game + ', Score: ' + element.score + ', Rank: ' + element.rank}</li>
            )
          })
            }
        </ul>
        </div>
    );
    }