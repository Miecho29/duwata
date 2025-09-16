import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUniversity,
  faMobileAlt,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const paymentOptions = [
  {
    id: "bank",
    label: "Bank Transfer",
    icon: faUniversity,
  },
  {
    id: "gcash",
    label: "GCash",
    icon: faMobileAlt,
  },
  {
    id: "maya",
    label: "Maya",
    icon: faCreditCard,
  },
];

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState("");

  const handlePaymentChange = (method) => {
    setSelectedPayment(method);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Payment Option:", selectedPayment);
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-white flex justify-center items-start py-12 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">

      {/* Back Button */}
      <div className="absolute top-0 left-0 mt-2 ml-2 sm:mt-4 sm:ml-4">
        <Link to="/BookingSummary" title="Back to Homepage" className="text-green-600 hover:text-green-800 transition">
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </Link>
      </div>

      <div className="w-full max-w-2xl bg-white p-30 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">Choose Payment Method</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Payment Option Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {paymentOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handlePaymentChange(option.id)}
                className={`cursor-pointer border-2 rounded-xl p-6 flex flex-col items-center justify-center text-center transition-all duration-300 shadow-sm hover:shadow-md ${
                  selectedPayment === option.id ? "border-green-600 bg-green-50" : "border-gray-200"
                }`}
              >
                <FontAwesomeIcon
                  icon={option.icon}
                  className={`text-3xl mb-3 ${
                    selectedPayment === option.id ? "text-green-600" : "text-gray-500"
                  }`}
                />
                <span className="font-medium text-gray-800">{option.label}</span>
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option.id}
                  checked={selectedPayment === option.id}
                  onChange={() => handlePaymentChange(option.id)}
                  className="hidden"
                />
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              className={`w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition-all ${
                !selectedPayment ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!selectedPayment}
            >
              Continue with {selectedPayment ? paymentOptions.find(p => p.id === selectedPayment)?.label : "Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;
