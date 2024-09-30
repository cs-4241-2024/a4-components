import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskTracker from './components/TaskTracker';
import './styles.css';

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/task-tracker" component={TaskTracker} />
    </Switch>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));
