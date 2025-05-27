import React from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
  const venues = [
    {
      name: "Cebu Sports Club",
      hours: "8AM - 10PM",
      image: "/cebusportsclub.jpg",
    },
    {
      name: "House of Rapha",
      hours: "9AM - 9PM",
      image: "/houseofrapha.jpg",
    },
    {
      name: "YMCA Cebu",
      hours: "6AM - 8PM",
      image: "/ymca.jpg",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-white flex justify-center items-start py-12 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="w-full max-w-screen-xl space-y-10">

        {/* User Info */}
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

        {/* Search Bar */}
        <div>
          <input
            type="text"
            placeholder="🔍 What are you looking for?"
            className="w-full px-5 py-3 rounded-full border border-gray-200 shadow focus:outline-none focus:ring-2 focus:ring-green-400 text-lg placeholder-gray-500"
          />
        </div>

        {/* Promo Banner */}
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

        {/* Feature Grid */}
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

        {/* Popular Venues Section */}
        <div className="space-y-4">
          {/* Styled Header */}
          <div className="flex items-center space-x-4">
           
            <h2 className="text-3xl font-bold text-green-700">Popular Venues</h2>
          </div>

          {/* Venue Cards */}
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
                  <h3 className="text-lg font-semibold text-gray-800">{venue.name}</h3>
                  <p className="text-sm text-gray-600">
                    {venue.type}  Open: {venue.hours}
                  </p>
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
        </div>

      </div>
    </div>
  );
};

export default Homepage;
