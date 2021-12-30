import './App.css';
import Home from './Components/Home';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
function App() {
  return (
    <>
      <NoteState>
        <Router>
          <Navbar></Navbar>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
