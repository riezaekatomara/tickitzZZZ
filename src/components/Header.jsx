import logo from "../assets/svg/logo-tickitz.svg";
import MenuIcon from "../assets/svg/menu-right.svg";
import { useState } from "react";
import { Link } from "react-router";

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <header className="lg:flex lg:flex-row text-center lg:justify-between sticky top-0 z-2 bg-white shadow-md p-4">
      <div className="flex justify-between items-center px-4 lg:px-8">
        <img src={logo} className="h-10 relative left-11" alt="Logo" />

        {/* Hamburger Icon (Mobile) */}
        <div className="pr-[36px] sm:hidden cursor-pointer" onClick={toggleNav}>
          <img src={MenuIcon} alt="Menu" className="h-8 w-8" />
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`${
          isNavVisible ? "flex" : "hidden"
        } flex-col sm:flex sm:flex-row absolute lg:pr-[85px] sm:relative top-full w-full sm:w-auto bg-white sm:bg-transparent shadow-md sm:shadow-none py-4 sm:p-0`}
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
              to="/seat-order"
              className="text-gray-700 hover:text-blue-600"
            >
              Buy Ticket
            </Link>
          </li>
        </ul>

        {/* Button Container */}
        <div className="flex flex-col sm:flex-row mt-4 sm:mt-0 mr-3 space-y-2 sm:space-y-0 sm:space-x-4 lg:relative lg:left-[16px]">
          <Link to="/login">
            <button
              onClick={() => navigate("/login")}
              className="text-primary hover:bg-primary hover:text-white px-4 py-2 border rounded cursor-pointer"
            >
              Sign In
            </button>
          </Link>
          <Link to="/register">
            <button
              onClick={() => navigate("/register")}
              className="bg-primary text-white hover:bg-white hover:text-primary px-4 py-2 rounded cursor-pointer"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
