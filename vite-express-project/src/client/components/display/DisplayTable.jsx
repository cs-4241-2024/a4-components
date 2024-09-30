import {useEffect, useState} from "react";
import ScoreRow from "./ScoreRow.jsx";


function DisplayTable(props) {
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
                    (props.scores.scores !== undefined) ? props.scores.scores.map((score) => <ScoreRow key={score.rank} score={score} load={props.load}></ScoreRow>) : null
                }
                </tbody>
            </table>
        </div>
    );


}

export default DisplayTable;