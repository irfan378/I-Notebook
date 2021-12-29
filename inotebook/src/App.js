
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <Routes>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
