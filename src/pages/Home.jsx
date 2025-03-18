import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import centangS from "../assets/svg/centang-s.svg";
import centang from "../assets/svg/centang-group.svg";
import message from "../assets/svg/message-group.svg";
import logo from "../assets/svg/logo-tickitz.svg";
import menuIcon from "../assets/svg/menu-right.svg";

const Home = () => {
  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;
  const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`;
  const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`;

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genres, setGenres] = useState({});

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(GENRE_LIST_URL);
        const data = await response.json();
        const genresMap = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});
        setGenres(genresMap);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    // Fetch movies
    const fetchMovies = async () => {
      try {
        const popularResponse = await fetch(POPULAR_MOVIES_URL);
        const popularData = await popularResponse.json();
        setPopularMovies(popularData.results.slice(0, 8));

        const upcomingResponse = await fetch(UPCOMING_MOVIES_URL);
        const upcomingData = await upcomingResponse.json();
        setUpcomingMovies(upcomingData.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchGenres();
    fetchMovies();
  }, []);

  const upcomingMoviesRef = useRef(null);

  const scrollLeft = () => {
    if (upcomingMoviesRef.current) {
      upcomingMoviesRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (upcomingMoviesRef.current) {
      upcomingMoviesRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const [isNavVisible, setIsNavVisible] = useState(false);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  return (
    <div className="bg-white">
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

      {/* Hero Section */}
      <section className="pt-13 px-8 flex flex-col md:flex-row md:justify-between items-center mt-20 mr-[5%] ml-[5%]">
        <div className="relative bottom-12 md:w-1/2 text-center md:text-left ">
          <h2 className="text-xl text-blue-600 font-semibold leading-[50px]">
            MOVIE TICKET PURCHASES #1 IN INDONESIA
          </h2>
          <h1 className="text-4xl mt-2 leading-[50px]">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
          <p className="text-gray-500 mt-2 leading-[50px]">
            Sign up and get the ticket with a lot of discount
          </p>
        </div>

        {/* Gambar Dinamis dari API TMDB */}
        <div className="grid grid-cols-2 gap-3 mt-8 md:mt-0 text-center">
          {popularMovies.slice(4, 8).map((movie, index) => (
            <img
              key={movie.id}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className={`w-[185px] overflow-hidden
                ${
                  index === 0 || index === 1
                    ? "rounded-t-[20px]"
                    : "rounded-b-[20px]"
                }
                ${
                  index === 1 || index === 2 ? "h-[250px]" : "h-[138px]"
                } object-cover rounded-${index < 2 ? "t" : "b"}-[20px] ${
                index === 2 ? "relative bottom-28" : ""
              }`}
            />
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white mr-[8%] ml-[13%] lg:mr-[8%] lg:ml-[5%]">
        <h2 className="text-primary text-sm font-semibold tracking-wider mb-2 lg:relative lg:left-[30px]">
          WHY CHOOSE US
        </h2>
        <h3 className="text-3xl font-bold mb-10 lg:relative lg:left-[30px]">
          Unleashing the Ultimate Movie Experience
        </h3>
        <div className="flex justify-between gap-10 lg:gap-4 relative right-2.5 lg:right-0 lg:ml-[35px] lg:mr-[35px]">
          <div className="text-center">
            <img
              src={centangS}
              className="mx-auto mb-5"
              alt="Guaranteed Icon"
            />
            <h4 className="text-xl font-bold mb-4">Guaranteed</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              finibus, libero ut sagittis a, lorem ipsum es onsectetur.
            </p>
          </div>
          <div className="text-center">
            <img src={centang} className="mx-auto mb-5" alt="Affordable Icon" />
            <h4 className="text-xl font-bold mb-4">Affordable</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              finibus, libero ut sagittis a, lorem ipsum es onsectetur.
            </p>
          </div>
          <div className="text-center">
            <img src={message} className="mx-auto mb-5" alt="Support Icon" />
            <h4 className="text-xl font-bold mb-4">24/7 Customer Support</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              finibus, libero ut sagittis a, lorem ipsum es onsectetur.
            </p>
          </div>
        </div>
      </section>

      {/* Movies Section */}
      <section className="py-16 px-4 sm:px-8">
        <h2 className="text-2xl font-bold text-center lg:text-left lg:relative lg:left-[60px]">
          Exciting Movies That Should Be Watched Today
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8 lg:ml-[60px] lg:mr-[67px]">
          {popularMovies.slice(0, 4).map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative group">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[250px] sm:h-[315px] object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={"/movie-details"}>
                    <button className=" cursor-pointer mb-4 px-4 py-2 bg-transparent text-white border border-white rounded w-[150px] hover:bg-white hover:text-black transition-colors duration-300">
                      Details
                    </button>
                  </Link>
                  <Link to={"/payment-info"}>
                    <button className="cursor-pointer px-4 py-2 bg-primary text-white rounded w-[150px] hover:bg-blue-700 transition-colors duration-300">
                      Buy Ticket
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-semibold">{movie.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre_ids.map((id) => (
                    <p
                      key={id}
                      className="text-gray-500 text-sm px-2 py-1 bg-[#f5f5f9] rounded-full"
                    >
                      {genres[id]}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Link to="/movie">
        <div className="flex flex-row justify-center m-8 mt-0 cursor-pointer">
          <p className="text-primary">View All&nbsp;</p>
          <img src="../src/assets/svg/arrow.svg"></img>
        </div>
      </Link>

      {/* Upcoming Movies */}
      <section className="py-16 px-4 sm:px-8 lg:relative lg:ml-[60px] lg:mr-[67px]">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-center sm:text-left">
            <h2 className="text-xl text-primary mb-2">Upcoming Movies</h2>
            <h2 className="text-2xl font-bold">Exciting Movie Coming Soon</h2>
          </div>
          <div className="hidden sm:flex flex-row space-x-4">
            <button
              onClick={scrollLeft}
              className="p-2 bg-gray-300 rounded-full"
            >
              ◀
            </button>
            <button
              onClick={scrollRight}
              className="p-2 bg-gray-300 rounded-full"
            >
              ▶
            </button>
          </div>
        </div>

        {/* Scrollable Movie List */}
        <div
          ref={upcomingMoviesRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory space-x-4 mt-8 scrollbar-hide gap-[20.9px]"
        >
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="snap-start flex-shrink-0 w-[75%] sm:w-[60%] md:w-60 bg-white shadow-lg rounded-lg overflow-hidden group"
            >
              <div className="relative">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-[250px] sm:h-[300px] object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={"/movie-details"}>
                    <button className="cursor-pointer mb-4 px-4 py-2 bg-transparent text-white border border-white rounded w-[150px] hover:bg-white hover:text-black transition-colors duration-300">
                      Details
                    </button>
                  </Link>
                  <Link to={"/payment-info"}>
                    <button className="cursor-pointer px-4 py-2 bg-primary text-white rounded w-[150px] hover:bg-blue-700 transition-colors duration-300">
                      Buy Ticket
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">{movie.title}</h3>
                <p className="text-primary font-bold text-sm">
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie.genre_ids.map((id) => (
                    <p
                      key={id}
                      className="text-gray-500 text-sm px-2 py-1 bg-[#f5f5f9] rounded-full"
                    >
                      {genres[id]}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary text-white text-center rounded-lg py-15 lg:py-16 px-10 mx-10 lg:mr-[8%] lg:ml-[8%]">
        <h3 className="text-2xl font-bold mb-8">Subscribe to our newsletter</h3>
        <form className="flex lg:flex-row flex-col gap-4 justify-center">
          <div className="text-center">
            <input
              type="text"
              placeholder="First name"
              className="w-60 h-12 px-4 border rounded-lg bg-transparent bg-opacity-50 lg:mr-3.5 mb-4 lg:mb-0"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-60 h-12 px-4 border rounded-lg bg-transparent bg-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-primary lg:px-6 py-3 rounded-lg font-semibold mr-9.5 ml-9 lg:ml-0"
          >
            Subscribe Now
          </button>
        </form>
      </section>

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

export default Home;
