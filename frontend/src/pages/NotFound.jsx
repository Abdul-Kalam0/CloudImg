import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>

      <p className="mt-4 text-gray-600 text-lg text-center">
        Oops! The page you're looking for doesn't exist.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-200"
        >
          Go Back
        </button>

        <Link
          to="/"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
