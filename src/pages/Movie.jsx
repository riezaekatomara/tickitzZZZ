import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import MovieTicketing from "./Movie-Ticketing.jsx";
import logo from "../assets/svg/logo-tickitz.svg";
import menuIcon from "../assets/svg/menu-right.svg"; // Import komponen MovieTicketing

function Movie() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <div className="font-['Mulish'] text-gray-900">
      {/* Header */}
      <header className="lg:flex lg:flex-rowt text-center lg:justify-between fixed top-0 left-0 w-full z-[1000] bg-white shadow-md p-4">
        <div className="flex justify-between items-center px-4 lg:px-8">
          <img src={logo} className="h-10 relative left-11" alt="Logo" />

          {/* Hamburger Icon (Mobile) */}
          <div
            className="pr-[93px] sm:hidden cursor-pointer"
            onClick={toggleNav}
          >
            <img src={menuIcon} alt="Menu" className="h-8 w-8" />
          </div>
        </div>

        {/* Navbar */}
        <nav
          className={`${
            isNavVisible ? "flex" : "hidden"
          } flex-col right-4.5 sm:flex sm:flex-row absolute lg:pr-[85px] sm:relative top-full w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none p-4 sm:p-0`}
        >
          <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 lg:pr-[220px] lg:gap-8 lg:text-center">
            <li>
              <Link to="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <Link to="/movie" className="text-gray-700 hover:text-blue-600">
                Movie
              </Link>
            </li>
            <li>
              <Link
                to="/payment-info"
                className="text-gray-700 hover:text-blue-600"
              >
                Buy Ticket
              </Link>
            </li>
          </ul>

          {/* Button Nav */}
          <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 space-y-2 sm:space-y-0 sm:space-x-4 lg:relative lg:left-[16px]">
            <Link to="/login">
              <button
                onClick={() => navigate("/login")}
                className="text-primary px-4 py-2 border rounded cursor-pointer"
              >
                Sign In
              </button>
            </Link>
            <Link to="#">
              <button
                onClick={() => navigate("#")}
                className="bg-primary text-white px-4 py-2 rounded cursor-pointer"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Render MovieTicketing */}
      <MovieTicketing />
    </div>
  );
}

export default Movie;
