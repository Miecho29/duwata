import React from "react";
import { Link } from "react-router-dom"; // ✅ Add this import

const BookingSummary = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center items-start">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-8">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Summary</h1>

        {/* Venue Image */}
        <img
          src="/cebusportsclub.jpg"
          alt="Top of Innsbruck"
          className="w-full h-64 object-cover rounded mb-6"
        />

        {/* Venue Info */}
        <div className="mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Cebu Sports Club</h2>
          <p className="text-gray-600">Cardinal Rosales Ave, Cebu City, Cebu 6000</p>
          <p className="text-gray-600">📅 10 September 2025 | 🕤 Starting 09:30</p>
        </div>

        {/* Price Breakdown */}
        <div className="text-gray-700 space-y-2 text-lg border-t pt-4">
          <div className="flex justify-between">
            <span>BasketBall - 2 Hours</span>
            <span>1,000.00</span>
          </div>

          <div className="flex justify-between font-semibold border-t pt-4 mt-2">
            <span>Subtotal</span>
            <span>1,000.00</span> {/* Fixed typo: removed extra .00 */}
          </div>

          <div className="flex justify-between text-green-600">
            <span>Voucher</span>
            <span>- 0.00</span>
          </div>

          <div className="flex justify-between text-xl font-bold border-t pt-4 mt-2">
            <span>Total</span>
            <span>1,000.00</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <Link
            to="/"
            title="Cancel Booking"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Cancel
          </Link>
          <Link
            to="/Payment"
            title="Proceed to Payment"
           className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">
          
            Proceed to Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
