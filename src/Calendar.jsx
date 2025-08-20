import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([
    { date: "2025-08-22", time: "10:00 AM", booked: true },
    { date: "2025-08-22", time: "02:00 PM", booked: false },
    { date: "2025-08-23", time: "09:00 AM", booked: true },
    { date: "2025-08-23", time: "01:00 PM", booked: false },
  ]);

  const generateCalendar = () => {
    const today = new Date();
    let dates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const timesForDate = bookedSlots.filter((slot) => slot.date === date);
    setAvailableTimes(timesForDate);
  };

  const renderTimeSlots = () => {
    return availableTimes.map((slot, index) => (
      <div key={index} className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold">{slot.time}</span>
        <span
          className={`font-semibold ${slot.booked ? "text-red-500" : "text-green-500"}`}
        >
          <FontAwesomeIcon icon={slot.booked ? faTimesCircle : faCheckCircle} className="mr-2" />
          {slot.booked ? "Fully Booked" : "Available"}
        </span>
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-xl">
        {/* Back Icon */}
        <div className="absolute top-0 left-0 mt-4 ml-4">
          <Link
            to="/"
            title="Back to Homepage"
            className="text-green-600 hover:text-green-800 transition-all text-2xl"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>

        <h3 className="text-2xl font-bold text-center text-green-700 mb-6">Select a Date</h3>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-4 mb-6">
          {generateCalendar().map((date, index) => (
            <div
              key={index}
              className="text-center p-4 border-2 border-transparent rounded-md cursor-pointer hover:bg-green-100 hover:border-green-300 transition-all"
              onClick={() => handleDateClick(date)}
            >
              {new Date(date).getDate()}
            </div>
          ))}
        </div>

        {/* Available Times Section */}
        {selectedDate && (
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">
              Available Times for <span className="text-green-600">{selectedDate}</span>
            </h4>
            {renderTimeSlots()}
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
