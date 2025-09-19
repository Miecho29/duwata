import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faArrowLeft,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const MyVenues = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [invoiceSearchQuery, setInvoiceSearchQuery] = useState("");

  const venues = [
    {
      name: "Cebu Sports Club",
      hours: "8AM - 10PM",
      price: "₱500/hr",
      image: "/cebusportsclub.jpg",
      rating: 4.5,
    },
    {
      name: "House of Rapha",
      hours: "9AM - 9PM",
      price: "₱300/hr",
      image: "/houseofrapha.jpg",
      rating: 5.0,
    },
    {
      name: "YMCA Cebu",
      hours: "6AM - 8PM",
      price: "₱400/hr",
      image: "/ymca.jpg",
      rating: 4.2,
    },
  ];

  const invoices = [
    { status: "Paid", date: "23.05.2023", BookingID: "#ABC123456", customer: "Jane Cooper", hours: "4", total: "₱400" },
    { status: "Paid", date: "23.05.2023", BookingID: "#ABC123456", customer: "Esther Howard", hours: "2", total: "₱400" },
    { status: "Paid", date: "23.05.2023", BookingID: "#ABC123456", customer: "Cameron Williamson", hours: "2", total: "₱400" },
    { status: "Paid", date: "23.05.2023", BookingID: "#ABC123456", customer: "Brooklyn Simmons", hours: "3", total: "₱400" },
    { status: "Paid", date: "23.05.2023", BookingID: "#ABC123456", customer: "Leslie Alexander", hours: "4", total: "₱400" },
    { status: "Paid", date: "23.05.2023", BookingID: "#ABC123456", customer: "Arlene McCoy", hours: "1", total: "₱400" },
    { status: "Cash", date: "23.05.2023", BookingID: "#ABC123456", customer: "Marvin McKinney", hours: "2", total: "₱400" },
    { status: "Cash", date: "23.05.2023", BookingID: "#ABC123456", customer: "Kathryn Murphy", hours: "3", total: "₱400" },
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="flex items-center text-yellow-400">
        {[...Array(fullStars)].map((_, i) => (
          <FontAwesomeIcon icon={solidStar} key={`full-${i}`} className="mr-0.5" />
        ))}
        {halfStar && (
          <FontAwesomeIcon icon={faStarHalfAlt} key="half" className="mr-0.5" />
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <FontAwesomeIcon
            icon={regularStar}
            key={`empty-${i}`}
            className="mr-0.5 text-gray-300"
          />
        ))}
      </div>
    );
  };

  const filteredVenues = venues.filter((venue) =>
    venue.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.customer.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
    invoice.BookingID.toLowerCase().includes(invoiceSearchQuery.toLowerCase()) ||
    invoice.status.toLowerCase().includes(invoiceSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-start py-12 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="w-full max-w-screen-xl space-y-10">

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Link
            to="/Homepage"
            title="Back to Homepage"
            className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-all"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
          </Link>
        </div>

        {/* 📍 My Venues */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-green-700">My Venues</h2>
            <input
              type="text"
              placeholder="Search venues..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {filteredVenues.length === 0 ? (
            <p className="text-gray-500">No venues found.</p>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {filteredVenues.map((venue, index) => (
                <div
                  key={index}
                  className="bg-white shadow rounded overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {venue.name}
                    </h3>
                    <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
                      <span>Open: {venue.hours}</span>
                      <span className="font-semibold text-green-600">
                        {venue.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center">
                        {renderStars(venue.rating)}
                        <span className="ml-2 text-sm text-gray-600">
                          {venue.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <Link
                      to="/Details"
                      className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 📊 Metrics Section
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-2xl font-semibold text-gray-800">400</p>
            <p className="text-sm text-gray-500 mt-1">Total Booking</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-2xl font-semibold text-gray-800">$60,400</p>
            <p className="text-sm text-gray-500 mt-1">Drafted totals</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-2xl font-semibold text-gray-800">$60,400</p>
            <p className="text-sm text-gray-500 mt-1">Unpaid totals</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-2xl font-semibold text-gray-800">08 days</p>
            <p className="text-sm text-gray-500 mt-1">Average paid time</p>
          </div>
        </div> */}

        {/* 📄 Invoices */}
        <div className="space-y-4 mt-16">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-3xl font-bold text-green-700">Invoices</h2>
            <input
              type="text"
              placeholder="Search invoices..."
              value={invoiceSearchQuery}
              onChange={(e) => setInvoiceSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm w-full sm:w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm">
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                      No matching invoices found.
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs font-semibold rounded-full
                          ${invoice.status === 'Paid' ? 'bg-green-100 text-green-800' :
                            invoice.status === 'Cash' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-600'}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.BookingID}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.customer}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.hours}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{invoice.total}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MyVenues;
