import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
  faArrowLeft,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
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

  // New state to track selected time slots
  const [selectedTimes, setSelectedTimes] = useState([]);

  const generateCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const numDaysInMonth = lastDayOfMonth.getDate();
    const firstDayWeekday = firstDayOfMonth.getDay();

    let dates = [];
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
    setSelectedTimes([]); // Clear previous time selections when date changes
  };

  const getTimesForDate = (date) => {
    const times = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
      "06:00 PM",
      "07:00 PM",
      "08:00 PM",
      "09:00 PM",
      "10:00 PM",
      "11:00 PM",
    ];

    const bookedTimesForDate = bookedSlots.filter((slot) => slot.date === date);

    return times.map((time) => {
      const isBooked = bookedTimesForDate.some(
        (slot) => slot.time === time && slot.booked
      );
      return { time, booked: isBooked };
    });
  };

  const isDayFullyBooked = () => {
    if (!selectedDate) return false;
    const timesForDate =
      availableTimes.length > 0 ? availableTimes : getTimesForDate(selectedDate);
    return timesForDate.every((slot) => slot.booked);
  };

  // Toggle selection of a time slot if available
  const toggleTimeSelection = (time) => {
    if (selectedTimes.includes(time)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== time));
    } else {
      setSelectedTimes([...selectedTimes, time]);
    }
  };

  const renderTimeSlots = () => {
    return availableTimes.map((slot, index) => {
      const isSelected = selectedTimes.includes(slot.time);
      return (
        <div
          key={index}
          onClick={() => !slot.booked && toggleTimeSelection(slot.time)}
          className={`flex justify-between items-center mb-2 p-4 rounded-lg shadow transition
            cursor-pointer
            ${
              slot.booked
                ? "bg-red-100 text-red-600 cursor-not-allowed"
                : isSelected
                ? "bg-green-400 text-white"
                : "bg-green-100 text-green-600 hover:shadow-xl hover:scale-105"
            }
          `}
        >
          <span className="text-lg font-semibold">{slot.time}</span>
          <span className="flex items-center gap-2 font-semibold text-sm px-2 py-1 rounded-full">
            <FontAwesomeIcon icon={slot.booked ? faTimesCircle : faCheckCircle} />
            {slot.booked ? "Booked" : "Available"}
          </span>
        </div>
      );
    });
  };

  const changeMonth = (direction) => {
    if (direction === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
    setSelectedDate(null);
    setAvailableTimes([]);
    setSelectedTimes([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4 relative">
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8 relative">
        {/* Back Icon */}
        <div className="absolute top-0 left-0 mt-3 ml-3">
          <Link
            to="/Details"
            title="Back to Homepage"
            className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Link>
        </div>

        {/* Main Panel - Calendar and Time Slots */}
        <div className="w-full flex gap-6">
          {/* Calendar on Left */}
          <div className="flex-grow">
            {/* Month Navigation */}
            <div className="flex justify-between items-center mb-6">
              <button
                onClick={() => changeMonth("prev")}
                className="text-green-400 hover:text-green-600 transition-all p-2 rounded-full hover:bg-green-400"
                aria-label="Previous Month"
              >
                <FontAwesomeIcon icon={faChevronLeft} size="lg" />
              </button>
              <h3 className="text-2xl font-bold text-center text-gray-800 flex-grow">
                {`${new Date(currentYear, currentMonth).toLocaleString("default", {
                  month: "long",
                })} ${currentYear}`}
              </h3>
              <button
                onClick={() => changeMonth("next")}
                className="text-green-400 hover:text-green-600 transition-all p-2 rounded-full hover:bg-green-400"
                aria-label="Next Month"
              >
                <FontAwesomeIcon icon={faChevronRight} size="lg" />
              </button>
            </div>

            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 mb-2 text-center font-semibold text-gray-500 select-none">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-6">
              {generateCalendar().map((date, index) => {
                const daySlots = bookedSlots.filter((slot) => slot.date === date);
                const isBooked =
                  daySlots.length > 0 && daySlots.every((slot) => slot.booked);
                const isToday =
                  date === new Date().toISOString().split("T")[0];

                return (
                  <div
                    key={index}
                    className={`text-center p-4 rounded-xl cursor-pointer relative transition-all duration-200 ease-in-out
                    ${
                      date
                        ? "hover:bg-green-400 hover:scale-105"
                        : "opacity-50 cursor-default"
                    }
                    ${
                      date && date === selectedDate
                        ? "bg-green-400 border-2 border-green-400 font-bold shadow-md"
                        : ""
                    }
                    ${isToday ? "border-2 border-green-400" : ""}
                  `}
                    onClick={() => date && handleDateClick(date)}
                    title={isBooked ? "All slots booked" : "Slots available"}
                  >
                    <div className="text-lg select-none">
                      {date ? new Date(date).getDate() : ""}
                    </div>
                    {isBooked && (
                      <div className="w-2 h-2 bg-red-500 rounded-full absolute bottom-2 left-1/2 transform -translate-x-1/2"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Time Slots on Right */}
          <div className="w-72 border-l border-gray-200 pl-6 flex flex-col">
            {selectedDate ? (
              <>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  {new Date(selectedDate).toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </h4>
                <div className="flex flex-col items-start flex-grow overflow-y-auto max-h-[400px]">
                  {renderTimeSlots()}
                </div>
                <div className="mt-4">
                  <span
                    className={`inline-block px-4 py-2 rounded-full text-sm font-semibold
                    ${
                      isDayFullyBooked()
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"
                    }`}
                  >
                    {isDayFullyBooked()
                      ? "All Slots Booked"
                      : "Open Slots Available"}
                  </span>
                </div>
                {/* Confirm Button as Link */}
                {selectedTimes.length > 0 && (
                  <Link
                    to="/BookingSummary"
                    state={{ date: selectedDate, times: selectedTimes }}
                    className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition block text-center"
                  >
                    Confirm Booking
                  </Link>
                )}
              </>
            ) : (
              <p className="text-gray-400 italic">
                Select a date to see available time slots
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
