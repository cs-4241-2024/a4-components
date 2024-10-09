
import React, { useState, useEffect } from 'react'

// const Log = props => (
//   <li>{props.workout} : 
//     <input type="checkbox" defaultChecked={props.workout} onChange={ e => props.onclick( props.name, e.target.checked ) }/>
//   </li>
// )

const App = () => {
  const [logs, setLogs] = useState([]);
  const [ind, setInd] = useState(0);
  const [workout, setWorkout] = useState('');
  const [date, setDate] = useState('');
  const [stime, setStime] = useState('');
  const [etime, setEtime] = useState('');
  
  function edit(i){
    //e.preventDefault()

   // const nwo = workout, //document.querySelector( 'input[name="nwout"]:checked' ),
   //   ndat = date, //document.querySelector( "#ndate" + i),
   //   nst = stime,//document.querySelector( "#nstime" + i),
   //   net = etime//document.querySelector( "#netime" + i)
    console.log(workout, date, stime, etime)
    const [nshr, nsmin] = stime.split(":"),
      [nehr, nemin] = etime.split(":"),
      nhr = nehr - nshr,
      nmin = nemin - nsmin,
      nt = nhr * 60 + nmin;

    const newLog = [...logs];
 
    newLog[i] = {index: i, workout: workout, date: date, stime: stime, etime: etime, time: nt};
  
    //setLogs(newLog)

    //console.log(logs)
 
    //setLogs(newLog);

    //console.log(newLog, logs)

   // console.log(logs)

    // body = JSON.stringify(logs[i]);
    const body = JSON.stringify({index: i, workout: workout, date: date, stime: stime, etime: etime, time: nt});

    fetch( '/save', {
      method: "PUT",
      headers: { 'Content-Type': 'application/json' },
      body: body
    })
    .then( response => response.json() )
    .then( json => {
       setLogs( json )
    })
  }

  function del(i){
    const body = JSON.stringify(logs[i]);
    fetch( '/delete', {
      method:'DELETE',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       setLogs( json )
    })
  }

  function updateValues(log){
    setDate(log.date)
    setEtime(log.etime)
    setStime(log.stime)
    setWorkout(log.workout)
  }

  function add(e) {
    e.preventDefault()

    const wo = document.querySelector( 'input[name="wout"]:checked' ),
        dat = document.querySelector( "#date"),
        st = document.querySelector( "#stime"),
        et = document.querySelector( "#etime")
      console.log(stime)
    const [shr, smin] = st.value.split(":"),
      [ehr, emin] = et.value.split(":"),
      hr = ehr - shr,
      min = emin - smin,
      t = hr * 60 + min;
    
    const json = { index: ind, workout: wo.value, date: dat.value, stime: st.value, etime: et.value, time: t.toString()},
      body = JSON.stringify( json );

    setInd(ind + 1)
        
    fetch( '/submit', {
      method:'POST',
      body,
      headers: { 'Content-Type': 'application/json' }
    })
    .then( response => response.json() )
    .then( json => {
       setLogs( json )
    })

  }
  
  useEffect(()=> {
    fetch( '/read' )
      .then( response => response.json() )
      .then( json => {
        setLogs( json ) 
      })
  }, [] )

  return (
    <div className="App">

        <h1>Workout Logger</h1><br></br>
        <div id="flex-container">
          <div>
          <h2>Add Log:</h2>

          <form onSubmit={add} id="wform">
            <label id="workout">Select Workout Day: </label><br></br>
            <label><input type="radio" id="body" name="wout" value="Full Body"></input>Full Body</label><br></br>
            <label><input type="radio" id="upper" name="wout" value="Upper Body"></input>Upper Body</label><br></br>
            <label><input type="radio" id="lower" name="wout" value="Lower Body"></input>Lower Body</label><br></br>
            <label><input type="radio" id="cardio" name="wout" value="Cardio"></input>Cardio</label><br></br>
            <label><input type="radio" id="abs" name="wout" value="Abs"></input>Abs</label><br></br>

            <label>Date: <input type="date" id="date" required></input></label><br></br>
            <label>Start Time: <input type="time" id="stime" required></input></label><br></br>
            <label>End Time: <input type="time" id="etime" required></input></label><br></br>

            <button type="submit" >Submit</button>
 
          </form>
          </div>

          <div>
            <h2>Workout Logs:</h2><br></br>

            <table id="data">
            <thead>
                <tr>
                  <th>Workout</th>
                  <th>Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Time (mins)</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr key={i}>
                    <td>
                      <select value={log.workout} onChange={(e) => setWorkout(e.target.value)}>
                        <option value="Full Body" name="nwout">Full Body</option>
                        <option value="Upper Body" name="nwout">Upper Body</option>
                        <option value="Lower Body" name="nwout">Lower Body</option>
                        <option value="Abs" name="nwout">Abs</option>
                        <option value="Cardio" name="nwout">Cardio</option>
                      </select>
                    </td>
                    <td><input type="date" id={"ndate" + i} value={log.date} onChange={(e) => setDate(e.target.value)} ></input></td>
                    <td><input type="time" id={"nstime" + i} value={log.stime} onChange={(e) => setStime(e.target.value)}></input></td>
                    <td><input type="time" id={"netime" + i} value={log.etime} onChange={(e) => setEtime(e.target.value)}></input></td>
                    <td>{log.time}</td>
                    <td><button onClick={() => edit(i)}>Save</button></td>
                    <td><button onClick={() => updateValues(log)}>Edit</button></td>
                    <td><button onClick={() => del(i)}>Delete</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
{/* 
      <input type='text' /><button onClick={ e => add()}>add</button>
        <ul>
          { todos.map( (todo,i) => <Todo key={i} name={todo.name} completed={todo.completed} onclick={ toggle } /> ) }
        </ul>  */}

    </div>
  )
}

export default App