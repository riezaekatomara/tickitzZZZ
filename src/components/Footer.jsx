import React from "react";
import Logo from "../assets/svg/logo-tickitz.svg";
import Ebv from "../assets/svg/ebv.svg";
import Cine from "../assets/svg/cine.svg";
import Hiflix from "../assets/svg/hiflix.svg";
import Fb from "../assets/svg/fb.svg";
import Ig from "../assets/svg/ig.svg";
import X from "../assets/svg/x.svg";
import Youtobe from "../assets/svg/youtobe.svg";

function Footer() {
  return (
    <footer className="bg-white py-8 md:py-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo and Description */}
          <div className="flex flex-col items-start">
            <img src={Logo} alt="Tickitz Logo" className="h-10 mb-4" />
            <p className="text-sm text-gray-500 max-w-xs">
              Stop waiting in line. Buy tickets conveniently, watch movies
              quietly.
            </p>
          </div>

          {/* Explore Links */}
          <div className="flex flex-col items-start">
            <h3 className="mb-4 font-semibold text-lg">Explore</h3>
            <ul className="space-y-3 text-gray-500">
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">
                Cinemas
              </li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">
                Movies List
              </li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">
                My Ticket
              </li>
              <li className="hover:text-primary transition-colors duration-200 cursor-pointer">
                Notification
              </li>
            </ul>
          </div>

          {/* Sponsors */}
          <div className="flex flex-col items-start">
            <h3 className="mb-4 font-semibold text-lg">Our Sponsor</h3>
            <div className="flex flex-col space-y-4 sm:space-y-6">
              <div className="transform hover:scale-105 transition-transform duration-200">
                <img src={Ebv} alt="EBV" className="h-6 w-auto" />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-200">
                <img src={Cine} alt="Cine" className="h-6 w-auto" />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-200">
                <img src={Hiflix} alt="Hiflix" className="h-6 w-auto" />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="flex flex-col items-start">
            <h3 className="mb-4 font-semibold text-lg">Follow us</h3>
            <ul className="space-y-3 sm:space-y-4 text-gray-500">
              <li className="flex items-center gap-3 hover:text-primary transition-colors duration-200 cursor-pointer group">
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50">
                  <img src={Fb} alt="Facebook" className="h-5 w-5" />
                </div>
                <span className="text-sm">Tickitz Cinema id</span>
              </li>
              <li className="flex items-center gap-3 hover:text-primary transition-colors duration-200 cursor-pointer group">
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50">
                  <img src={Ig} alt="Instagram" className="h-5 w-5" />
                </div>
                <span className="text-sm">tickitz.id</span>
              </li>
              <li className="flex items-center gap-3 hover:text-primary transition-colors duration-200 cursor-pointer group">
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50">
                  <img src={X} alt="X/Twitter" className="h-5 w-5" />
                </div>
                <span className="text-sm">tickitz.id</span>
              </li>
              <li className="flex items-center gap-3 hover:text-primary transition-colors duration-200 cursor-pointer group">
                <div className="bg-gray-100 p-2 rounded-full group-hover:bg-blue-50">
                  <img src={Youtobe} alt="YouTube" className="h-5 w-5" />
                </div>
                <span className="text-sm">Tickitz Cinema id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 sm:mt-12 text-center sm:text-left text-sm text-gray-500 border-t border-gray-200 pt-6 sm:pt-8">
          © 2020 Tickitz. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
