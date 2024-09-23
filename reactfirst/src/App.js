import logo from './logo.svg';
import './App.css';
import {layout} from './Layout.js'

function App() {
  return (
    <main style={layout.Appmain}>
    <div className="App">
      <header>CS4241 Assignment 4</header>
      <h2 class="title is-1">Book Collection Manager</h2>
      <h2 class="subtitle is-2">Main Page</h2>


      <p class="title is-3">Input</p>
      <p> All books inputted must have a different</p> 
      <p class ="has-text-weight-semibold">Title</p>  <br/>
    <p >Meaning 2 of the same book can't be entered </p><br/>
    <p >Years must be entered in the </p>
    <p class ="has-text-weight-semibold" >1000s </p> 
    <p> and less than </p>
    <p class ="has-text-weight-semibold">2025</p>

    
    <form action='/add' method='POST'>
    <h5 class = "has-text-link" >Title:</h5>
    <input type="text" id="title" name="title" required minlength="1" maxlength="40" size="30"  />
    
    
    <h5 class = "has-text-link" >Author:</h5>
    <input type="text" id="author" name="author" required minlength="1" maxlength="40" size="10"  />
    
    
    <h5 class = "has-text-link" >Publication Year:</h5>
    <input type="number" id="year" name="year" min="1000" max="2025" /><br/>

    <h5  class = "has-text-link" >Genre:</h5>
    <input type="text" id="genre" name="genre" />
    <h5 class = "has-text-link" >Ranking (1-5 stars): </h5>
    <input type="number" id="ranking" name="ranking" min="1" max="5" />
    <p id="options">
      Here is a list of ideas for genre entries:
      (fiction, non-fiction, sci-fi, fantasy, and romance)
    </p>
   
    <input type='submit' id="newBook" class="button is-primary" />
    </form>
    </div>
    </main>
  );
}

export default App;
