import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/svg/logo-tickitz.svg";
import menuIcon from "../assets/svg/menu-right.svg";

const MovieDetails = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <div className="bg-white-100 min-h-screen">
      {/* Header */}
      <header className="lg:flex lg:flex-rowt text-center lg:justify-between fixed top-0 left-0 w-full z-[1000] bg-white shadow-md p-4">
        <div className="flex justify-between items-center px-4 lg:px-8">
          <img src={logo} className="h-10 relative left-11" alt="Logo" />

          {/* Hamburger Icon (Mobile) */}
          <div
            className="pr-[36px] sm:hidden cursor-pointer"
            onClick={toggleNav}
          >
            <img src={menuIcon} alt="Menu" className="h-8 w-8" />
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
                to="/payment-info"
                className="text-gray-700 hover:text-blue-600"
              >
                Buy Ticket
              </Link>
            </li>
          </ul>

          {/* Button Container */}
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

      {/* Movie Details */}
      <div className="max-w-5xl mx-auto p-6 bg-white mt-6 shadow-md rounded-md">
        <div className="flex mt-23">
          <img
            src="../src/assets/png/spiderman.png"
            alt="Spider-Man: Homecoming"
            className="w-1/4 rounded-md"
          />
          <div className="ml-6">
            <h2 className="text-3xl font-bold">Spider-Man: Homecoming</h2>
            <div className="flex space-x-3 mt-2">
              <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded">
                Action
              </span>
              <span className="bg-gray-300 text-gray-800 px-3 py-1 rounded">
                Adventure
              </span>
            </div>
            <p className="mt-2 text-gray-700">
              <strong>Release Date:</strong> June 28, 2017
            </p>
            <p className="text-gray-700">
              <strong>Duration:</strong> 2 hours 13 minutes
            </p>
            <p className="text-gray-700">
              <strong>Directed by:</strong> Jon Watts
            </p>
            <p className="text-gray-700">
              <strong>Cast:</strong> Tom Holland, Michael Keaton, Robert Downey
              Jr.
            </p>
          </div>
        </div>

        {/* Synopsis */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Synopsis</h3>
          <p className="text-gray-700 mt-2">
            Thrilled by his experience with the Avengers, Peter returns home,
            where he lives with his Aunt May, under the watchful eye of his new
            mentor Tony Stark. Peter tries to fall back into his normal daily
            routine - distracted by thoughts of proving himself to be more than
            just your friendly neighborhood Spider-Man - but when the Vulture
            emerges as a new villain, everything that Peter holds most important
            will be threatened.
          </p>
        </div>

        {/* Booking Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Book Tickets</h3>
          <div className="flex space-x-4 mt-2">
            <input type="date" className="border px-4 py-2 rounded w-1/4" />
            <select className="border px-4 py-2 rounded w-1/4">
              <option>08:30 AM</option>
              <option>12:00 PM</option>
              <option>03:30 PM</option>
            </select>
            <select className="border px-4 py-2 rounded w-1/4">
              <option>Purwokerto</option>
              <option>Jakarta</option>
              <option>Surabaya</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded">
              Filter
            </button>
          </div>
        </div>

        {/* Cinema Selection */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Choose Cinema</h3>
          <div className="flex space-x-4 mt-4">
            <button className="border px-6 py-3 rounded bg-gray-200">
              ebu.id
            </button>
            <button className="border px-6 py-3 rounded bg-blue-600 text-white">
              hiflix
            </button>
            <button className="border px-6 py-3 rounded bg-gray-200">
              CineOne21
            </button>
            <button className="border px-6 py-3 rounded bg-gray-200">
              ebu.id
            </button>
          </div>
          <div className="flex space-x-2 mt-4">
            <button className="border px-4 py-2 rounded">1</button>
            <button className="border px-4 py-2 rounded">2</button>
            <button className="border px-4 py-2 rounded">3</button>
            <button className="border px-4 py-2 rounded">4</button>
          </div>
          <button className="bg-blue-600 text-white px-6 py-2 rounded mt-4">
            Book Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-12 lg:py-16 lg:px-10 lg:mr-[5.8%] lg:ml-[1.8%] ml-[10%]">
        <div className="flex flex-col lg:flex-row items-start lg:items-center lg:justify-between gap-10">
          <div className="max-w-[300px] lg:relative lg:bottom-3 lg:left-[50px]">
            <img
              src={"../src/assets/svg/logo-tickitz.svg"}
              alt="Tickitz Logo"
              className="w-[183.8px] h-[71.4px]"
            />
            <p className="text-gray-600 mt-4">
              Stop wasting time. Buy tickets conveniently, watch movies quietly.
            </p>
          </div>
          <div className="lg:relative lg:top-3.5">
            <h4 className="text-lg font-bold mb-4">Explore</h4>
            <ul className="text-gray-600 flex flex-row lg:flex lg:flex-col gap-7 lg:gap-0">
              <li className="mb-2">
                <a href="#" className="py-4">
                  Cinemas
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="py-4">
                  Movies List
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="py-4">
                  My Ticket
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className="py-4">
                  Notification
                </a>
              </li>
            </ul>
          </div>
          <div className="lg:relative lg:top-7">
            <h4 className="text-lg font-bold mb-4 ">Our Sponsor</h4>
            <div className="flex lg:flex-col flex-row gap-3">
              <img
                className="w-[121px] h-[45px]"
                src={"../src/assets/svg/ebv.svg"}
                alt="Ebu Sponsor"
              />
              <img
                className="w-[121px] h-[45px]"
                src={"../src/assets/svg/cine.svg"}
                alt="Cine Sponsor"
              />
              <img
                className="w-[121px] h-[45px]"
                src={"../src/assets/svg/hiflix.svg"}
                alt="Hif Sponsor"
              />
            </div>
          </div>
          <div className="lg: relative lg:top-7">
            <h4 className="text-lg font-bold mb-4">Follow Us</h4>
            <ul className="text-gray-600 flex flex-row lg:flex-col gap-10 lg:gap-0">
              <li className="flex mb-4">
                <img src="../src/assets/svg/fb.svg"></img>
                <a href="#" className="hidden lg:inline">
                  Tickitz Cinema id
                </a>
              </li>
              <li className="flex mb-4">
                <img src="../src/assets/svg/ig.svg"></img>
                <a href="#" className="hidden lg:inline">
                  tickitz.id
                </a>
              </li>
              <li className="flex mb-4">
                <img src="../src/assets/svg/x.svg"></img>
                <a href="#" className="hidden lg:inline">
                  tickitz.id
                </a>
              </li>
              <li className="flex mb-4">
                <img src="../src/assets/svg/youtobe.svg"></img>
                <a href="#" className="hidden lg:inline">
                  Tickitz Cinema id
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Copyright */}
      <footer className="text-center lg:py-6">
        <p className="text-gray-600">© 2020 Tickitz. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default MovieDetails;
