import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaArrowRight } from "react-icons/fa";
import Logo from "../assets/images/svg/logo-tickitz.svg";
import Ebv from "../assets/images/svg/ebv.svg";
import Cine from "../assets/images/svg/cine.svg";
import Hiflix from "../assets/images/svg/hiflix.svg";

function Footer() {
  const socialLinks = [
    { icon: FaFacebookF, label: "Tickitz Cinema id", url: "#" },
    { icon: FaInstagram, label: "tickitz.id", url: "#" },
    { icon: FaTwitter, label: "tickitz.id", url: "#" },
    { icon: FaYoutube, label: "Tickitz Cinema id", url: "#" }
  ];

  const sponsors = [Ebv, Cine, Hiflix];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <img 
                src={Logo} 
                alt="Tickitz Logo" 
                className="h-10 transition-transform duration-300 hover:scale-105 hover:rotate-3" 
              />
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Stop waiting in line. Buy tickets conveniently, watch movies quietly.
            </p>
            <div className="pt-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Stay Connected
              </h3>
              <div className="flex space-x-4">
                {socialLinks.slice(0, 4).map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 hover:text-white hover:bg-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
                    aria-label={social.label}
                  >
                    <social.icon className="text-lg" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Explore</h3>
            <ul className="space-y-3">
              {["Cinemas", "Movies List", "My Ticket", "Notification"].map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-300 group"
                  >
                    <FaArrowRight className="mr-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span>{item}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Sponsor */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Our Sponsor</h3>
            <div className="space-y-6">
              {sponsors.map((sponsor, index) => (
                <div 
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center justify-center"
                >
                  <img 
                    src={sponsor} 
                    alt={`Sponsor ${index + 1}`} 
                    className="h-6 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300" 
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Newsletter</h3>
            <p className="text-gray-600 text-sm">
              Subscribe to our newsletter for the latest updates and promotions.
            </p>
            <form className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                  <FaArrowRight className="text-sm" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm text-gray-500 mb-4 md:mb-0">
            © {new Date().getFullYear()} Tickitz. All Rights Reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300">
              Terms of Use
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;