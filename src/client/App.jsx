import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState('')
  const [cookie, setCookie] = useState('')
  const [icecream, setIcecream] = useState('')
  const [other, setOther] = useState('')
  const [appData, setAppData] = useState([]);

  const submit = async function( event ) {
    event.preventDefault()
    const dict = {'name': name, 'cookie': cookie, 'icecream': icecream, 'other': other}
    const body = JSON.stringify( dict )
    const response = await fetch('/add', {
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    })
    const data = await response.json()
    setAppData(data)
  }

  useEffect(() => {
    async function fetchData(){
      const response = await fetch('/read', {
      method:'GET'
    })
    const data = await response.json()
    setAppData(data)
    }
    fetchData()
  }, [])

  return (
    <div className="App">
      <h1>The Cookie Jar</h1>
      <form name="testform" id="userinfo" className="form-box">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="user_name" onChange = {(e)=>{setName(e.target.value)}} />

          <label htmlFor="cookie">Favorite Type of Cookie:</label>
          <input type="text" id="cookie" name="favorite_cookie" onChange = {(e)=>{setCookie(e.target.value)}}/>

          <label htmlFor="icecream">Favorite Type of Ice Cream:</label>
          <input type="text" id="icecream" name="favorite_icecream" onChange = {(e)=>{setIcecream(e.target.value)}}/>

          <label htmlFor="other">Other:</label>
          <textarea id="other" name="other" onChange = {(e)=>{setOther(e.target.value)}}></textarea>

          <button className="button" id="button" onClick={submit}>Enter</button>
2
      </form>
      <table id="target" className="table-box">
        <thead>
        <tr>
            <th>Name</th>
            <th>Cookie</th>
            <th>Ice Cream</th>
            <th>Other:</th>
        </tr>
        </thead>
        <tbody id="tbody">{
            appData.length > 0 ? (
            appData.map((data,i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.cookie}</td>
                <td>{data.icecream}</td>
                <td>{data.other}</td>
              </tr> 
            ))) : (
              <tr>
                <td colSpan="4">No data available</td>
              </tr>
            )
          }
        </tbody>
      </table>
    </div>
  );
}

export default App;
