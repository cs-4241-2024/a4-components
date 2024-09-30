import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';

function App() {
    return (
        <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
    );
}

export default App;