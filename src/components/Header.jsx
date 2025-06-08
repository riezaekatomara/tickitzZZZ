import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/images/svg/logo-tickitz.svg";
import MenuIcon from "../assets/images/svg/menu-right.svg";
import CloseIcon from "../assets/images/svg/x.svg";
import { FaSearch, FaUser } from "react-icons/fa";

function Header() {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={logo} 
              className="h-8 md:h-10 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3" 
              alt="Tickitz Logo" 
            />
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button className="text-gray-700 hover:text-blue-600 p-2">
              <FaSearch className="text-lg" />
            </button>
            <button 
              onClick={toggleNav}
              className="text-gray-700 hover:text-blue-600 p-2"
            >
              {isNavVisible ? (
                <img src={CloseIcon} alt="Close" className="h-6 w-6" />
              ) : (
                <img src={MenuIcon} alt="Menu" className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-1">
              {[
                { path: "/", label: "Home" },
                { path: "/movie", label: "Movies" },
                { path: "/cinemas", label: "Cinemas" },
                { path: "/promotions", label: "Promotions" }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 font-medium transition-all duration-300 relative group ${
                    location.pathname === item.path
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {item.label}
                  <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 transition-all duration-300 ${
                    location.pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <button className="p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <FaSearch className="text-lg" />
            </button>
            <Link to="/login">
              <button className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 flex items-center gap-2 group">
                <FaUser className="text-sm" />
                <span>Sign In</span>
                <span className="w-0 h-0.5 bg-blue-600 absolute bottom-1 left-4 group-hover:w-6 transition-all duration-300"></span>
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                Sign Up
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`${isNavVisible ? "block" : "hidden"} md:hidden bg-white shadow-xl rounded-lg mt-2 py-4`}>
          <div className="flex flex-col space-y-2 px-4">
            {[
              { path: "/", label: "Home" },
              { path: "/movie", label: "Movies" },
              { path: "/cinemas", label: "Cinemas" },
              { path: "/promotions", label: "Promotions" }
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-3 font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={toggleNav}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-4 px-4">
            <Link to="/login" onClick={toggleNav}>
              <button className="w-full mb-3 px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium flex items-center justify-center gap-2">
                <FaUser className="text-sm" />
                Sign In
              </button>
            </Link>
            <Link to="/register" onClick={toggleNav}>
              <button className="w-full px-4 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-300 font-medium">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;