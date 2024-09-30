import {useEffect, useState} from "react";
import SubmitScore from "./SubmitScore.jsx";
import DisplayTable from "./DisplayTable.jsx";


function Display(props) {
    const [scores, setScores] = useState([]);
    const load = () => {
        console.log("shortname : " + props.shortname)
        const json = { shortname : props.shortname},
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
        <div>
            <SubmitScore shortname={props.shortname} load={load}></SubmitScore>
            <DisplayTable shortname={props.shortname} scores={scores} load={load}></DisplayTable>
        </div>
    );
}

export default Display;