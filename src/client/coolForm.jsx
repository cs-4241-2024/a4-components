import React from "react";
import { useState } from "react";

const CoolForm = ({label1, label2, label3, label4, label5}) => {
    const [cools, setCools] = useState(0);

    function click (e) {
      e.preventDefault()
      setCools((cools) => cools + document.querySelectorAll('input[type="checkbox"]:checked').length)
    }
  
    return (
      <div>
      <form>
        <input type="checkbox" id="Op1" value="Earthworms"/>
        <label for="Op1">{label1}</label>
        <input type="checkbox" id="Op2" value="Music" />
        <label for="Op2">{label2}</label>
        <input type="checkbox" id="Op3" value="Cards" />
        <label for="Op3">{label3}</label>
        <input type="checkbox" id="Op4" value="Rabbits" />
        <label for="Op4">{label4}</label>
        <input type="checkbox" id="Op5" value="Treats" />
        <label for="Op5">{label5}</label>
        <button onClick={click}>submit</button>
      </form>
        <p className= "Results" id="Result1"><strong id="Reg"> You are:</strong></p>
        <p className= "Results" id="Result2"><strong id="Super"> {cools*20}% Cool!</strong></p>
      </div>
    )
  }

  export default CoolForm;