import { useState } from "react";
import reactLogo from "./assets/react.svg";
import BlogApp from "./BlogApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <BlogApp />
      
    </div>
  );
}

export default App;
