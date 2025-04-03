import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Ebv from "../assets/svg/ebv.svg";
import Hiflix from "../assets/svg/hiflix.svg";
import Cine from "../assets/svg/cine.svg";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState({});
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState("");

  // State untuk fitur booking
  const [bookingDate, setBookingDate] = useState("choose");
  const [bookingTime, setBookingTime] = useState("choose");
  const [bookingCity, setBookingCity] = useState("choose");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [bookingStatus, setBookingStatus] = useState("");
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
    // This is a simplified filtering logic - in real implementation,
    // you would fetch cinema data based on city, date, and time

    // For demonstration purposes, we're using a pseudorandom filter based on city name
    const cityHash = city
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);

    // Select a subset of cinemas based on the city hash
    const filteredCinemas = allCinemas.filter((_, index) => {
      return (index + cityHash) % 3 === 0;
    });

    // Ensure we always return at least 2 cinemas
    if (filteredCinemas.length < 2) {
      return allCinemas.slice(0, 2);
    }

    return filteredCinemas;
  };

  // Handle filter button click
  const handleFilter = () => {
    // Validasi input
    if (bookingDate === "choose") {
      setFilterMessage("Silakan pilih tanggal tayangan terlebih dahulu!");
      setShowFilterMessage(true);
      setTimeout(() => setShowFilterMessage(false), 3000);
      return;
    }

    if (!bookingTime || bookingTime === "choose") {
      setFilterMessage("Silakan pilih waktu tayangan terlebih dahulu!");
      setShowFilterMessage(true);
      setTimeout(() => setShowFilterMessage(false), 3000);
      return;
    }

    if (!bookingCity || bookingCity === "choose") {
      setFilterMessage("Silakan pilih lokasi bioskop terlebih dahulu!");
      setShowFilterMessage(true);
      setTimeout(() => setShowFilterMessage(false), 3000);
      return;
    }

    // Reset cinema selection when filter changes
    setSelectedCinema("");

    // Apply the filter
    const filtered = filterCinemasByCity(bookingCity);
    setFilteredCinemas(filtered);
    setIsFiltered(true);

    // Show success message
    setFilterMessage(
      `Menampilkan ${
        filtered.length
      } bioskop di ${bookingCity} pada ${formatDate(
        bookingDate
      )} jam ${bookingTime}`
    );
    setShowFilterMessage(true);
    setTimeout(() => setShowFilterMessage(false), 3000);

    // Reset to first page
    setActivePage(1);
  };

  // Handle cinema selection
  const handleCinemaSelect = (cinemaId) => {
    setSelectedCinema(cinemaId);
  };

  // Handle page change in pagination
  const handlePageChange = (page) => {
    setActivePage(page);
    setSelectedCinema("");
  };

  // Handle date selection
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate !== "choose") {
      setBookingDate(selectedDate);
      setHasSelectedDate(true);
      // Reset filter state when selection changes
      setIsFiltered(false);
      setFilteredCinemas(null);
    } else {
      setBookingDate(selectedDate);
    }
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    if (selectedTime !== "choose") {
      setBookingTime(selectedTime);
      setHasSelectedTime(true);
      // Reset filter state when selection changes
      setIsFiltered(false);
      setFilteredCinemas(null);
    } else {
      setBookingTime(selectedTime);
      setHasSelectedTime(false);
    }
  };

  // Handle city selection
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    if (selectedCity !== "choose") {
      setBookingCity(selectedCity);
      setHasSelectedCity(true);
      // Reset filter state when selection changes
      setIsFiltered(false);
      setFilteredCinemas(null);
    } else {
      setBookingCity(selectedCity);
      setHasSelectedCity(false);
    }
  };

  // Handle booking confirmation
  const handleBookNow = () => {
    if (bookingDate === "choose") {
      setBookingStatus("Silakan pilih tanggal terlebih dahulu!");
      setShowBookingConfirmation(true);
      return;
    }

    if (!selectedCinema) {
      setBookingStatus("Silakan pilih bioskop terlebih dahulu!");
      setShowBookingConfirmation(true);
      return;
    }

    if (!bookingTime || bookingTime === "choose") {
      setBookingStatus("Silakan pilih waktu tayangan terlebih dahulu!");
      setShowBookingConfirmation(true);
      return;
    }

    if (!bookingCity || bookingCity === "choose") {
      setBookingStatus("Silakan pilih lokasi bioskop terlebih dahulu!");
      setShowBookingConfirmation(true);
      return;
    }

    const selectedCinemaDetails = allCinemas.find(
      (cinema) => cinema.id === selectedCinema
    );

    setBookingStatus(
      `Pemesanan tiket berhasil! Film: ${movie.title}, Bioskop: ${
        selectedCinemaDetails.name
      }, Tanggal: ${formatDate(
        bookingDate
      )}, Jam: ${bookingTime}, Kota: ${bookingCity}`
    );
    setShowBookingConfirmation(true);
  };

  // Get cinema items to display based on filter status and pagination
  const getCinemasToDisplay = () => {
    if (isFiltered && filteredCinemas) {
      // Calculate pagination for filtered cinemas
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
      <div
        className="w-full h-[415px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Movie Details */}
      <div className="mx-4 md:mx-[70px] p-6 bg-white mt-6 rounded-md">
        <div className="relative flex flex-col md:flex-row md:items-start mb-0">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            alt={movie.title}
            className="relative bottom-40 w-[264px] h-[347px] md:w-1/4 rounded-md shadow-lg mb-4 md:mb-0"
          />

          <div className="relative bottom-8 md:ml-6 flex-1">
            <h2 className="text-[32px] w-[418px] h-[34px] font-bold pb-13">
              {movie.title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="w-[110px] h-[31px] bg-gray-100 text-gray-800 px-3 py-1 rounded-[20px]"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Grid 2x2 untuk Movie Details Info dengan posisi Duration dan Directed by ditukar */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Release Date</p>
                <p className="text-gray-900 font-medium">
                  {formatDate(movie.release_date)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Directed by</p>
                <p className="text-gray-900 font-medium">{director}</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Duration</p>
                <p className="text-gray-900 font-medium">
                  {formatRuntime(movie.runtime)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-500 text-sm">Cast</p>
                <p className="text-gray-900 font-medium">{cast.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Synopsis section - Moved outside the flex container and made wider */}
        <div className="relative bottom-35 mt-4 md:mt-0 md:ml-0 w-full">
          <h3 className="text-xl font-semibold mt-0 md:mt-2">Synopsis</h3>
          <p className="text-gray-700 mt-2 pr-4">{movie.overview}</p>
        </div>

        {/* Booking Section */}
        <div>
          <h3 className="text-xl font-semibold mt-6">Book Tickets</h3>
          <div className="flex flex-wrap justify-between gap-4 mt-2">
            <select
              value={bookingDate}
              onChange={handleDateChange}
              className="cursor-pointer border px-4 py-2 rounded w-full sm:w-1/4"
            >
              <option value="choose" disabled={hasSelectedDate}>
                Choose Date
              </option>
              <option value={today}>{formatDate(today)}</option>
              {/* Add next 7 days */}
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
              className="cursor-pointer border px-4 py-2 rounded w-full sm:w-1/4"
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
              className="cursor-pointer border px-4 py-2 rounded w-full sm:w-1/4"
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
              className={`cursor-pointer ${
                bookingDate !== "choose" &&
                bookingTime !== "choose" &&
                bookingCity !== "choose"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400"
              } text-white px-4 py-2 rounded w-full sm:w-auto transition-colors`}
              disabled={
                bookingDate === "choose" ||
                bookingTime === "choose" ||
                bookingCity === "choose"
              }
            >
              Filter
            </button>
          </div>

          {/* Filter message notification */}
          {showFilterMessage && (
            <div className="mt-2 p-2 bg-blue-50 border border-blue-200 rounded text-blue-800">
              {filterMessage}
            </div>
          )}

          {/* Active filter indicator */}
          {isFiltered && (
            <div className="mt-2 flex items-center">
              <span className="text-sm text-gray-700">
                <span className="font-semibold">Filter aktif:</span>{" "}
                {bookingCity}, {formatDate(bookingDate)}, {bookingTime}
              </span>
              <button
                onClick={() => {
                  setIsFiltered(false);
                  setFilteredCinemas(null);
                  setActivePage(1);
                }}
                className="ml-2 text-sm text-blue-600 hover:text-blue-800"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Cinema Selection */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold">Choose Cinema</h3>

          {/* No cinemas message */}
          {isFiltered && filteredCinemas && filteredCinemas.length === 0 ? (
            <div className="mt-4 p-4 bg-gray-50 rounded text-center">
              Tidak ada bioskop yang tersedia dengan filter yang dipilih.
              Silahkan ubah filter Anda.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {getCinemasToDisplay().map((cinema) => (
                  <button
                    key={cinema.id}
                    onClick={() => handleCinemaSelect(cinema.id)}
                    className={`relative w-[200px] h-[100px] rounded-[8px] cursor-pointer border px-6 py-3 bg-white hover:bg-opacity-20 hover:bg-blue-100 transition-colors flex items-center justify-center ${
                      selectedCinema === cinema.id
                        ? "border-blue-600 border-2 bg-blue-50"
                        : ""
                    }`}
                  >
                    <img
                      src={cinema.image}
                      alt={cinema.name}
                      className="z-10 relative max-h-12 object-contain"
                    />
                    {selectedCinema === cinema.id && (
                      <div className="absolute top-2 right-2">
                        <svg
                          className="w-5 h-5 text-blue-600"
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

              {/* Pagination */}
              {getTotalPages() > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  {[...Array(getTotalPages())].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`border px-4 py-2 rounded ${
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

          {/* Book Now Button */}
          <div className="flex justify-center">
            <button
              onClick={handleBookNow}
              className={`cursor-pointer ${
                selectedCinema &&
                bookingDate !== "choose" &&
                bookingTime !== "choose" &&
                bookingCity !== "choose"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-blue-400"
              } text-white px-6 py-2 rounded mt-4 transition-colors`}
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

          {/* Booking Confirmation */}
          {showBookingConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">
                  {bookingStatus.includes("berhasil")
                    ? "Booking Berhasil!"
                    : "Perhatian"}
                </h3>
                <p className="mb-4">{bookingStatus}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setShowBookingConfirmation(false)}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {bookingStatus.includes("berhasil") ? "OK" : "Tutup"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MovieDetails;
