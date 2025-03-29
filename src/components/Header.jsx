import logo from "../assets/svg/logo-tickitz.svg";
import MenuIcon from "../assets/svg/menu-right.svg";
import { useState } from "react";
import { Link } from "react-router"; // Perbaikan: gunakan react-router-dom

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src={logo} className="h-8 md:h-10" alt="Tickitz Logo" />
            </Link>
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden cursor-pointer" onClick={toggleNav}>
            <img src={MenuIcon} alt="Menu" className="h-8 w-8" />
          </div>

          {/* Center Navigation - Desktop */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/movie"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 transition-colors duration-200"
              >
                Movie
              </Link>
              <Link
                to="/seat-order"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 transition-colors duration-200"
              >
                Buy Ticket
              </Link>
            </div>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <Link to="/login">
              <button className="text-primary hover:bg-primary hover:text-white px-3 sm:px-4 py-1 sm:py-2 border border-primary rounded transition-colors duration-200 cursor-pointer text-sm sm:text-base">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-primary text-white hover:bg-white hover:text-primary hover:border-primary border border-transparent px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors duration-200 cursor-pointer text-sm sm:text-base">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav
          className={`${
            isNavVisible ? "flex" : "hidden"
          } md:hidden flex-col bg-white py-4 space-y-4 border-t mt-2`}
        >
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200"
            onClick={toggleNav}
          >
            Home
          </Link>
          <Link
            to="/movie"
            className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200"
            onClick={toggleNav}
          >
            Movie
          </Link>
          <Link
            to="/seat-order"
            className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200"
            onClick={toggleNav}
          >
            Buy Ticket
          </Link>

          <div className="flex flex-col space-y-3 pt-4 border-t">
            <Link to="/login" onClick={toggleNav}>
              <button className="w-full text-primary hover:bg-primary hover:text-white px-4 py-2 border border-primary rounded transition-colors duration-200 cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link to="/register" onClick={toggleNav}>
              <button className="w-full bg-primary text-white hover:bg-white hover:text-primary hover:border-primary border border-transparent px-4 py-2 rounded transition-colors duration-200 cursor-pointer">
                Sign Up
              </button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
