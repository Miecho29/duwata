import react from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from './Homepage';
import Booknow from './Booknow';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="Booknow" element={<Booknow />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
    </Router>
  );
}

export default App;
