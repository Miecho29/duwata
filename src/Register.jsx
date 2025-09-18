import React, { useState } from "react";
import { Link } from "react-router-dom";


export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    alert("Register submitted");
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md w-full">
        <h2 className="text-2xl font-extrabold text-green-700 mb-2 text-center">
          Welcome To DuwaTa!
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Please create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your full name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

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

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold mb-1 text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="********"
              required
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white font-semibold py-3 rounded-full hover:bg-green-800 transition-colors"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-600 mt-6 text-sm">
          Already have an account?{" "}
           <Link
            to="/"
            className="font-medium text-green-600 hover:text-green-500">
            Sign up
        </Link>
        </p>
      </div>
    </div>
  );
}
