import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import Footer from "../components/Footer.jsx";
import "../styles/button-animations.css";

function MovieTicketing() {
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [activeGenre, setActiveGenre] = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const MOVIES_PER_PAGE = 12; // 3 rows x 4 cols
  const MAX_TOTAL_MOVIES = 500; // Increased for better filtering

  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=${activePage}&api_key=${API_KEY}`;
  const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`;

  // Fetch genre list
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
  }, []);

  // Fetch all movies on initial load
  useEffect(() => {
    const getMovieList = async () => {
      try {
        let allFetchedMovies = [];
        let page = 1;
        let totalPages = 1;

        // Fetch multiple pages to get enough movies for filtering
        while (allFetchedMovies.length < MAX_TOTAL_MOVIES && page <= 5) {
          const response = await fetch(
            `${BASE_URL}/movie/popular?language=en-US&page=${page}&api_key=${API_KEY}`
          );
          const data = await response.json();
          allFetchedMovies = [...allFetchedMovies, ...data.results];
          totalPages = data.total_pages;
          page++;
        }

        setAllMovies(allFetchedMovies.slice(0, MAX_TOTAL_MOVIES));
        setFilteredMovies(allFetchedMovies.slice(0, MAX_TOTAL_MOVIES));
        setTotalPages(Math.ceil(allFetchedMovies.length / MOVIES_PER_PAGE));
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    getMovieList();
  }, []);

  // Filter movies based on genre, search query and update pagination
  useEffect(() => {
    if (allMovies.length === 0) return;

    // First filter by genre
    let filtered = [];
    if (activeGenre === "All") {
      filtered = allMovies;
    } else {
      filtered = allMovies.filter((movie) =>
        movie.genre_ids.some((id) =>
          genres[id]?.toLowerCase().includes(activeGenre.toLowerCase())
        )
      );
    }

    // Then filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((movie) => {
        // Search by movie title
        const titleMatch = movie.title.toLowerCase().includes(query);

        // Search by genre
        const genreMatch = movie.genre_ids.some((id) =>
          genres[id]?.toLowerCase().includes(query)
        );

        return titleMatch || genreMatch;
      });
    }

    setFilteredMovies(filtered);

    // Update total pages based on filtered results
    setTotalPages(Math.ceil(filtered.length / MOVIES_PER_PAGE));

    // Reset to first page if the current page would be invalid with new filter
    if (activePage > Math.ceil(filtered.length / MOVIES_PER_PAGE)) {
      setActivePage(1);
    }
  }, [activeGenre, searchQuery, allMovies, genres]);

  // Update displayed movies when page changes or filtered movies change
  useEffect(() => {
    // Always show 12 movies per page (3x4 grid)
    const startIdx = (activePage - 1) * MOVIES_PER_PAGE;
    const endIdx = startIdx + MOVIES_PER_PAGE;
    setDisplayedMovies(filteredMovies.slice(startIdx, endIdx));
  }, [activePage, filteredMovies]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setActivePage(1); // Reset to first page when searching
  };

  const handleGenreClick = (genre) => {
    setActiveGenre(genre);
    setActivePage(1); // Reset to first page when changing genre
    window.scrollTo(0, 0);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const goToPreviousPage = (event) => {
    event.preventDefault();
    if (activePage > 1) {
      setActivePage(activePage - 1);
    }
  };

  const goToNextPage = (event) => {
    event.preventDefault();
    if (activePage < totalPages) {
      setActivePage(activePage + 1);
    }
  };

  const getPageNumbers = () => {
    const maxVisiblePages = 5;
    const pageNumbers = [];
    let startPage = Math.max(1, activePage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const genreButtons = [
    "All",
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
        <div className="relative w-screen left-[calc(-50vw+50%)] h-[300px] sm:h-[462px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="../public/png/bg-avanger.png"
              alt="Background"
              className="w-full h-full object-cover brightness-50"
              style={{
                minWidth: "100vw",
                marginLeft: "calc(50% - 50vw)",
                marginRight: "calc(50% - 50vw)",
              }}
            />
          </div>
          <div className="relative h-full flex flex-col justify-center text-white text-center sm:text-left ml-0 sm:ml-[10%]">
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
        </div>

        {/* Search and Filter Section */}
        <section className="flex flex-col sm:flex-row justify-between items-center px-[5%] py-5">
          <div className="flex flex-col mb-4 sm:mb-0 w-full sm:w-auto">
            <div className="relative">
              <p className="absolute bottom-8 left-2 text-[15px] text-gray-500">
                Search movie
              </p>
              <div className="relative top-5">
                <img
                  src="../src/assets/svg/search2.svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 z-10"
                  alt="Search icon"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search by movie title or genre"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full sm:w-auto">
            <p className="text-gray-700">Filter</p>
            <div className="flex flex-wrap justify-center gap-2">
              {genreButtons.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`px-4 py-1 rounded-full text-sm sm:text-base transition-all ${
                    activeGenre === genre
                      ? "bg-blue-700 text-white"
                      : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Movie Grid Section - Always 3x4 */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 py-10">
          {displayedMovies.length > 0 ? (
            displayedMovies.map((movie) => (
              <div
                key={movie.id}
                className="group w-full bg-white shadow-lg rounded-[6px] overflow-hidden text-center"
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
                    <Link to={`/movie-details/${movie.id}`}>
                      <button className="cursor-pointer mb-4 px-4 py-2 bg-transparent text-white border border-white rounded w-[150px] hover:bg-white hover:text-black transition-colors duration-300">
                        Details
                      </button>
                    </Link>
                    <Link to={`/seat-order/${movie.id}`}>
                      <button className="cursor-pointer px-4 py-2 bg-blue-700 text-white rounded w-[150px] hover:bg-blue-800 transition-colors duration-300">
                        Buy Ticket
                      </button>
                    </Link>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="mb-2 font-semibold line-clamp-1">
                    {movie.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-2">
                    {movie.genre_ids.slice(0, 3).map((id) => (
                      <p
                        key={id}
                        className="text-gray-500 text-xs px-2 py-1 bg-gray-100 rounded-full"
                      >
                        {genres[id] || "Unknown"}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              {allMovies.length === 0
                ? "Loading movies..."
                : "No movies found for your search. Try a different keyword or genre."}
            </div>
          )}
        </section>

        {/* Show search results info if filtering */}
        {(searchQuery || activeGenre !== "All") &&
          filteredMovies.length > 0 && (
            <div className="text-center text-gray-600 mb-4">
              Found {filteredMovies.length} movies
              {searchQuery ? ` matching "${searchQuery}"` : ""}
              {activeGenre !== "All" ? ` in ${activeGenre} genre` : ""}
            </div>
          )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-4 my-8">
            <div className="flex gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={activePage === 1}
                className={`cursor-pointer p-2 px-4 border rounded ${
                  activePage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`cursor-pointer p-2 px-4 border rounded ${
                    activePage === page
                      ? "bg-blue-700 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={goToNextPage}
                disabled={activePage === totalPages}
                className={`cursor-pointer p-2 px-4 border rounded ${
                  activePage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
            <div className="text-gray-500">
              Page {activePage} of {totalPages}
            </div>
          </div>
        )}
      </main>

      {/* Newsletter Section */}
      <section className="bg-blue-700 text-white text-center rounded-lg py-12 px-4 sm:px-8 mx-4 sm:mx-8 my-12">
        <h3 className="text-2xl font-bold mb-8">Subscribe to our newsletter</h3>
        <form className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-xl">
            <input
              type="text"
              placeholder="First name"
              className="w-full h-12 px-4 border border-white rounded-lg bg-transparent placeholder-white"
            />
            <input
              type="email"
              placeholder="Email address"
              className="w-full h-12 px-4 border border-white rounded-lg bg-transparent placeholder-white"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto bg-white text-blue-700 hover:bg-blue-100 px-6 py-3 rounded-lg font-semibold transition-colors"
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
