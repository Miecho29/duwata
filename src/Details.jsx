import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketballBall,
  faTableTennis,
  faArrowLeft,
  faChevronRight,
  faChevronLeft,
  faStar as faSolidStar,
  faStarHalfAlt
} from "@fortawesome/free-solid-svg-icons";
import { faStar as faRegularStar } from "@fortawesome/free-regular-svg-icons";
import { Link } from 'react-router-dom';

// Dummy venue data with multiple images
const venue = {
  name: "Cebu Sports Club",
  hours: "8AM - 10PM",
  price: "₱500/hr",
  images: [ // Now an array of images
    "/cebusportsclub.jpg",
    "/houseofrapha.jpg",
    "/ymca.jpg"
  ],
  rating: 4.5,
  description: "A premier venue offering top-tier facilities for various sports.",
  sportsOffered: ["Basketball", "Badminton", "Tennis"]
};

// Render star rating
const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<FontAwesomeIcon key={i} icon={faSolidStar} className="text-yellow-400 mr-1" />);
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<FontAwesomeIcon key={i} icon={faStarHalfAlt} className="text-yellow-400 mr-1" />);
    } else {
      stars.push(<FontAwesomeIcon key={i} icon={faRegularStar} className="text-yellow-400 mr-1" />);
    }
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === venue.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? venue.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-10 px-4 sm:px-8 flex justify-center items-start relative">
      
      {/* Back button */}
      <div className="absolute top-4 left-4">
        <Link
          to="/"
          title="Back to Homepage"
          className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-all"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-xl" />
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden">
        {/* Image Carousel */}
        <div className="relative w-full h-72 sm:h-96">
          <img
            src={venue.images[currentImageIndex]}
            alt={`Venue Image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover transition duration-500 ease-in-out"
          />

          {/* Prev button */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
            aria-label="Previous Image"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>

          {/* Next button */}
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full shadow"
            aria-label="Next Image"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>

          {/* Image dots */}
          <div className="absolute bottom-4 w-full flex justify-center gap-2">
            {venue.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentImageIndex ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Venue Details */}
        <div className="p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{venue.name}</h1>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-lg text-gray-600 mb-4">
            <p><strong>Open Hours:</strong> {venue.hours}</p>
            <p className="text-green-600 font-semibold text-xl mt-2 sm:mt-0">{venue.price}</p>
          </div>

          <div className="flex items-center mb-4">
            {renderStars(venue.rating)}
            <span className="ml-2 text-gray-700 font-medium">{venue.rating.toFixed(1)} / 5</span>
          </div>

          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            {venue.description}
          </p>

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">🏅 Sports Offered</h2>
            <ul className="space-y-3">
              {venue.sportsOffered.map((sport, index) => (
                <li key={index} className="flex items-center text-lg text-gray-700">
                  <FontAwesomeIcon icon={sportIcons[sport]} className="text-green-500 mr-3 text-xl" />
                  {sport}
                </li>
              ))}
            </ul>
          </div>

          {/* Book Now Button */}
          <div className="text-center mt-8">
            <Link
              to="/Calendar"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 hover:scale-105 transition-all text-lg font-semibold"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
