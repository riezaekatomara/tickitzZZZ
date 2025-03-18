import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
        <section className="relative w-full h-[462px]">
          <div className="absolute top-0 left-0 w-screen h-full bg-[url('../public/png/bg-avanger.png')] bg-cover bg-center bg-no-repeat brightness-50"></div>
          <div className="relative top-[150px] flex flex-col text-white ml-24">
            <p className="text-[18px] text-lg leading-[50px]">
              List Movie of the Week
            </p>
            <h1 className="text-[48px] text-4xl mb-5">
              Experience the Magic of
              <br />
              Cinema: Book Your Ticket
              <br />
              Today
            </h1>
          </div>
        </section>

        {/* Filters */}
        <section className="flex justify-between items-center px-[5%] py-5">
          <div className="flex flex-col">
            <p className="relative top-5 left-0.5 text-[15px]">Cari event</p>
            <img
              src="../src/assets/svg/search2.svg"
              className="w-[24px] h-[24px] relative top-8 left-[8px]"
            ></img>
            <input
              type="text"
              placeholder={`           New Born Expert`}
              className="p-2 w-64 border border-gray-300 rounded placeholder:text-[12px]"
            />
          </div>
          <div className="flex flex-col gap-4">
            <p>Filter</p>
            <div>
              {genreButtons.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`bg-white border-none mx-2 ${
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

        {/* Movie Grid */}
        <section
          id="movieGrid"
          className="grid grid-cols-4 gap-6 px-8 py-10 lg:mr-[33px] lg:ml-[59px]"
        >
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="group w-60 bg-white shadow-lg rounded-[6px] overflow-hidden text-center"
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
                  <Link to={"/payment-info"}>
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

        {/* Pagination */}
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
    </>
  );
}

export default MovieTicketing;
