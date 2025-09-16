import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [userInfo, setUserInfo] = useState({
    profileImage: "/1000001470.png", // initial image
    firstName: "John",
    middleName: "Miecho",
    lastName: "Arnad",
    gender: "Male",
    suffix: "",
    age: 28,
    nationality: "Filipino",
    password: "password123", // for demo only
  });

  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: userInfo.firstName,
    middleName: userInfo.middleName,
    lastName: userInfo.lastName,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (formValues.password !== formValues.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setUserInfo((prev) => ({
      ...prev,
      firstName: formValues.firstName.trim(),
      middleName: formValues.middleName.trim(),
      lastName: formValues.lastName.trim(),
      password: formValues.password ? formValues.password : prev.password,
    }));

    setEditMode(false);
    setFormValues((prev) => ({ ...prev, password: "", confirmPassword: "" }));
    alert("Information updated!");
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // For preview: convert to a local URL
    const imageUrl = URL.createObjectURL(file);
    setUserInfo((prev) => ({
      ...prev,
      profileImage: imageUrl,
    }));

    // Optionally: Here you can upload the image to your server or save it as needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-green-50 to-white flex flex-col items-center py-12 px-6 sm:px-12 lg:px-24 font-sans text-gray-800">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="self-start mb-8 flex items-center text-green-600 hover:text-green-800 font-semibold transition"
        aria-label="Back to homepage"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2 text-xl" />
        
      </button>

      <h1 className="text-4xl font-extrabold text-green-700 mb-10 drop-shadow-md">
        Personal Information
      </h1>

      <div className="bg-white rounded-3xl shadow-xl w-full max-w-lg p-10">
        {/* Profile Image */}
        <div className="flex justify-center mb-10">
          <div
            className={`relative cursor-pointer rounded-full w-28 h-28 overflow-hidden border-4 border-green-400 shadow-md hover:ring-4 hover:ring-green-300 transition`}
            onClick={() => fileInputRef.current.click()}
            title="Click to change profile image"
          >
            <img
              src={userInfo.profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 right-0 bg-green-600 text-white rounded-full p-1 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 11l6 6m-7 1v-3a2 2 0 012-2h3"
                />
              </svg>
            </div>
          </div>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* First Name */}
          <div>
            <label className="block font-semibold text-green-700 mb-1">
              First Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleChange}
                className="w-full rounded-xl border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                placeholder="First Name"
              />
            ) : (
              <p className="text-gray-700 py-2 px-4 rounded-xl bg-green-50 border border-green-200 shadow-inner">
                {userInfo.firstName}
              </p>
            )}
          </div>

          {/* Middle Name */}
          <div>
            <label className="block font-semibold text-green-700 mb-1">
              Middle Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="middleName"
                value={formValues.middleName}
                onChange={handleChange}
                className="w-full rounded-xl border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                placeholder="Middle Name"
              />
            ) : (
              <p className="text-gray-700 py-2 px-4 rounded-xl bg-green-50 border border-green-200 shadow-inner">
                {userInfo.middleName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block font-semibold text-green-700 mb-1">
              Last Name
            </label>
            {editMode ? (
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleChange}
                className="w-full rounded-xl border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                placeholder="Last Name"
              />
            ) : (
              <p className="text-gray-700 py-2 px-4 rounded-xl bg-green-50 border border-green-200 shadow-inner">
                {userInfo.lastName}
              </p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-semibold text-green-700 mb-1">
              Gender
            </label>
            <p className="text-gray-700 py-2 px-4 rounded-xl bg-green-50 border border-green-200 shadow-inner">
              {userInfo.gender}
            </p>
          </div>

          {/* Suffix */}
          <div>
            <label className="block font-semibold text-green-700 mb-1">
              Suffix
            </label>
            {editMode ? (
              <input
                type="text"
                name="Suffix"
                value={formValues.Suffix}
                onChange={handleChange}
                className="w-full rounded-xl border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                placeholder="Suffix"
              />
            ) : (
              <p className="text-gray-700 py-5 px-4 rounded-xl bg-green-50 border border-green-200 shadow-inner">
                {userInfo.Suffix}
              </p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block font-semibold text-green-700 mb-1">Age</label>
            <p className="text-gray-700 py-2 px-4 rounded-xl bg-green-50 border border-green-200 shadow-inner">
              {userInfo.age}
            </p>
          </div>

          {/* Nationality */}
          <div className="sm:col-span-2">
            <label className="block font-semibold text-green-700 mb-1">
              Nationality
            </label>
            <p className="text-gray-700 py-2 px-4 rounded-xl bg-green-50 border border-green-200 shadow-inner">
              {userInfo.nationality}
            </p>
          </div>
        </div>

        {/* Password fields show only in edit mode */}
        {editMode && (
          <div className="mt-8 grid grid-cols-1 gap-6">
            <div>
              <label className="block font-semibold text-green-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                name="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Enter new password"
                className="w-full rounded-xl border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              />
            </div>
            <div>
              <label className="block font-semibold text-green-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full rounded-xl border border-green-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-10 flex justify-end gap-4">
          {editMode ? (
            <>
              <button
                onClick={() => setEditMode(false)}
                className="px-6 py-2 rounded-full border-2 border-green-400 text-green-600 font-semibold hover:bg-green-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 rounded-full bg-green-600 text-white font-bold shadow-lg hover:bg-green-700 transition"
              >
                Save
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="px-6 py-3 rounded-full bg-green-600 text-white font-bold shadow-md hover:bg-green-700 transition"
            >
              Edit Info
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
