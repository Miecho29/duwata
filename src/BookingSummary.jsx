import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faMobileAlt,
  faWallet,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";

const BookingSummary = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentOptions = [
    { name: "Bank Transfer", icon: faUniversity },
    { name: "GCash", icon: faMobileAlt },
    { name: "Maya", icon: faWallet },
    { name: "Cash", icon: faMoneyBillWave },
  ];

  const selectPayment = (name) => {
    setSelectedPayment(name);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 md:px-6 flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-4 sm:p-6 md:p-8">
        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Booking Summary</h1>

        {/* Venue Image */}
        <img
          src="/cebusportsclub.jpg"
          alt="Top of Innsbruck"
          className="w-full h-48 sm:h-64 object-cover rounded mb-6"
        />

        {/* Venue Info */}
        <div className="mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Cebu Sports Club</h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Cardinal Rosales Ave, Cebu City, Cebu 6000
          </p>
          <p className="text-gray-600 text-sm sm:text-base">
            📅 10 September 2025 | 🕤 Starting 09:30
          </p>
        </div>

        {/* Price Breakdown */}
        <div className="text-gray-700 space-y-2 text-base sm:text-lg border-t pt-4">
          <div className="flex justify-between">
            <span>BasketBall - 2 Hours</span>
            <span>₱1,000.00</span>
          </div>

          <div className="flex justify-between font-semibold border-t pt-4 mt-2">
            <span>Subtotal</span>
            <span>₱1,000.00</span>
          </div>

          <div className="flex justify-between text-green-600">
            <span>Voucher</span>
            <span>₱- 0.00</span>
          </div>

          <div className="flex justify-between text-lg sm:text-xl font-bold border-t pt-4 mt-2">
            <span>Total</span>
            <span>₱1,000.00</span>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-6 border-t pt-6">
          <h3 className="text-lg sm:text-xl font-semibold mb-4">Payment Method</h3>
          <div className="flex flex-wrap gap-3">
            {paymentOptions.map(({ name, icon }) => {
              const selected = selectedPayment === name;
              return (
                <button
                  key={name}
                  type="button"
                  onClick={() => selectPayment(name)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-medium transition text-sm sm:text-base ${
                    selected
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-green-50"
                  }`}
                >
                  <FontAwesomeIcon icon={icon} />
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row sm:justify-end sm:space-x-4 gap-2 sm:gap-0">
          <Link
            to="/Homepage"
            title="Cancel Booking"
            className="w-full sm:w-auto text-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Cancel
          </Link>
          <Link
            to="/Payment"
            title="Proceed to Payment"
            className="w-full sm:w-auto text-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
