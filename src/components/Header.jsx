import logo from "../assets/svg/logo-tickitz.svg";
import MenuIcon from "../assets/svg/menu-right.svg";
import { useState } from "react";
import { Link } from "react-router";
import "../styles/button-animations.css";

function Header() {
  // State untuk mengontrol visibilitas navigasi mobile
  const [isNavVisible, setIsNavVisible] = useState(false);

  // Fungsi untuk toggle menu navigasi pada tampilan mobile
  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  return (
    // Header dengan posisi sticky dan bayangan
    <header
      className="sticky top-0 z-50 bg-white shadow-md w-screen left-0 right-0"
      style={{ margin: 0, width: "100vw", position: "fixed" }}
    >
      <div
        className="w-full px-[11%] sm:px-[19%] md:px-28 lg:px-37 mx-auto"
        style={{ maxWidth: "100%" }}
      >
        <div className="flex justify-between items-center h-16">
          {/* Bagian Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                src={logo}
                className="h-8 md:h-10 lg:relative lg:right-5 scale-rotate-on-hover"
                alt="Tickitz Logo"
              />
            </Link>
          </div>

          {/* Ikon Menu Hamburger (Tampilan Mobile) */}
          <div
            className="md:hidden cursor-pointer bounce-on-hover"
            onClick={toggleNav}
          >
            <img src={MenuIcon} alt="Menu" className="h-8 w-8" />
          </div>

          {/* Navigasi Tengah - Tampilan Desktop */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-4 md:space-x-6 lg:space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 transition-colors duration-200 border-fill-on-hover"
              >
                Home
              </Link>
              <Link
                to="/movie"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 transition-colors duration-200 border-fill-on-hover"
              >
                Movie
              </Link>
              <Link
                to="/movie"
                className="text-gray-700 hover:text-blue-600 font-medium px-2 py-1 transition-colors duration-200 border-fill-on-hover"
              >
                Buy Ticket
              </Link>
            </div>
          </nav>

          {/* Tombol Autentikasi - Tampilan Desktop */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-4">
            <Link to="/login">
              <button className="text-primary hover:bg-primary hover:text-white px-3 sm:px-4 py-1 sm:py-2 border border-primary rounded transition-colors duration-200 cursor-pointer text-sm sm:text-base shine-on-hover">
                Sign In
              </button>
            </Link>
            <Link to="/register">
              <button className="bg-primary text-white hover:bg-white hover:text-primary hover:border-primary border border-transparent px-3 sm:px-4 py-1 sm:py-2 rounded transition-colors duration-200 cursor-pointer text-sm sm:text-base pulse-on-hover">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Navigasi Mobile - Muncul saat tombol hamburger diklik */}
        <nav
          className={`${
            isNavVisible ? "flex" : "hidden"
          } md:hidden flex-col bg-white py-4 space-y-4 border-t mt-2`}
        >
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200 border-fill-on-hover"
            onClick={toggleNav}
          >
            Home
          </Link>
          <Link
            to="/movie"
            className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200 border-fill-on-hover"
            onClick={toggleNav}
          >
            Movie
          </Link>
          <Link
            to="/movie"
            className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 transition-colors duration-200 border-fill-on-hover"
            onClick={toggleNav}
          >
            Buy Ticket
          </Link>

          {/* Tombol Autentikasi - Tampilan Mobile */}
          <div className="flex flex-col space-y-3 pt-4 border-t">
            <Link to="/login" onClick={toggleNav}>
              <button className="w-full text-primary hover:bg-primary hover:text-white px-4 py-2 border border-primary rounded transition-colors duration-200 cursor-pointer shine-on-hover">
                Sign In
              </button>
            </Link>
            <Link to="/register" onClick={toggleNav}>
              <button className="w-full bg-primary text-white hover:bg-white hover:text-primary hover:border-primary border border-transparent px-4 py-2 rounded transition-colors duration-200 cursor-pointer pulse-on-hover">
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
