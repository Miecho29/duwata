// CreateVenue.jsx

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUniversity,
  faMobileAlt,
  faWallet,
  faMoneyBillWave,
  faTrash,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const CreateVenue = () => {
  const navigate = useNavigate();

  const sportsOptions = [
    "Basketball",
    "Volleyball",
    "Badminton",
    "Tennis",
    "Football",
    "Table Tennis",
    "Baseball",
    "Swimming",
    "Cricket",
    "Running Track",
  ];

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    typeOfSports: [],
    description: "",
    contactPerson: "",
    mobileNumber: "+63",
    image: null,
    paymentMethods: [],
  });

  const [bookingSchedule, setBookingSchedule] = useState([]);
  const [scheduleInput, setScheduleInput] = useState({
    dates: [],
    startTime: "",
    endTime: "",
  });

  const [mobileError, setMobileError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleMobileInput = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+63")) {
      if (value.length < 3) {
        value = "+63";
      } else {
        value = "+63" + value.replace(/[^0-9]/g, "").slice(0, 10);
      }
    }

    const afterPrefix = value.slice(3).replace(/[^0-9]/g, "");
    const limitedAfterPrefix = afterPrefix.slice(0, 10);
    const newValue = "+63" + limitedAfterPrefix;

    setFormData({ ...formData, mobileNumber: newValue });
    setMobileError("");
  };

  const validateMobileNumber = (number) => {
    const regex = /^\+639\d{9,10}$/;
    return regex.test(number);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateMobileNumber(formData.mobileNumber)) {
      setMobileError("Please enter a valid Philippine mobile number starting with +639.");
      return;
    }

    const dataToSubmit = {
      ...formData,
      bookingSchedule,
    };

    console.log(dataToSubmit);
    navigate("/");
  };

  const formatPrice = (value) => {
    const number = parseInt(value.replace(/,/g, ""), 10);
    if (isNaN(number)) return "";
    return number.toLocaleString("en-PH");
  };

  const handlePriceChange = (e) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numericValue = rawValue.replace(/\D/g, "");
    setFormData({ ...formData, price: numericValue });
  };

  const paymentOptions = [
    { name: "Bank Transfer", icon: faUniversity },
    { name: "GCash", icon: faMobileAlt },
    { name: "Maya", icon: faWallet },
    { name: "Cash", icon: faMoneyBillWave },
  ];

  const handleAddSport = (e) => {
    const selectedSport = e.target.value;
    if (selectedSport && !formData.typeOfSports.includes(selectedSport)) {
      setFormData({
        ...formData,
        typeOfSports: [...formData.typeOfSports, selectedSport],
      });
    }
    e.target.value = "";
  };

  const handleRemoveSport = (sport) => {
    setFormData({
      ...formData,
      typeOfSports: formData.typeOfSports.filter((s) => s !== sport),
    });
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-white flex justify-center items-start py-12 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <style>{`
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>

      <div className="absolute top-0 left-0 mt-2 ml-2 sm:mt-4 sm:ml-4">
        <Link
          to="/Homepage"
          title="Back to Homepage"
          className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </Link>
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Create a Venue</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Venue Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Venue Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleMobileInput}
              placeholder="+63XXXXXXXXXX"
              required
              maxLength={13}
              className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 ${
                mobileError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-green-500"
              }`}
            />
            {mobileError && (
              <p className="text-red-600 mt-1 text-sm">{mobileError}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price per Hour */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price per Hour</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₱</span>
              <input
                type="text"
                name="price"
                value={formatPrice(formData.price)}
                onChange={handlePriceChange}
                required
                placeholder="0"
                className="no-spinner w-full border border-gray-300 rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Type of Sports Offered */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Type of Sports Offered</label>
            <select
              onChange={handleAddSport}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              defaultValue=""
            >
              <option value="" disabled>Select a Sport</option>
              {sportsOptions
                .filter((sport) => !formData.typeOfSports.includes(sport))
                .map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
            </select>
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.typeOfSports.map((sport) => (
                <div
                  key={sport}
                  className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  <span>{sport}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveSport(sport)}
                    className="hover:text-red-600 transition"
                    aria-label={`Remove ${sport}`}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Payment Methods */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Payment Methods</label>
            <div className="flex flex-wrap gap-3">
              {paymentOptions.map(({ name, icon }) => {
                const selected = formData.paymentMethods.includes(name);
                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => {
                      const updated = selected
                        ? formData.paymentMethods.filter((m) => m !== name)
                        : [...formData.paymentMethods, name];
                      setFormData({ ...formData, paymentMethods: updated });
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition ${
                      selected ? "bg-green-600 text-white border-green-600" : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                    }`}
                  >
                    <FontAwesomeIcon icon={icon} />
                    {name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Booking Schedule with Multi-Date Support */}
          <div className="border border-green-200 bg-green-50 rounded-xl p-5 shadow-sm">
            <h3 className="text-lg font-semibold text-green-700 mb-4">📅 Booking Schedule</h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Dates</label>
                <input
                  type="date"
                  multiple
                  onChange={(e) => {
                    const selectedDates = Array.from(e.target.selectedOptions || [e.target])
                      .map((opt) => opt.value || opt?.text || e.target.value)
                      .filter(Boolean);
                    setScheduleInput((prev) => ({
                      ...prev,
                      dates: selectedDates.length > 0 ? selectedDates : [e.target.value],
                    }));
                  }}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Start Time</label>
                <input
                  type="time"
                  value={scheduleInput.startTime}
                  onChange={(e) => setScheduleInput({ ...scheduleInput, startTime: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">End Time</label>
                <input
                  type="time"
                  value={scheduleInput.endTime}
                  onChange={(e) => setScheduleInput({ ...scheduleInput, endTime: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const { dates, startTime, endTime } = scheduleInput;
                if (dates.length > 0 && startTime && endTime) {
                  const newSchedules = dates.map((date) => ({
                    date,
                    startTime,
                    endTime,
                  }));

                  const uniqueSchedules = newSchedules.filter(
                    (newItem) =>
                      !bookingSchedule.some(
                        (existing) =>
                          existing.date === newItem.date &&
                          existing.startTime === newItem.startTime &&
                          existing.endTime === newItem.endTime
                      )
                  );

                  if (uniqueSchedules.length === 0) {
                    alert("Selected schedules already exist.");
                    return;
                  }

                  setBookingSchedule([...bookingSchedule, ...uniqueSchedules]);
                  setScheduleInput({ dates: [], startTime: "", endTime: "" });
                }
              }}
              className="mb-4 bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all shadow"
            >
              ➕ Add Schedule
            </button>

            {bookingSchedule.length > 0 && (
              <div className="space-y-2">
                {bookingSchedule.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm"
                  >
                    <div>
                      <span className="text-green-700 font-medium">{item.date}</span>{" "}
                      <span className="text-gray-600 text-sm">
                        {item.startTime} - {item.endTime}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setBookingSchedule(bookingSchedule.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Venue Picture</label>
            <div
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <p className="text-gray-500 font-medium">
                Drop files here or{" "}
                <span className="text-green-600 underline">click to browse</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supported formats: Images • Max size: 10MB
              </p>
              {formData.image && (
                <p className="mt-2 text-green-700 font-semibold">Selected: {formData.image.name}</p>
              )}
            </div>
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept=".png,.jpg,.jpeg"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition-all"
            >
              Create Venue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVenue;
