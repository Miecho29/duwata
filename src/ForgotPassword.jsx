import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation or API logic here
    alert("Email is Sent");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-extrabold text-green-700 mb-2 text-center">
          Welcome To DuwaTa!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="you@example.com"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-full hover:bg-green-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
