import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import html2pdf from "html2pdf.js";

const Payment = () => {
  const receiptRef = useRef();

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

  const handleDownloadPDF = () => {
    const element = receiptRef.current;

    const opt = {
      margin: 0.3,
      filename: `receipt-${bookingData.bookingId}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-10 px-4 sm:px-6 lg:px-8">
      <div
        className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 sm:p-8"
        ref={receiptRef}
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-green-600 text-5xl sm:text-6xl mb-2"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Booked Successful
          </h1>
          {/* <p className="text-gray-600 text-sm">
            Your reservation is confirmed
          </p> */}
        </div>

        {/* Receipt Details */}
        <div className="space-y-4 text-sm text-gray-700">
          <Section title="Receipt Details">
            <DetailRow label="Booking ID" value={bookingData.bookingId} />
            <DetailRow label="Name" value={bookingData.name} />
            <DetailRow label="Date" value={bookingData.date} />
            <DetailRow
              label="Hours Reserved"
              value={`${bookingData.hours} hours`}
            />
          </Section>

          <Section title="Venue Information">
            <DetailRow label="Venue Name" value={bookingData.venueName} />
            <DetailRow label="Location" value={bookingData.location} />
            <DetailRow
              label="Contact Person"
              value={bookingData.contactPersonName}
            />
            <DetailRow
              label="Contact Number"
              value={bookingData.contactPersonNumber}
            />
          </Section>

          <Section title="Payment Summary">
            <DetailRow label="Payment Method" value={bookingData.paymentMethod} />
            <DetailRow label="Total Paid" value={bookingData.price} />
          </Section>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row sm:justify-between gap-3">
          <Link
            to="/Homepage"
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md text-center font-semibold transition w-full sm:w-auto"
          >
            Back to Home
          </Link>

          <button
            onClick={handleDownloadPDF}
            className="border border-gray-300 py-3 px-4 rounded-md text-sm hover:bg-gray-100 w-full sm:w-auto"
          >
            Download Receipt (PDF)
          </button>
        </div>
      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-md font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
      {title}
    </h2>
    <div className="space-y-2">{children}</div>
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex justify-between text-sm flex-wrap">
    <span className="text-gray-500">{label}</span>
    <span className="font-medium text-gray-800 text-right break-words max-w-[60%]">
      {value}
    </span>
  </div>
);

export default Payment;
