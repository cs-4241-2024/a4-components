import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter, HashRouter} from 'react-router-dom';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';


function App() {

  return (
      <>

          <HashRouter>
              <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route exact path="/dashboard" element={<Dashboard />} />
              </Routes>
          </HashRouter>

      </>
  );
}

export default App;