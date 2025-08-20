import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";


const Homepage = () => {
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

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-white flex justify-center items-start py-12 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="w-full max-w-screen-xl space-y-10 relative">

        {/* 🔒 Logout Icon */}
        <div className="absolute top-0 right-0 mt-2 mr-2 sm:mt-4 sm:mr-4">
          <Link
            to="/login"
            title="Logout"
            className="text-green-600 hover:text-green-800 transition"
          >
            <FontAwesomeIcon icon={faRightFromBracket} className="text-2xl" />
          </Link>
        </div>

        {/* 👤 User Greeting */}
        <div className="flex items-center space-x-4">
          <img
            src="/1000001470.png"
            alt="Profile"
            className="rounded-full w-14 h-14 object-cover border-2 border-green-400 shadow-md"
          />
          <h2 className="text-3xl font-bold text-green-700">
            Hey, John Miecho Arnad
          </h2>
        </div>

        {/* 🏷️ Promotion */}
        <div className="bg-green-500 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
          <div className="absolute top-3 right-3 w-28 h-28 opacity-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4764/4764828.png"
              alt="Football"
              className="w-full h-full object-contain"
            />
          </div>
          <h3 className="text-3xl font-bold mb-4">
            Book Venues With The Best Offers!
          </h3>
          <Link
            to="/Booknow"
            className="bg-white text-green-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-green-100 transition-all"
          >
            Book Now →
          </Link>
        </div>

        {/* 🧭 Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 gap-6 text-center">
          {[
            { emoji: "📅", label: "My Calendar" },
            { emoji: "✏️", label: "Create Venue" },
            { emoji: "⚡", label: "My Venues" },
            { emoji: "⭐", label: "Favourite Venues" },
            { emoji: "🏆", label: "Leaderboard" },
            { emoji: "🔥", label: "Offers" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer border border-transparent hover:border-green-400"
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="font-semibold text-gray-700">{item.label}</div>
            </div>
          ))}
        </div>

        {/* 📍 Popular Venues */}
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <h2 className="text-3xl font-bold text-green-700">Popular Venues</h2>
          </div>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {venues.map((venue, index) => (
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
                  {/* ⭐ Rating Section */}
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
        </div>
      </div>
    </div>
  );
};

export default Homepage;
