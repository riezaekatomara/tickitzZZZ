import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import Footer from "../components/Footer.jsx";
import "../styles/button-animations.css";

function MovieTicketing() {
  const navigate = useNavigate();
  const [allMovies, setAllMovies] = useState([]);
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [activeGenre, setActiveGenre] = useState("All");
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const MOVIES_PER_PAGE = 12;
  const MAX_TOTAL_MOVIES = 500; // Increased for better filtering

  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular?language=en-US&page=${activePage}&api_key=${API_KEY}`;
  const GENRE_LIST_URL = `${BASE_URL}/genre/movie/list?language=en-US&api_key=${API_KEY}`;

  // Function to handle "Buy Ticket" button click
  const handleBuyTicket = (movie) => {
    const movieGenres = movie.genre_ids.map((id) => genres[id] || "Unknown");

    // Navigate to seat order page with movie data
    navigate(`/movie-details/${movie.id}`, {
      state: {
        movieId: movie.id,
        movieTitle: movie.title,
        moviePoster: movie.poster_path,
        movieGenres: movieGenres,
        movieOverview: movie.overview,
        movieReleaseDate: movie.release_date,
        movieRuntime: movie.runtime,
        movieBackdrop: movie.backdrop_path,
      },
    });
  };

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
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
    let maxVisiblePages = 5;
    // Reduce visible pages on smaller screens
    if (window.innerWidth < 640) {
      maxVisiblePages = 3;
    }

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
      <main className="overflow-x-hidden">
        {/* Hero Section - Fixed background image path and added fallback */}
        <div className="relative w-full h-[250px] xs:h-[300px] sm:h-[462px] overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/png/bg-avanger.png"
              alt="Background"
              className="w-full h-full object-cover brightness-50"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "../public/png/bg-avanger.png";
                if (e.target.src.includes("../public/png/bg-avanger.png")) {
                  e.target.onerror = () => {
                    e.target.src =
                      "https://via.placeholder.com/1200x462?text=Avengers+Background";
                  };
                }
              }}
            />
          </div>
          <div className="relative h-full flex flex-col justify-center text-white text-center px-4 sm:text-left sm:px-8 md:px-12 lg:px-16">
            <p className="text-[14px] xs:text-[16px] sm:text-[18px] leading-[24px] sm:leading-[30px] md:leading-[50px]">
              List Movie of the Week
            </p>
            <h1 className="text-[22px] xs:text-[28px] sm:text-[36px] md:text-[48px] mb-3 md:mb-5 font-bold">
              Experience the Magic of
              <br className="hidden xs:block" />
              Cinema: Book Your Ticket
              <br className="hidden xs:block" />
              Today
            </h1>
          </div>
        </div>

        {/* Search and Filter Section - Improved responsive layout */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 sm:px-6 md:px-8 py-5 space-y-6 md:space-y-0">
          <div className="flex flex-col w-full md:w-1/2 lg:w-2/5">
            <div className="relative">
              <p className="text-[13px] sm:text-[15px] text-gray-500 mb-2">
                Search movie
              </p>
              <div className="relative w-full">
                <img
                  src="../src/assets/svg/search2.svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 z-10"
                  alt="Search icon"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.style.display = "none";
                  }}
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
          <div className="flex flex-col gap-2 sm:gap-4 w-full md:w-auto">
            <p className="text-gray-700 text-left md:text-right">Filter</p>
            <div className="flex flex-wrap justify-start md:justify-end gap-2">
              {genreButtons.map((genre) => (
                <button
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  className={`cursor-pointer px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm md:text-base transition-all ${
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

        {/* Movie Grid Section - With consistent image size */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 md:px-8 py-6 sm:py-10">
          {isLoading ? (
            <div className="col-span-full text-center py-10">
              <p className="text-lg">Loading movies...</p>
              <div className="loader mx-auto mt-4 w-10 h-10 border-4 border-blue-200 border-t-blue-700 rounded-full animate-spin"></div>
            </div>
          ) : displayedMovies.length > 0 ? (
            displayedMovies.map((movie) => (
              <div
                key={movie.id}
                className="group w-full bg-white shadow-lg rounded-[6px] overflow-hidden text-center transition-transform duration-300 hover:scale-[1.02]"
              >
                <div className="relative w-full pb-[150%]">
                  {/* Using padding-bottom trick for consistent aspect ratio */}
                  <img
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                        : "https://via.placeholder.com/500x750"
                    }
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link
                      to={`/movie-details/${movie.id}`}
                      state={{
                        movieId: movie.id,
                        movieTitle: movie.title,
                        moviePoster: movie.poster_path,
                        movieGenres: movie.genre_ids.map(
                          (id) => genres[id] || "Unknown"
                        ),
                        movieOverview: movie.overview,
                        movieReleaseDate: movie.release_date,
                        movieRuntime: movie.runtime,
                        movieBackdrop: movie.backdrop_path,
                      }}
                    >
                      <button className="cursor-pointer mb-3 sm:mb-4 px-3 py-1 sm:px-4 sm:py-2 bg-transparent text-white border border-white rounded w-[120px] sm:w-[150px] text-sm sm:text-base hover:bg-white hover:text-black transition-colors duration-300">
                        Details
                      </button>
                    </Link>
                    {/* Modified to call the handleBuyTicket function */}
                    <button
                      onClick={() => handleBuyTicket(movie)}
                      className="cursor-pointer px-3 py-1 sm:px-4 sm:py-2 bg-blue-700 text-white rounded w-[120px] sm:w-[150px] text-sm sm:text-base hover:bg-blue-800 transition-colors duration-300"
                    >
                      Buy Ticket
                    </button>
                  </div>
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="mb-2 font-semibold line-clamp-1 text-sm sm:text-base">
                    {movie.title}
                  </h3>
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {movie.genre_ids.slice(0, 3).map((id) => (
                      <p
                        key={id}
                        className="text-gray-500 text-[10px] sm:text-xs px-2 py-1 bg-gray-100 rounded-full"
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
              No movies found for your search. Try a different keyword or genre.
            </div>
          )}
        </section>

        {/* Show search results info if filtering */}
        {(searchQuery || activeGenre !== "All") &&
          filteredMovies.length > 0 && (
            <div className="text-center text-gray-600 mb-4 px-4">
              Found {filteredMovies.length} movies
              {searchQuery ? ` matching "${searchQuery}"` : ""}
              {activeGenre !== "All" ? ` in ${activeGenre} genre` : ""}
            </div>
          )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex flex-col items-center gap-2 sm:gap-4 my-6 sm:my-8 px-2">
            <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
              <button
                onClick={goToPreviousPage}
                disabled={activePage === 1}
                className={`cursor-pointer p-1 sm:p-2 px-2 sm:px-4 border rounded text-xs sm:text-sm ${
                  activePage === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Prev
              </button>

              {getPageNumbers().map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`cursor-pointer p-1 sm:p-2 px-2 sm:px-4 border rounded text-xs sm:text-sm ${
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
                className={`cursor-pointer p-1 sm:p-2 px-2 sm:px-4 border rounded text-xs sm:text-sm ${
                  activePage === totalPages
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
            <div className="text-gray-500 text-xs sm:text-sm">
              Page {activePage} of {totalPages}
            </div>
          </div>
        )}
      </main>

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
    </>
  );
}

export default MovieTicketing;
