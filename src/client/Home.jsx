export default function Home() {

    const modify = async () => {
        await fetch("/modify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            yourname1: input,
            game1: input2,
            score1: input3,
            yourname2: input4,
            game2: input5,
            score2: input6}),
        }).then(async function (response) {
            let result = await response.json();
            if (result.success) {
                console.log("Yay")
            } else {
                console.error(result.message); 
            }
        });
      };

    return (
        <div>
        <h1 class="nes-text is-primary">
            Arcade Scoreboard
        </h1>
        <p class="nes-text is-warning">
            This is an arcade game scoreboard. Submit your Name, Game and Score in the fields below.
            You will receive a letter rank based on your score.
            When deleting and modifying, make sure all the fields exactly match the fields of the existing record (you don't need to input rank).
        </p>
        <form>
            <label class="nes-text is-success" name="Name:" /><input aria-labelledby="yourname" type="text" name="yourname" placeholder="Name" />
            <label class="nes-text is-success" name="Game:" /><input type="text" name="game" placeholder="Game" />
            <label class="nes-text is-success" name="Score:" /><input type="text" name="score" placeholder="Score" />
            <button type="submit" class="nes-btn is-success">Submit</button>
            <button type="delete" class="nes-btn is-error">Delete</button>
        </form>
        <form onSubmit={modify}>
            <label class="nes-text is-success" name="Existing Name:" /><input type="text" name="yourname1" placeholder="Name1" />
            <label class="nes-text is-success" name="New Name:" /><input type="text" name="yourname2" placeholder="Name2" />
            <label class="nes-text is-success" name="Existing Game:" /><input type="text" name="game1" placeholder="Game1" />
            <label class="nes-text is-success" name="New Game:" /><input type="text" name="game2" placeholder="Game2" />
            <label class="nes-text is-success" name="Existing Score:" /><input type="text" name="score1" placeholder="Score1" />
            <label class="nes-text is-success" name="New Score:" /><input type="text" name="score2" placeholder="Score2" /> 
            <button type="modify" class="nes-btn is-warning">Modify</button>
        </form>
        <ul class="nes-text is-primary">
        </ul>
        </div>
    );
    }