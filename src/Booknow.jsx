import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const Booknow = () => {
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <div className="min-h-screen w-full bg-white flex justify-center items-start py-12 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="w-full max-w-screen-xl space-y-10">

        {/* 🔍 Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search venues..."
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* 📍 Popular Venues */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-green-700">Popular Venues</h2>
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
                      to="/venue-details"
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
      </div>
    </div>
  );
};

export default Booknow;
