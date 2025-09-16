import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CreateVenue = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    price: "",
    typeOfSports: "",
    description: "",
    contactPerson: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-b from-white via-green-50 to-white flex justify-center items-start py-12 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">

      {/* Inject CSS for hiding number input arrows */}
      <style>{`
        .no-spinner::-webkit-inner-spin-button,
        .no-spinner::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .no-spinner {
          -moz-appearance: textfield;
        }
      `}</style>

      {/* Back to Homepage Link */}
      <div className="absolute top-0 left-0 mt-2 ml-2 sm:mt-4 sm:ml-4">
        <Link
          to="/"
          title="Back to Homepage"
          className="text-green-600 hover:text-green-800 transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="text-2xl" />
        </Link>
      </div>

      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-md">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Create a Venue</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Venue Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Venue Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Contact Person */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Contact Person</label>
            <input
              type="text"
              name="contactPerson"
              value={formData.contactPerson}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price per Hour */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Price per Hour (₱)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="no-spinner w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Type of Sports */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Type of Sports Offered</label>
            <input
              type="text"
              name="typeOfSports"
              value={formData.typeOfSports}
              onChange={handleChange}
              placeholder="e.g. Basketball, Volleyball"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Venue Picture</label>
            <div
              className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50 text-center cursor-pointer hover:bg-gray-100 transition"
              onClick={() => document.getElementById("imageUpload").click()}
            >
              <p className="text-gray-500 font-medium">
                Drop files here or <span className="text-green-600 underline">click to browse</span>
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Supported formats: Images<br />
                Maximum file size: 10MB
              </p>
              {formData.image && (
                <p className="mt-2 text-green-700 font-semibold">
                  Selected: {formData.image.name}
                </p>
              )}
            </div>
            <input
              type="file"
              id="imageUpload"
              name="image"
              accept=".pdf,.png,.jpg,.jpeg,"
              onChange={handleChange}
              className="hidden"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition-all"
            >
              Create Venue
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateVenue;
