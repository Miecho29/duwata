import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle, faArrowLeft, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([
    { date: "2025-08-22", time: "09:00 AM", booked: true },
    { date: "2025-08-22", time: "10:00 AM", booked: false },
    { date: "2025-08-22", time: "02:00 PM", booked: false },
    { date: "2025-08-22", time: "05:00 PM", booked: true },
    { date: "2025-08-23", time: "09:00 AM", booked: true },
    { date: "2025-08-23", time: "10:00 AM", booked: false },
    { date: "2025-08-23", time: "11:00 AM", booked: true },
    { date: "2025-08-23", time: "01:00 PM", booked: false },
  ]);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();

    let dates = [];
    const firstDayWeekday = firstDayOfMonth.getDay();

    for (let i = 0; i < firstDayWeekday; i++) {
      dates.push(null);
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
      const date = new Date(currentYear, currentMonth, i);
      dates.push(date.toISOString().split("T")[0]);
    }

    return dates;
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
    const timesForDate = getTimesForDate(date);
    setAvailableTimes(timesForDate);
  };

  const getTimesForDate = (date) => {
    const times = [
      "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "01:00 PM",
      "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", "06:00 PM",
      "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM"
    ];

    const bookedTimesForDate = bookedSlots.filter(slot => slot.date === date);

    return times.map((time) => {
      const isBooked = bookedTimesForDate.some(slot => slot.time === time && slot.booked);
      return { time, booked: isBooked };
    });
  };

  const isDayFullyBooked = () => {
    const timesForDate = availableTimes.length > 0 ? availableTimes : getTimesForDate(selectedDate);
    return timesForDate.every(slot => slot.booked);
  };

  const renderTimeSlots = () => {
    return availableTimes.map((slot, index) => (
      <div key={index} className="flex justify-between items-center mb-2 p-3 rounded-md bg-white shadow-md hover:shadow-lg transition-all hover:scale-105">
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

  const changeMonth = (direction) => {
    if (direction === 'next') {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-7xl bg-white p-8 rounded-xl shadow-xl relative flex">

        {/* Back Icon */}
        <div className="absolute top-0 left-0 mt-4 ml-4">
          <Link
            to="/"
            title="Back to Homepage"
            className="text-blue-600 hover:text-blue-800 transition-all text-2xl"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>

        {/* Left: Calendar */}
        <div className="w-2/3 pr-6">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={() => changeMonth('prev')} 
              className="text-blue-600 hover:text-blue-800 transition-all p-2 rounded-full hover:bg-blue-100"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="lg" />
            </button>
            <h3 className="text-2xl font-bold text-center text-gray-800">
              {`${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`}
            </h3>
            <button 
              onClick={() => changeMonth('next')} 
              className="text-blue-600 hover:text-blue-800 transition-all p-2 rounded-full hover:bg-blue-100"
            >
              <FontAwesomeIcon icon={faChevronRight} size="lg" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 mb-6">
            {generateCalendar().map((date, index) => (
              <div
                key={index}
                className={`text-center p-4 rounded-lg cursor-pointer 
                  ${date ? 'hover:bg-blue-100 hover:border-blue-300 transition-all' : 'opacity-50'} 
                  ${date && date === selectedDate ? 'bg-blue-100 border-2 border-blue-400' : ''}
                `}
                onClick={() => date && handleDateClick(date)}
              >
                {date ? new Date(date).getDate() : ''}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Available Times */}
        <div className="w-1/3">
          {selectedDate && (
            <div>
              <h4 className="text-lg font-semibold text-gray-700 mb-4">
                Available Times for <span className="text-blue-600">{selectedDate}</span>
              </h4>
              {renderTimeSlots()}

              {/* Day Status */}
              <div className="mt-4">
                <span className={`font-bold text-xl ${isDayFullyBooked() ? 'text-red-500' : 'text-green-500'}`}>
                  {isDayFullyBooked() ? "Fully Booked" : "Available"}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
