import react from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from './Homepage';
import Booknow from './Booknow';
import Login from './Login';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="Booknow" element={<Booknow />} />
          <Route path="Login" element={<Login />} />
        </Routes>
    </Router>
  );
}

export default App;
