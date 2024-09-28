import React from "react";
import { Link } from "react-router-dom";
import PageTitle from "./PageTitle";

const Main = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center">
      <PageTitle title="Linnad.ee" />

      <div className="text-center p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Eskiisid</h1>
        <p className="text-lg text-gray-600 mb-8"></p>
        <Link
          to="/tallinn"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Tallinn
        </Link>
      </div>
    </div>
  );
};

export default Main;
