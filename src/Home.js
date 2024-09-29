import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-200 p-8">
      <header className="w-full my-8">
        <h1 className="text-5xl font-semibold text-gray-800 tracking-tight">Welcome to linnad.ee</h1>
        <p className="text-lg text-gray-600 mt-2">Explore the future.</p>
      </header>

      <div className="flex-grow">
        <Link to="/tallinn">
          <div className="block bg-slate-50 shadow-md rounded-lg p-6 max-w-lg transition duration-300 hover:bg-white hover:shadow-lg">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Tallinn</h2>
            <p className="text-md text-gray-600">Dive into detailed urban sketches and plans of Tallinn.</p>
          </div>
        </Link>
      </div>

      <footer className="mt-auto text-sm text-gray-500">
        <p>© {new Date().getFullYear()} linnad.ee. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
