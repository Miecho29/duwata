import react from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from './Homepage';
import Booknow from './Booknow';
import Login from './Login';
import Details from './Details';
import PersonalInfo from './PersonalInfo';
import Calendar from './Calendar';
import CreateVenue from './CreateVenue';
import Register from './register';
import BookingSummary from './BookingSummary';
import Payment from './Payment';
import Homecalendar from './Homecalendar';
import ForgotPassword from './ForgotPassword';
import MyVenues from './MyVenues';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Booknow" element={<Booknow />} />
          <Route path="Homepage" element={<Homepage />} />
          <Route path="Details" element={<Details />} />
          <Route path="PersonalInfo" element={<PersonalInfo />} />
          <Route path="Calendar" element={<Calendar />} />
          <Route path="CreateVenue" element={<CreateVenue />} />
          <Route path="Register" element={<Register />} />
          <Route path="BookingSummary" element={<BookingSummary />} />
          <Route path="Payment" element={<Payment />} />
          <Route path="Homecalendar" element={<Homecalendar />} />
          <Route path="ForgotPassword" element={<ForgotPassword />} />
          <Route path="MyVenues" element={<MyVenues />} />
        </Routes>
    </Router>
  );
}

export default App;
