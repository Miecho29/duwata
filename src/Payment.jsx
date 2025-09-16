import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUniversity,
  faMobileAlt,
  faWallet,
  faMoneyBillWave,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const Payment = () => {
  const [selectedPayment, setSelectedPayment] = useState(null);

  const paymentOptions = [
    { name: "Bank Transfer", icon: faUniversity },
    { name: "GCash", icon: faMobileAlt },
    { name: "Maya", icon: faWallet },
    { name: "Cash", icon: faMoneyBillWave },
  ];

  const bookingData = {
    bookingId: "ABC123456",
    name: "Giorgano Williams",
    date: "20 July 2025",
    hours: "2",
    venueName: "The Gourmet Spot",
    location: "123 Food Street",
    contactPersonName: "John Doe",
    contactPersonNumber: "+639231231331",
    paymentMethod: "Cash",
    price: "₱1,000.00",
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-6">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center">
        {/* Green check icon */}
        <div className="text-green-600 mb-6 flex justify-center">
          <FontAwesomeIcon icon={faCheckCircle} className="text-[64px]" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
        <p className="text-gray-600 mb-8">
          You've successfully reserved in this Venue
        </p>

        {/* Booking details */}
        <div className="text-left space-y-4 text-gray-800 text-lg font-semibold">
          <DetailRow label="Booking ID" value={bookingData.bookingId} />
          <DetailRow label="Name" value={bookingData.name} />
          <DetailRow label="Date" value={bookingData.date} />
          <DetailRow label="Hours" value={bookingData.hours} />
          <DetailRow label="Venue Name" value={bookingData.venueName} />
          <DetailRow label="Location" value={bookingData.location} />
          <DetailRow label="Contact Person Name" value={bookingData.contactPersonName} />
          <DetailRow label="Contact Person Number" value={bookingData.contactPersonNumber} />
          <DetailRow label="Payment Method" value={bookingData.paymentMethod} />
          <DetailRow label="Price" value={bookingData.price} />
        </div>

        {/* Back to Home link */}
        <Link
          to="/" // Update this to your homepage route
          className="mt-10 bg-green-600 text-white w-full py-3 rounded-lg font-semibold hover:bg-green-700 transition inline-block text-center"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between border-b border-gray-300 pb-2">
    <span className="font-normal">{label}</span>
    <span>{value}</span>
  </div>
);

export default Payment;
