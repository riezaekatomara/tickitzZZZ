import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer.jsx";

function MovieTicketing() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [activeGenre, setActiveGenre] = useState("Thriller");

  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=${activePage}&api_key=${API_KEY}`;
  const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`;

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(GENRE_LIST_URL, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        const data = await response.json();

        const genresMap = data.genres.reduce((acc, genre) => {
          acc[genre.id] = genre.name;
          return acc;
        }, {});

        setGenres(genresMap);
      } catch (error) {
        console.error("Error fetching genre list:", error);
      }
    };

    fetchGenres();
  }, [GENRE_LIST_URL]);

  useEffect(() => {
    const getMovieList = async () => {
      try {
        const response = await fetch(POPULAR_MOVIES_URL, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getMovieList();
  }, [POPULAR_MOVIES_URL]);

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const genreButtons = [
    "Thriller",
    "Horror",
    "Romantic",
    "Adventure",
    "Sci-Fi",
  ];

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="relative w-full h-[300px] sm:h-[462px]">
          <div className="absolute top-0 left-0 w-screen h-full bg-[url('../public/png/bg-avanger.png')] bg-cover bg-center bg-no-repeat brightness-50"></div>
          <div className="relative top-[100px] sm:top-[150px] flex flex-col text-white text-center sm:text-left ml-0 sm:ml-24">
            <p className="text-[16px] sm:text-[18px] leading-[30px] sm:leading-[50px]">
              List Movie of the Week
            </p>
            <h1 className="text-[28px] sm:text-[48px] mb-5">
              Experience the Magic of
              <br />
              Cinema: Book Your Ticket
              <br />
              Today
            </h1>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="flex flex-col sm:flex-row justify-between items-center px-[5%] py-5">
          <div className="flex flex-col mb-4 sm:mb-0">
            <p className="relative top-5 left-0.5 text-[15px]">Cari event</p>
            <img
              src="../src/assets/svg/search2.svg"
              className="w-[24px] h-[24px] relative top-8 left-[8px]"
            />
            <input
              type="text"
              placeholder={`           New Born Expert`}
              className="p-2 w-64 border border-gray-300 rounded placeholder:text-[12px]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p>Filter</p>
            <div className="flex flex-wrap justify-center">
              {genreButtons.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`bg-white border-none mx-1 sm:mx-2 ${
                    activeGenre === genre
                      ? "bg-blue-700 text-white rounded"
                      : ""
                  } hover:bg-blue-700 hover:text-white hover:rounded`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Movie Grid Section */}
        <section
          id="movieGrid"
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 py-10"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group w-full sm:w-60 bg-white shadow-lg rounded-[6px] overflow-hidden text-center"
            >
              <div className="relative">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : "https://via.placeholder.com/500x750"
                  }
                  alt={movie.title}
                  className="w-full h-[315px] object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to={"/movie-details"}>
                    <button className="cursor-pointer mb-4 px-4 py-2 bg-transparent text-white border border-white rounded w-[150px] hover:bg-white hover:text-black transition-colors duration-300">
                      Details
                    </button>
                  </Link>
                  <Link to={"/seat-order"}>
                    <button className="cursor-pointer px-4 py-2 bg-primary text-white rounded w-[150px] hover:bg-blue-700 transition-colors duration-300">
                      Buy Ticket
                    </button>
                  </Link>
                </div>
              </div>
              <div className="p-4">
                <h3 className="mb-2 font-semibold">{movie.title}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {movie.genre_ids.map((id) => (
                    <p
                      key={id}
                      className="text-gray-500 text-sm px-3 py-1 bg-[#f5f5f9] rounded-[20px]"
                    >
                      {genres[id]}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Pagination Section */}
        <section className="flex justify-center items-center gap-4 my-8">
          <button className="p-2 border border-gray-300 bg-white cursor-pointer">
            &lt;
          </button>
          {[1, 2, 3].map((page) => (
            <span
              key={page}
              onClick={() => handlePageChange(page)}
              className={`p-2 border border-gray-300 cursor-pointer ${
                activePage === page ? "bg-blue-700 text-white" : "bg-white"
              }`}
            >
              {page}
            </span>
          ))}
          <button className="p-2 border border-gray-300 bg-white cursor-pointer">
            &gt;
          </button>
        </section>
      </main>

      {/* Newsletter Section */}
      <section className="bg-primary text-white text-center rounded-lg py-8 sm:py-15 lg:py-16 px-4 sm:px-10 mx-4 sm:mx-10 lg:mr-[8%] lg:ml-[8%]">
        <h3 className="text-xl sm:text-2xl font-bold mb-8">
          Subscribe to our newsletter
        </h3>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="text-center">
            <input
              type="text"
              placeholder="First name"
              className="w-full sm:w-60 h-12 px-4 border rounded-lg bg-transparent bg-opacity-50 mb-4 sm:mb-0 sm:mr-3.5"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full sm:w-60 h-12 px-4 border rounded-lg bg-transparent bg-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="bg-white text-primary px-6 py-3 rounded-lg font-semibold"
          >
            Subscribe Now
          </button>
        </form>
      </section>

      <Footer />
    </>
  );
}

export default MovieTicketing;
