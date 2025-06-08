import { useNavigate } from "react-router-dom";
import { FaPlay, FaStar, FaTicketAlt } from "react-icons/fa";
import john3wick from "../assets/images/png/john-wick.png";
import lionKing from "../assets/images/png/lion-king.png";
import spiderMan from "../assets/images/png/spiderman.png";
import roblox from "../assets/images/png/roblox.png";

const HeroSection = () => {
  const navigate = useNavigate();

  const moviePosters = [
    { src: john3wick, title: "John Wick 3", rating: 8.5 },
    { src: lionKing, title: "Lion King", rating: 9.2 },
    { src: spiderMan, title: "Spider-Man", rating: 8.8 },
    { src: roblox, title: "Roblox Movie", rating: 7.9 }
  ];

  return (
    <section className="mt-17 relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-2xl animate-ping"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-300 font-semibold text-sm uppercase tracking-wider animate-fadeInUp">
              <FaStar className="text-yellow-400" />
              #1 Movie Platform in Indonesia
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight animate-fadeInUp delay-200">
                Experience the
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Magic of Cinema
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light animate-fadeInUp delay-300">
                Book Your Tickets Today
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-400 max-w-xl mx-auto lg:mx-0 animate-fadeInUp delay-400">
              Discover thousands of movies, get exclusive discounts, and enjoy the ultimate cinema experience with premium sound and visuals.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fadeInUp delay-500">
              <button 
                onClick={() => navigate("/movie")}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center justify-center gap-3">
                  <FaPlay className="text-sm group-hover:scale-110 transition-transform" />
                  Browse Movies
                </span>
              </button>
              <button 
                onClick={() => navigate("/register")}
                className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-3">
                  <FaTicketAlt className="text-sm group-hover:scale-110 transition-transform" />
                  Get Discounts
                </span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 animate-fadeInUp delay-600">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">1000+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Movies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">50K+</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Happy Users</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-1">4.9★</div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Movie Grid */}
          <div className="relative animate-fadeInRight delay-700">
            <div className="grid grid-cols-2 grid-rows-3 gap-4 h-[600px] lg:h-[700px]">
              
              {/* John Wick - Top Left */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div
                  className="h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${moviePosters[0].src})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-lg font-bold">{moviePosters[0].title}</div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FaStar className="text-xs" />
                        <span className="text-sm">{moviePosters[0].rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lion King - Top Right (spans 2 rows) */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 row-span-2">
                <div
                  className="h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${moviePosters[1].src})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-lg font-bold">{moviePosters[1].title}</div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FaStar className="text-xs" />
                        <span className="text-sm">{moviePosters[1].rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spider-Man - Middle Left (spans 2 rows) */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 row-span-2">
                <div
                  className="h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${moviePosters[2].src})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-lg font-bold">{moviePosters[2].title}</div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FaStar className="text-xs" />
                        <span className="text-sm">{moviePosters[2].rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Roblox - Bottom Right */}
              <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2">
                <div
                  className="h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${moviePosters[3].src})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 text-white">
                      <div className="text-lg font-bold">{moviePosters[3].title}</div>
                      <div className="flex items-center gap-1 text-yellow-400">
                        <FaStar className="text-xs" />
                        <span className="text-sm">{moviePosters[3].rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400/20 rounded-full blur-xl animate-bounce delay-1000"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-2000"></div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;