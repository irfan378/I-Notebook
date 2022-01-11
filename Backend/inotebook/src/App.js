import './App.css';
import Home from './Components/Home';
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Navbar from './Components/Navbar';
import About from './Components/About';
import NoteState from './Context/notes/NoteState';
import Alert from './Components/Alert'
import Login from './Components/Login';
import Signup from './Components/Signup';
function App() {
  const [alert, setAlert] = useState(null);
  const [mode, setMode] = useState('light'); //wheather dark mode is enabled or not
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'black';


    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }

  }
  return (

    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode}></Navbar>
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} mode={mode} />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/login" element={<Login showAlert={showAlert} />} />
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />

            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
