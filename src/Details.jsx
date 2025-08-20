import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketballBall, faTableTennis, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

// Dummy venue data
const venue = {
  name: "Cebu Sports Club",
  hours: "8AM - 10PM",
  price: "₱500/hr",
  image: "/cebusportsclub.jpg",
  rating: 4.5,
  description: "A premier venue offering top-tier facilities for various sports.",
  sportsOffered: ["Basketball", "Badminton", "Tennis"]
};

// Helper function to render stars
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < fullStars; i++) {
    stars.push(<span key={i}>⭐</span>);
  }

  return stars;
};

// Map sport names to icons
const sportIcons = {
  Basketball: faBasketballBall,
  Badminton: faTableTennis,
  Tennis: faTableTennis,
};

const Details = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 flex justify-center items-start relative">
      {/* Back Icon with design like your example */}
      <div className="absolute top-0 left-0 mt-2 ml-2 sm:mt-4 sm:ml-4">
        <Link
          to="/"
          title="Back to Homepage"
          className="text-green-600 hover:text-green-800 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{venue.name}</h1>

        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-96 object-cover rounded mb-6"
        />

        <div className="flex justify-between items-center text-lg text-gray-700 mb-2">
          <span>⏰ Open Hours: <strong>{venue.hours}</strong></span>
          <span className="text-green-600 font-semibold"> {venue.price}</span>
        </div>

        <div className="flex items-center mb-4">
          {renderStars(venue.rating)}
          <span className="ml-2 text-lg text-gray-700">
            {venue.rating.toFixed(1)} / 5
          </span>
        </div>

        <p className="text-gray-700 text-lg mb-4">{venue.description}</p>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">🏅 Sports Offered</h2>
          <ul className="space-y-2 text-gray-700 text-lg">
            {venue.sportsOffered.map((sport, index) => (
              <li key={index} className="flex items-center">
                <FontAwesomeIcon icon={sportIcons[sport]} className="mr-3 text-green-600" />
                {sport}
              </li>
            ))}
          </ul>
        </div>

        {/* Book Now Button */}
        <div className="mt-6">
          <Link
            to="/booking" // Replace with your booking route
            className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition-all text-lg font-semibold"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Details;
