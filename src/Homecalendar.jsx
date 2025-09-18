import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function generateTimeSlots(startHour = 9, endHour = 12, intervalMinutes = 15) {
  const slots = [];
  let current = new Date();
  current.setHours(startHour, 0, 0, 0);

  const end = new Date();
  end.setHours(endHour, 0, 0, 0);

  while (current <= end) {
    const hours = current.getHours();
    const minutes = current.getMinutes();

    let ampm = hours >= 12 ? "PM" : "AM";
    let hour12 = hours % 12;
    if (hour12 === 0) hour12 = 12;
    const minuteStr = minutes.toString().padStart(2, "0");

    slots.push(`${hour12}:${minuteStr} ${ampm}`);

    current = new Date(current.getTime() + intervalMinutes * 60000);
  }

  return slots;
}

const timeSlots = generateTimeSlots(9, 12, 15);

function Homecalendar() {
  const [date, setDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(date.getDate());

  // Demo bookings - replace with your real data
  const [bookings] = useState({
    "2025-09-17": ["9:00 AM", "10:15 AM"],
    "2025-09-18": ["9:30 AM", "11:00 AM", "12:00 PM"],
  });

  const year = date.getFullYear();
  const month = date.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const changeMonth = (offset) => {
    const newDate = new Date(year, month + offset, 1);
    setDate(newDate);
    setSelectedDay(1);
  };

  const monthName = date.toLocaleString("default", { month: "long" });

  const selectedDateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
    selectedDay
  ).padStart(2, "0")}`;

  const bookedSlots = bookings[selectedDateKey] || [];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8 relative">
      {/* Fixed arrow top-left */}
      <Link
        to="/Homepage"
        className="fixed top-4 left-4 text-green-600 hover:text-green-800 transition"
        aria-label="Go to Homepage"
      >
        <FontAwesomeIcon icon={faArrowLeft} size="2x" />
      </Link>

      <div className="max-w-5xl w-full bg-white rounded-xl shadow-lg flex flex-col lg:flex-row gap-8 font-sans select-none p-4 md:p-6">
        {/* Left calendar */}
        <div className="w-full lg:w-2/3">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => changeMonth(-1)}
              className="text-green-600 hover:text-green-800 transition text-2xl font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Previous month"
            >
              &lt;
            </button>
            <div className="text-2xl font-semibold text-gray-800 select-none">
              {monthName} {year}
            </div>
            <button
              onClick={() => changeMonth(1)}
              className="text-green-600 hover:text-green-800 transition text-2xl font-bold p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Next month"
            >
              &gt;
            </button>
          </div>

          {/* Days of week */}
          <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 tracking-wide mb-4 select-none">
            {daysOfWeek.map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2 text-center text-gray-700">
            {[...Array(firstDayOfWeek).keys()].map((i) => (
              <div key={"empty-" + i} className="py-4"></div>
            ))}

            {[...Array(daysInMonth).keys()].map((dayIndex) => {
              const dayNumber = dayIndex + 1;
              const isSelected = dayNumber === selectedDay;
              const isToday =
                dayNumber === new Date().getDate() &&
                month === new Date().getMonth() &&
                year === new Date().getFullYear();

              return (
                <button
                  key={dayNumber}
                  onClick={() => setSelectedDay(dayNumber)}
                  className={`py-3 rounded-lg font-semibold transition focus:outline-none
                    ${
                      isSelected
                        ? "bg-green-600 text-white shadow-lg"
                        : "hover:bg-green-100"
                    }
                    ${isToday && !isSelected ? "border border-green-400" : ""}
                  `}
                  aria-current={isToday ? "date" : undefined}
                >
                  {dayNumber}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side time slots */}
        <div className="w-full lg:w-1/3 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 lg:pl-6 flex flex-col">
          <div className="mb-6 text-gray-800 font-semibold text-lg select-none">
            {date.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto max-h-[50vh] sm:max-h-[300px]">
            {timeSlots.map((time) => {
              const isBooked = bookedSlots.includes(time);
              return (
                <div
                  key={time}
                  className={`flex items-center justify-between rounded-lg px-4 py-3 font-medium shadow-sm
                    ${
                      isBooked
                        ? "bg-red-100 text-red-700"
                        : "bg-green-50 text-green-700"
                    }
                  `}
                  aria-label={`${time} slot is ${isBooked ? "booked" : "available"}.`}
                >
                  <span>{time}</span>
                  <div className="flex items-center gap-2 font-semibold select-none">
                    {isBooked ? (
                      <>
                        <span>Booked</span>
                        <svg
                          className="w-5 h-5 text-red-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          ></path>
                        </svg>
                      </>
                    ) : (
                      <>
                        <span>Available</span>
                        <svg
                          className="w-5 h-5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homecalendar;
