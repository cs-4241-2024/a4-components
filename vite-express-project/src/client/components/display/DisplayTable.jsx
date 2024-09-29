import {useEffect, useState} from "react";
import ScoreRow from "./ScoreRow.jsx";


function DisplayTable(props) {
    const [scores, setScores] = useState([]);
    const load = () => {
        console.log("hi")
        const json = { shortname: "display name"},
            body = JSON.stringify(json)

        fetch( '/score/getall',{
            headers: {"Content-Type": "application/json" },
            method:'POST',
            body: body
        }).then(response => response.json()).then((res)=>{
            const temp = res;
            temp.sort(function (a, b) {
                let pointa = parseInt(a.points)
                let pointb = parseInt(b.points)
                if (pointa > pointb) return -1;
                else if (pointa == pointb) {
                    if (a.date < b.date) return -1;
                    else return 1;
                } else return 1;
            })
            for (let i = 1; i <= temp.length; i++) {
                temp[i - 1] = {...temp[i - 1], rank: i}
            }
                setScores({scores: temp});
            }
        )
    }
    useEffect(() => {
        load()
    }, []);
    return (
        <div id="column">
            <table >
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Date</th>
                    <th>Points</th>
                    <th>Rank</th>
                </tr>
                </thead>
                <tbody>
                {
                    console.log(scores.scores)
                }
                {
                    (scores.scores !== undefined) ? scores.scores.map((score) => <ScoreRow key={score.rank} score={score}></ScoreRow>) : null
                }
                </tbody>
            </table>
        </div>
    );


}

export default DisplayTable;