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
    <div>
      <footer className="bg-white py-12 pl-21">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <img src={Logo}></img>
              <p className="text-sm text-gray-500">
                Stop waiting in line. Buy tickets conveniently, watch movies
                quietly.
              </p>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Explore</h3>
              <ul className="space-y-2 text-gray-500">
                <li>Cinemas</li>
                <li>Movies List</li>
                <li>My Ticket</li>
                <li>Notification</li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Our Sponsor</h3>
              <div className="space-y-4">
                <img src={Ebv}></img>
                <img src={Cine}></img>
                <img src={Hiflix}></img>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Follow us</h3>
              <ul className="space-y-2 text-gray-500">
                <li className="flex items-center gap-2">
                  <img src={Fb}></img>
                  Tickitz Cinema id
                </li>
                <li className="flex items-center gap-2">
                  <img src={Ig}></img>
                  tickitz.id
                </li>
                <li className="flex items-center gap-2">
                  <img src={X}></img>
                  tickitz.id
                </li>
                <li className="flex items-center gap-2">
                  <img src={Youtobe}></img>
                  Tickitz Cinema id
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center text-sm text-gray-500">
            © 2020 Tickitz. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
