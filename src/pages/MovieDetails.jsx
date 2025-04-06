import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Ebv from "../assets/svg/ebv.svg";
import Hiflix from "../assets/svg/hiflix.svg";
import Cine from "../assets/svg/cine.svg";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  // State untuk fitur booking
  const [bookingDate, setBookingDate] = useState("choose");
  const [bookingTime, setBookingTime] = useState("choose");
  const [bookingCity, setBookingCity] = useState("choose");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [hasSelectedTime, setHasSelectedTime] = useState(false);
  const [hasSelectedCity, setHasSelectedCity] = useState(false);
  const [hasSelectedDate, setHasSelectedDate] = useState(false);

  // New states for filtering
  const [filteredCinemas, setFilteredCinemas] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilterMessage, setShowFilterMessage] = useState(false);
  const [filterMessage, setFilterMessage] = useState("");

  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Data cinemas berdasarkan halaman
  const cinemasByPage = {
    1: [
      { id: "ebv-1", name: "EBV.id", image: Ebv },
      { id: "hiflix-1", name: "Hiflix", image: Hiflix },
      { id: "cine-1", name: "Cine Club", image: Cine },
      { id: "ebv-2", name: "EBV Premium", image: Ebv },
    ],
    2: [
      { id: "hiflix-2", name: "Hiflix Gold", image: Hiflix },
      { id: "cine-2", name: "Cine Premium", image: Cine },
      { id: "ebv-3", name: "EBV Family", image: Ebv },
      { id: "hiflix-3", name: "Hiflix IMAX", image: Hiflix },
    ],
    3: [
      { id: "cine-3", name: "Cine IMAX", image: Cine },
      { id: "ebv-4", name: "EBV Deluxe", image: Ebv },
      { id: "hiflix-4", name: "Hiflix Deluxe", image: Hiflix },
      { id: "cine-4", name: "Cine Deluxe", image: Cine },
    ],
    4: [
      { id: "ebv-5", name: "EBV Express", image: Ebv },
      { id: "hiflix-5", name: "Hiflix Express", image: Hiflix },
      { id: "cine-5", name: "Cine Express", image: Cine },
      { id: "ebv-6", name: "EBV Studio", image: Ebv },
    ],
  };

  // All cinemas in a flat array for filtering
  const allCinemas = Object.values(cinemasByPage).flat();

  useEffect(() => {
    // Get today's date for minimum date value
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // Fetch genres list
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
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

    // Fetch movie details
    const fetchMovieDetails = async () => {
      if (!id) {
        navigate("/movie");
        return;
      }

      try {
        const response = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        const data = await response.json();
        setMovie(data);

        // Fetch credits for director and cast
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsResponse.json();

        // Get director
        const directorInfo = creditsData.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(directorInfo ? directorInfo.name : "Unknown");

        // Get top cast members
        setCast(creditsData.cast.slice(0, 3).map((actor) => actor.name));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setLoading(false);
      }
    };

    fetchGenres();
    fetchMovieDetails();
  }, [id, navigate]);

  // Convert minutes to hours and minutes
  const formatRuntime = (minutes) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString || dateString === "choose") return "Unknown";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter cinemas based on city
  const filterCinemasByCity = (city) => {
    const cityHash = city
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const filteredCinemas = allCinemas.filter((_, index) => {
      return (index + cityHash) % 3 === 0;
    });

    if (filteredCinemas.length < 2) {
      return allCinemas.slice(0, 2);
    }

    return filteredCinemas;
  };

  // Check if cinema is available based on current filters
  const isCinemaAvailable = (cinemaId) => {
    if (!hasSelectedDate || !hasSelectedTime || !hasSelectedCity) return true;

    const availableCinemas = filterCinemasByCity(bookingCity);
    return availableCinemas.some((cinema) => cinema.id === cinemaId);
  };

  // Handle filter button click
  const handleFilter = () => {
    if (bookingDate === "choose") {
      setFilterMessage("Silakan pilih tanggal tayangan terlebih dahulu!");
      setShowFilterMessage(true);
      return;
    }

    if (!bookingTime || bookingTime === "choose") {
      setFilterMessage("Silakan pilih waktu tayangan terlebih dahulu!");
      setShowFilterMessage(true);
      return;
    }

    if (!bookingCity || bookingCity === "choose") {
      setFilterMessage("Silakan pilih lokasi bioskop terlebih dahulu!");
      setShowFilterMessage(true);
      return;
    }

    // Clear validation message when filter button is clicked
    setShowFilterMessage(false);

    setSelectedCinema("");
    const filtered = filterCinemasByCity(bookingCity);
    setFilteredCinemas(filtered);
    setIsFiltered(true);

    setFilterMessage(
      `Menampilkan ${
        filtered.length
      } bioskop di ${bookingCity} pada ${formatDate(
        bookingDate
      )} jam ${bookingTime}`
    );
    setShowFilterMessage(true);
    // Keep the filter success message for 3 seconds
    setTimeout(() => setShowFilterMessage(false), 5250);
    setActivePage(1);
  };

  // Handle cinema selection
  const handleCinemaSelect = (cinemaId) => {
    const selectedCinemaObject = allCinemas.find(
      (cinema) => cinema.id === cinemaId
    );

    // Check if all filters are selected
    if (hasSelectedDate && hasSelectedTime && hasSelectedCity) {
      // Check if the cinema is available with the current filters
      if (!isCinemaAvailable(cinemaId)) {
        setFilterMessage(
          `Bioskop ${selectedCinemaObject.name} tidak tersedia pada waktu dan lokasi yang dipilih. Gunakan filter untuk melihat daftar bioskop yang tersedia.`
        );
        setShowFilterMessage(true);
        // Don't set timeout to auto-hide the message
        return;
      }
    }

    // If selecting a different cinema, clear the validation message
    if (selectedCinema !== cinemaId) {
      setShowFilterMessage(false);
    }

    setSelectedCinema(cinemaId);
  };

  // Handle page change in pagination
  const handlePageChange = (page) => {
    setActivePage(page);
    setSelectedCinema("");
    // Clear validation message when changing pages
    setShowFilterMessage(false);
  };

  // Handle date selection
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    // Clear validation message when any filter is changed
    setShowFilterMessage(false);

    if (selectedDate !== "choose") {
      setBookingDate(selectedDate);
      setHasSelectedDate(true);
      setIsFiltered(false);
      setFilteredCinemas(null);

      // Clear cinema selection if it's not available with new date
      if (selectedCinema && !isCinemaAvailable(selectedCinema)) {
        setSelectedCinema("");
      }
    } else {
      setBookingDate(selectedDate);
      setHasSelectedDate(false);
    }
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    // Clear validation message when any filter is changed
    setShowFilterMessage(false);

    if (selectedTime !== "choose") {
      setBookingTime(selectedTime);
      setHasSelectedTime(true);
      setIsFiltered(false);
      setFilteredCinemas(null);

      // Clear cinema selection if it's not available with new time
      if (selectedCinema && !isCinemaAvailable(selectedCinema)) {
        setSelectedCinema("");
      }
    } else {
      setBookingTime(selectedTime);
      setHasSelectedTime(false);
    }
  };

  // Handle city selection
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    // Clear validation message when any filter is changed
    setShowFilterMessage(false);

    if (selectedCity !== "choose") {
      setBookingCity(selectedCity);
      setHasSelectedCity(true);
      setIsFiltered(false);
      setFilteredCinemas(null);

      // Clear cinema selection if it's not available in new city
      if (selectedCinema && !isCinemaAvailable(selectedCinema)) {
        setSelectedCinema("");
      }
    } else {
      setBookingCity(selectedCity);
      setHasSelectedCity(false);
    }
  };

  // Handle booking - navigating to seat order page
  const handleBookNow = () => {
    if (bookingDate === "choose") {
      setFilterMessage("Silakan pilih tanggal terlebih dahulu!");
      setShowFilterMessage(true);
      return;
    }

    if (!selectedCinema) {
      setFilterMessage("Silakan pilih bioskop terlebih dahulu!");
      setShowFilterMessage(true);
      return;
    }

    if (!bookingTime || bookingTime === "choose") {
      setFilterMessage("Silakan pilih waktu tayangan terlebih dahulu!");
      setShowFilterMessage(true);
      return;
    }

    if (!bookingCity || bookingCity === "choose") {
      setFilterMessage("Silakan pilih lokasi bioskop terlebih dahulu!");
      setShowFilterMessage(true);
      return;
    }

    // Check if the cinema is available with the current filters
    if (!isCinemaAvailable(selectedCinema)) {
      const selectedCinemaDetails = allCinemas.find(
        (cinema) => cinema.id === selectedCinema
      );

      setFilterMessage(
        `Bioskop ${selectedCinemaDetails.name} tidak tersedia pada waktu dan lokasi yang dipilih. Gunakan filter untuk melihat daftar bioskop yang tersedia.`
      );
      setShowFilterMessage(true);
      // Don't set timeout to auto-hide the message
      return;
    }

    const selectedCinemaDetails = allCinemas.find(
      (cinema) => cinema.id === selectedCinema
    );

    // Prepare booking data to pass to seat order page
    const bookingData = {
      movieId: movie.id,
      movieTitle: movie.title,
      moviePoster: movie.poster_path,
      movieGenres: movie.genres.map((genre) => genre.name),
      bookingDate: bookingDate,
      formattedDate: formatDate(bookingDate),
      bookingTime: bookingTime,
      bookingCity: bookingCity,
      cinemaId: selectedCinema,
      cinemaName: selectedCinemaDetails.name,
      cinemaImage: selectedCinemaDetails.image,
    };

    // Navigate to seat order page with booking data
    navigate("/seat-order", { state: bookingData });
  };

  // Get cinema items to display based on filter status and pagination
  const getCinemasToDisplay = () => {
    if (isFiltered && filteredCinemas) {
      const startIndex = (activePage - 1) * 4;
      const endIndex = startIndex + 4;
      return filteredCinemas.slice(startIndex, endIndex);
    } else {
      return cinemasByPage[activePage] || [];
    }
  };

  // Calculate total pages for pagination
  const getTotalPages = () => {
    if (isFiltered && filteredCinemas) {
      return Math.ceil(filteredCinemas.length / 4);
    } else {
      return Object.keys(cinemasByPage).length;
    }
  };

  // Get today's date for min attribute
  const today = new Date().toISOString().split("T")[0];

  if (loading) {
    return (
      <div className="bg-white-100 min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-96">
          <p className="text-xl">Loading movie details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="bg-white-100 min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-96">
          <p className="text-xl">Movie not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-white-100 min-h-screen">
      <Header />

      {/* Hero Image - Responsive Height */}
      <div
        className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[415px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundPosition: "center 25%",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Movie Details - Responsive Container */}
      <div className="mx-3 xs:mx-4 md:mx-8 lg:mx-[70px] p-3 xs:p-4 md:p-6 bg-white mt-4 xs:mt-6 rounded-md shadow-sm">
        {/* Movie Info Section - Responsive Flex */}
        <div className="relative flex flex-col md:flex-row md:items-start mb-0 gap-4 md:gap-6">
          {/* Movie Poster - Responsive Sizing and Positioning */}
          <div className="relative -mt-16 xs:-mt-20 md:-mt-32 lg:-mt-40 w-full max-w-[180px] xs:max-w-[220px] md:max-w-[264px] mx-auto md:mx-0 z-10">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>

          {/* Movie Details - Responsive Layout */}
          <div className="flex-1 mt-2 xs:mt-4 md:mt-0">
            <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-center md:text-left">
              {movie.title}
            </h2>

            {/* Genres - Responsive Wrap */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="text-xs xs:text-sm px-2 xs:px-3 py-1 bg-gray-100 text-gray-800 rounded-full"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Movie Info Grid - Responsive Layout */}
            <div className="mt-4 grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4 text-center xs:text-left">
              <div className="space-y-1">
                <p className="text-gray-500 text-xs xs:text-sm">Release Date</p>
                <p className="text-gray-900 text-sm xs:text-base font-medium">
                  {formatDate(movie.release_date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs xs:text-sm">Directed by</p>
                <p className="text-gray-900 text-sm xs:text-base font-medium">
                  {director}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs xs:text-sm">Duration</p>
                <p className="text-gray-900 text-sm xs:text-base font-medium">
                  {formatRuntime(movie.runtime)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-xs xs:text-sm">Cast</p>
                <p className="text-gray-900 text-sm xs:text-base font-medium">
                  {cast.join(", ")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis Section */}
        <div className="mt-5 xs:mt-6 md:mt-8">
          <h3 className="text-lg xs:text-xl font-semibold">Synopsis</h3>
          <p className="text-sm xs:text-base text-gray-700 mt-2">
            {movie.overview}
          </p>
        </div>

        {/* Booking Section - Responsive Controls */}
        <div className="mt-6 xs:mt-8">
          <h3 className="text-lg xs:text-xl font-semibold">Book Tickets</h3>

          {/* Filter Controls - Responsive Stack/Row */}
          <div className="flex flex-col xs:flex-row flex-wrap gap-2 xs:gap-3 mt-3 xs:mt-4">
            <select
              value={bookingDate}
              onChange={handleDateChange}
              className="flex-1 min-w-[120px] xs:min-w-[150px] text-sm xs:text-base cursor-pointer border px-3 xs:px-4 py-2 rounded"
            >
              <option value="choose" disabled={hasSelectedDate}>
                Choose Date
              </option>
              <option value={today}>{formatDate(today)}</option>
              {[...Array(7)].map((_, i) => {
                const nextDate = new Date();
                nextDate.setDate(nextDate.getDate() + i + 1);
                const nextDateStr = nextDate.toISOString().split("T")[0];
                return (
                  <option key={i} value={nextDateStr}>
                    {formatDate(nextDateStr)}
                  </option>
                );
              })}
            </select>

            <select
              value={bookingTime}
              onChange={handleTimeChange}
              className="flex-1 min-w-[120px] xs:min-w-[150px] text-sm xs:text-base cursor-pointer border px-3 xs:px-4 py-2 rounded"
            >
              <option value="choose" disabled={hasSelectedTime}>
                Choose Time
              </option>
              <option value="08:30 AM">08:30 AM</option>
              <option value="12:00 PM">12:00 PM</option>
              <option value="03:30 PM">03:30 PM</option>
              <option value="07:00 PM">07:00 PM</option>
              <option value="09:45 PM">09:45 PM</option>
            </select>

            <select
              value={bookingCity}
              onChange={handleCityChange}
              className="flex-1 min-w-[120px] xs:min-w-[150px] text-sm xs:text-base cursor-pointer border px-3 xs:px-4 py-2 rounded"
            >
              <option value="choose" disabled={hasSelectedCity}>
                Choose Location
              </option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Yogyakarta">Yogyakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Bali">Bali</option>
            </select>

            <button
              onClick={handleFilter}
              className={`flex-1 xs:flex-none cursor-pointer ${
                bookingDate !== "choose" &&
                bookingTime !== "choose" &&
                bookingCity !== "choose"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400"
              } text-white px-3 xs:px-4 py-2 rounded transition-colors text-sm xs:text-base`}
              disabled={
                bookingDate === "choose" ||
                bookingTime === "choose" ||
                bookingCity === "choose"
              }
            >
              Filter
            </button>
          </div>

          {/* Filter Messages - Responsive */}
          {showFilterMessage && (
            <div className="mt-2 xs:mt-3 p-2 bg-blue-50 border border-blue-200 rounded text-blue-800 text-xs xs:text-sm">
              {filterMessage}
            </div>
          )}

          {/* Active Filter Indicator */}
          {isFiltered && (
            <div className="mt-2 xs:mt-3 flex flex-col xs:flex-row items-start xs:items-center gap-1 xs:gap-2">
              <span className="text-xs xs:text-sm text-gray-700">
                <span className="font-semibold">Filter aktif:</span>{" "}
                {bookingCity}, {formatDate(bookingDate)}, {bookingTime}
              </span>
              <button
                onClick={() => {
                  setIsFiltered(false);
                  setFilteredCinemas(null);
                  setActivePage(1);
                  // Clear validation message when resetting filter
                  setShowFilterMessage(false);
                }}
                className="cursor-pointertext-xs xs:text-sm text-blue-600 hover:text-blue-800"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Cinema Selection - Responsive Grid */}
        <div className="mt-6 xs:mt-8">
          <h3 className="text-lg xs:text-xl font-semibold">Choose Cinema</h3>

          {isFiltered && filteredCinemas && filteredCinemas.length === 0 ? (
            <div className="mt-3 xs:mt-4 p-3 xs:p-4 bg-gray-50 rounded text-center text-sm xs:text-base">
              Tidak ada bioskop yang tersedia dengan filter yang dipilih.
              Silahkan ubah filter Anda.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 xs:gap-4 mt-3 xs:mt-4">
                {getCinemasToDisplay().map((cinema) => (
                  <button
                    key={cinema.id}
                    onClick={() => handleCinemaSelect(cinema.id)}
                    className={`relative w-full h-[80px] xs:h-[90px] sm:h-[100px] rounded-lg cursor-pointer border px-3 xs:px-4 py-2 xs:py-3 bg-white hover:bg-blue-50 transition-colors flex items-center justify-center ${
                      selectedCinema === cinema.id
                        ? "border-blue-600 border-2 bg-blue-50"
                        : ""
                    }`}
                  >
                    <img
                      src={cinema.image}
                      alt={cinema.name}
                      className="max-h-10 xs:max-h-12 object-contain"
                    />
                    {selectedCinema === cinema.id && (
                      <div className="absolute top-1 xs:top-2 right-1 xs:right-2">
                        <svg
                          className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Pagination - Responsive */}
              {getTotalPages() > 1 && (
                <div className="flex flex-wrap justify-center gap-1 xs:gap-2 mt-4 xs:mt-6">
                  {[...Array(getTotalPages())].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`cursor-pointer w-8 h-8 xs:w-10 xs:h-10 border rounded flex items-center justify-center text-sm xs:text-base ${
                        activePage === i + 1
                          ? "bg-blue-600 text-white"
                          : "hover:bg-blue-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Book Now Button - Responsive */}
          <div className="flex justify-center mt-4 xs:mt-6">
            <button
              onClick={handleBookNow}
              className={`cursor-pointer w-full xs:w-auto px-4 xs:px-6 py-2 xs:py-3 rounded text-sm xs:text-base ${
                selectedCinema &&
                bookingDate !== "choose" &&
                bookingTime !== "choose" &&
                bookingCity !== "choose"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400"
              } text-white transition-colors`}
              disabled={
                !selectedCinema ||
                bookingDate === "choose" ||
                bookingTime === "choose" ||
                bookingCity === "choose"
              }
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;
