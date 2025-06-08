import logo from "../assets/images/svg/logo-tickitz.svg";
import MenuIcon from "../assets/images/svg/menu-right.svg";
import { useState } from "react";
import { Link } from "react-router";
import Navi from "../assets/images/svg/navigation.svg";
import Search from "../assets/images/svg/search.svg";

function HeaderProfile() {
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

        <div className="flex items-center space-x-4">
          <div className="relative">
            <button className="cursor-pointer flex items-center text-gray-700">
              Location{" "}
              <span className="ml-1">
                <img src={Navi} className="cursor-pointer"></img>
              </span>
            </button>
          </div>
          <button className="text-gray-700">
            <img src={Search} className="cursor-pointer"></img>
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-200">
            <img
              src="../../src/assets/png/rieza.png"
              alt="User profile"
              className="object-cover cursor-pointer"
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderProfile;
