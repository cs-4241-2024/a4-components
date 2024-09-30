import "./App.css";
import CoolForm from "./coolForm";

const App = () => {
  const label1 = "Worms"
  const label2 = "Tunes"
  const label3 = "Card Games"
  const label4 = "Rabbits"
  const label5 = "Rice Krispies Treats"

  return (
    <div className="App">
      <h1>Find Out How Cool You Are!</h1>
      <CoolForm label1={label1} label2={label2} label3={label3} label4={label4} label5={label5}/>
    </div>
  )
}

export default App;
