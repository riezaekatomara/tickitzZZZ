import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { selectMovie } from "../redux/slices/orderSlice.js";
import centangS from "../assets/svg/centang-s.svg";
import centang from "../assets/svg/centang-group.svg";
import message from "../assets/svg/message-group.svg";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../styles/button-animations.css";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order);
  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=1&api_key=${API_KEY}`;
  const UPCOMING_MOVIES_URL = `${BASE_URL}/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`;
  const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`;

  const [popularMovies, setPopularMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const upcomingMoviesRef = useRef(null);

  // Fungsi untuk menyimpan movie ke Redux dan navigasi
  const handleMovieSelection = (movie) => {
    const movieGenres = movie.genre_ids.map((id) => genres[id] || "Unknown");

    dispatch(
      selectMovie({
        id: movie.id,
        title: movie.title,
        poster: movie.poster_path,
        backdrop: movie.backdrop_path,
        genres: movieGenres,
        overview: movie.overview,
        releaseDate: movie.release_date,
      })
    );

    return {
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster_path,
      movieBackdrop: movie.backdrop_path,
      movieGenres: movieGenres,
      movieOverview: movie.overview,
      movieReleaseDate: movie.release_date,
    };
  };

  // Fungsi untuk navigasi ke detail film
  const handleMovieDetails = (movie) => {
    const state = handleMovieSelection(movie);
    navigate(`/movie-details/${movie.id}`, { state });
  };

  // Fungsi untuk scroll carousel
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

  // Mengambil data genre dan film
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

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="w-full mt-12 px-4 md:px-8 pt-8 md:pt-16 flex flex-col md:flex-row md:justify-between items-center mx-auto">
        <div className="w-full md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h2 className="text-lg md:text-xl text-blue-600 font-semibold mb-3 md:mb-4">
            MOVIE TICKET PURCHASES #1 IN INDONESIA
          </h2>
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 leading-tight">
            Experience the Magic of Cinema: Book Your Tickets Today
          </h1>
          <p className="text-gray-500 text-base md:text-lg">
            Sign up and get the ticket with a lot of discount
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 md:gap-3 w-full max-w-md mx-auto md:mx-0">
          {popularMovies.slice(4, 8).map((movie, index) => (
            <div
              key={movie.id}
              className={`overflow-hidden ${
                index === 0 || index === 1
                  ? "rounded-t-[20px]"
                  : "rounded-b-[20px]"
              } ${
                index === 2
                  ? "relative bottom-20 md:bottom-8 transform md:-translate-y-12"
                  : ""
              }`}
              style={{
                height: index === 1 || index === 2 ? "250px" : "170px",
              }}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full pb-12 px-4 md:px-8 mx-auto">
        <div className="text-center md:text-left md:pl-4">
          <h2 className="text-primary text-sm font-semibold tracking-wider mb-2">
            WHY CHOOSE US
          </h2>
          <h3 className="text-2xl md:text-3xl font-bold mb-10">
            Unleashing the Ultimate Movie Experience
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div className="text-center">
            <img
              src={centangS}
              className="mx-auto mb-5 h-12 w-auto"
              alt="Guaranteed Icon"
            />
            <h4 className="text-xl font-bold mb-4">Guaranteed</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="text-center">
            <img
              src={centang}
              className="mx-auto mb-5 h-12 w-auto"
              alt="Affordable Icon"
            />
            <h4 className="text-xl font-bold mb-4">Affordable</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
          <div className="text-center">
            <img
              src={message}
              className="mx-auto mb-5 h-12 w-auto"
              alt="Support Icon"
            />
            <h4 className="text-xl font-bold mb-4">24/7 Customer Support</h4>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Movies Section */}
      <section className="w-full py-12 px-4 md:px-8 mx-auto">
        <h2 className="text-2xl font-bold text-center md:text-left mb-8">
          Exciting Movies That Should Be Watched Today
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularMovies.slice(0, 4).map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
            >
              <div
                className="relative w-full"
                style={{ paddingBottom: "150%" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleMovieDetails(movie)}
                    className="cursor-pointer mb-4 px-4 py-2 bg-transparent text-white border border-white rounded w-32 hover:bg-white hover:text-black transition-colors duration-300 scale-rotate-on-hover"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleMovieDetails(movie)}
                    className="cursor-pointer px-4 py-2 bg-primary text-white rounded w-32 transition-colors duration-300 gradient-shift-on-hover"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-semibold">{movie.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genre_ids.slice(0, 3).map((id) => (
                    <p
                      key={id}
                      className="text-gray-500 text-xs md:text-sm px-2 py-1 bg-[#f5f5f9] rounded-full"
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

      {/* View All Button */}
      <div className="flex justify-center my-8">
        <button
          onClick={() => navigate("/movie")}
          className="flex items-center text-primary hover:underline text-slide-on-hover"
        >
          <span>View All</span>
          <img src="/svg/arrow.svg" alt="Arrow" className="ml-2" />
        </button>
      </div>

      {/* Upcoming Movies Section */}
      <section className="w-full py-12 px-4 md:px-8 mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <div className="text-center sm:text-left mb-4 sm:mb-0">
            <h2 className="text-lg text-primary mb-2">Upcoming Movies</h2>
            <h2 className="text-2xl font-bold">Exciting Movie Coming Soon</h2>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={scrollLeft}
              className="cursor-pointer p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition bounce-on-hover"
              aria-label="Scroll left"
            >
              ◀
            </button>
            <button
              onClick={scrollRight}
              className="cursor-pointer p-2 bg-gray-300 rounded-full hover:bg-gray-400 transition bounce-on-hover"
              aria-label="Scroll right"
            >
              ▶
            </button>
          </div>
        </div>

        <div
          ref={upcomingMoviesRef}
          className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-6 pb-4 hide-scrollbar"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {upcomingMovies.map((movie) => (
            <div
              key={movie.id}
              className="snap-start flex-shrink-0 w-64 md:w-58.5 bg-white shadow-lg rounded-lg overflow-hidden group"
            >
              <div
                className="relative w-full"
                style={{ paddingBottom: "150%" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleMovieDetails(movie)}
                    className="cursor-pointer mb-4 px-4 py-2 bg-transparent text-white border border-white rounded w-32 hover:bg-white hover:text-black transition-colors duration-300 scale-rotate-on-hover"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleMovieDetails(movie)}
                    className="cursor-pointer px-4 py-2 bg-primary text-white rounded w-32 hover:bg-blue-700 transition-colors duration-300 pulse-on-hover"
                  >
                    Buy Ticket
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold truncate">{movie.title}</h3>
                <p className="text-primary font-bold text-sm">
                  {new Date(movie.release_date).toLocaleDateString()}
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {movie.genre_ids.slice(0, 2).map((id) => (
                    <p
                      key={id}
                      className="text-gray-500 text-xs px-2 py-1 bg-[#f5f5f9] rounded-full"
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
      <section className="bg-primary text-white text-center rounded-lg py-12 px-4 sm:px-8 mx-4 sm:mx-8 my-12">
        <h3 className="text-2xl font-bold mb-8">Subscribe to our newsletter</h3>
        <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <input
              type="text"
              placeholder="First name"
              className="placeholder-white w-full h-12 px-4 border rounded-lg bg-transparent bg-opacity-50"
            />
            <input
              type="email"
              placeholder="Email address"
              className="placeholder-white w-full h-12 px-4 border rounded-lg bg-transparent bg-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-white text-white hover:bg-primary hover:text-white px-6 py-3 rounded-lg font-semibold gradient-shift-on-hover"
          >
            Subscribe Now
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
