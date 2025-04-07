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

  // State untuk fitur filter
  const [filteredCinemas, setFilteredCinemas] = useState(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showFilterMessage, setShowFilterMessage] = useState(false);
  const [filterMessage, setFilterMessage] = useState("");

  const API_KEY = "6269e9b68e0c503c6621dfd9e2c6da29";
  const BASE_URL = "https://api.themoviedb.org/3";

  // Data bioskop berdasarkan halaman paginasi
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

  // Semua data bioskop dalam array datar untuk keperluan filter
  const allCinemas = Object.values(cinemasByPage).flat();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Mendapatkan tanggal hari ini untuk nilai minimum input date
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // Mengambil data daftar genre film
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
        console.error("Error mengambil data genre:", error);
      }
    };

    // Mengambil detail film dari API
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

        // Mengambil kredit untuk sutradara dan pemeran
        const creditsResponse = await fetch(
          `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
        );
        const creditsData = await creditsResponse.json();

        // Mendapatkan data sutradara
        const directorInfo = creditsData.crew.find(
          (person) => person.job === "Director"
        );
        setDirector(directorInfo ? directorInfo.name : "Unknown");

        // Mendapatkan 3 pemain utama
        setCast(creditsData.cast.slice(0, 3).map((actor) => actor.name));

        setLoading(false);
      } catch (error) {
        console.error("Error mengambil detail film:", error);
        setLoading(false);
      }
    };

    fetchGenres();
    fetchMovieDetails();
  }, [id, navigate]);

  // Mengubah format durasi dari menit ke jam dan menit
  const formatRuntime = (minutes) => {
    if (!minutes) return "Unknown";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} hours ${mins} minutes`;
  };

  // Memformat tanggal ke format yang lebih mudah dibaca
  const formatDate = (dateString) => {
    if (!dateString || dateString === "choose") return "Unknown";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Memfilter bioskop berdasarkan kota yang dipilih
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

  // Memeriksa apakah bioskop tersedia berdasarkan filter yang aktif
  const isCinemaAvailable = (cinemaId) => {
    if (!hasSelectedDate || !hasSelectedTime || !hasSelectedCity) return true;

    const availableCinemas = filterCinemasByCity(bookingCity);
    return availableCinemas.some((cinema) => cinema.id === cinemaId);
  };

  // Menangani klik tombol filter
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

    // Menghapus pesan validasi saat tombol filter diklik
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
    // Menyembunyikan pesan sukses filter setelah 5.25 detik
    setTimeout(() => setShowFilterMessage(false), 5250);
    setActivePage(1);
  };

  // Menangani pemilihan bioskop
  const handleCinemaSelect = (cinemaId) => {
    const selectedCinemaObject = allCinemas.find(
      (cinema) => cinema.id === cinemaId
    );

    // Memeriksa apakah semua filter telah dipilih
    if (hasSelectedDate && hasSelectedTime && hasSelectedCity) {
      // Memeriksa apakah bioskop tersedia dengan filter yang aktif
      if (!isCinemaAvailable(cinemaId)) {
        setFilterMessage(
          `Bioskop ${selectedCinemaObject.name} tidak tersedia pada waktu dan lokasi yang dipilih. Gunakan filter untuk melihat daftar bioskop yang tersedia.`
        );
        setShowFilterMessage(true);
        // Tidak perlu set timeout untuk menyembunyikan pesan
        return;
      }
    }

    // Jika memilih bioskop berbeda, hapus pesan validasi
    if (selectedCinema !== cinemaId) {
      setShowFilterMessage(false);
    }

    setSelectedCinema(cinemaId);
  };

  // Menangani perubahan halaman paginasi
  const handlePageChange = (page) => {
    setActivePage(page);
    setSelectedCinema("");
    // Menghapus pesan validasi saat mengganti halaman
    setShowFilterMessage(false);
  };

  // Menangani pemilihan tanggal
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    // Menghapus pesan validasi saat filter diubah
    setShowFilterMessage(false);

    if (selectedDate !== "choose") {
      setBookingDate(selectedDate);
      setHasSelectedDate(true);
      setIsFiltered(false);
      setFilteredCinemas(null);

      // Hapus pilihan bioskop jika tidak tersedia dengan tanggal baru
      if (selectedCinema && !isCinemaAvailable(selectedCinema)) {
        setSelectedCinema("");
      }
    } else {
      setBookingDate(selectedDate);
      setHasSelectedDate(false);
    }
  };

  // Menangani pemilihan waktu
  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    // Menghapus pesan validasi saat filter diubah
    setShowFilterMessage(false);

    if (selectedTime !== "choose") {
      setBookingTime(selectedTime);
      setHasSelectedTime(true);
      setIsFiltered(false);
      setFilteredCinemas(null);

      // Hapus pilihan bioskop jika tidak tersedia dengan waktu baru
      if (selectedCinema && !isCinemaAvailable(selectedCinema)) {
        setSelectedCinema("");
      }
    } else {
      setBookingTime(selectedTime);
      setHasSelectedTime(false);
    }
  };

  // Menangani pemilihan kota
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    // Menghapus pesan validasi saat filter diubah
    setShowFilterMessage(false);

    if (selectedCity !== "choose") {
      setBookingCity(selectedCity);
      setHasSelectedCity(true);
      setIsFiltered(false);
      setFilteredCinemas(null);

      // Hapus pilihan bioskop jika tidak tersedia di kota baru
      if (selectedCinema && !isCinemaAvailable(selectedCinema)) {
        setSelectedCinema("");
      }
    } else {
      setBookingCity(selectedCity);
      setHasSelectedCity(false);
    }
  };

  // Menangani pemesanan - navigasi ke halaman pemilihan kursi
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

    // Memeriksa apakah bioskop tersedia dengan filter saat ini
    if (!isCinemaAvailable(selectedCinema)) {
      const selectedCinemaDetails = allCinemas.find(
        (cinema) => cinema.id === selectedCinema
      );

      setFilterMessage(
        `Bioskop ${selectedCinemaDetails.name} tidak tersedia pada waktu dan lokasi yang dipilih. Gunakan filter untuk melihat daftar bioskop yang tersedia.`
      );
      setShowFilterMessage(true);
      // Tidak perlu set timeout untuk menyembunyikan pesan
      return;
    }

    const selectedCinemaDetails = allCinemas.find(
      (cinema) => cinema.id === selectedCinema
    );

    // Menyiapkan data pemesanan untuk dikirim ke halaman pemilihan kursi
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

    // Navigasi ke halaman pemilihan kursi dengan data pemesanan
    navigate("/seat-order", { state: bookingData });
  };

  // Mendapatkan daftar bioskop yang akan ditampilkan berdasarkan status filter dan paginasi
  const getCinemasToDisplay = () => {
    if (isFiltered && filteredCinemas) {
      const startIndex = (activePage - 1) * 4;
      const endIndex = startIndex + 4;
      return filteredCinemas.slice(startIndex, endIndex);
    } else {
      return cinemasByPage[activePage] || [];
    }
  };

  // Menghitung total halaman untuk paginasi
  const getTotalPages = () => {
    if (isFiltered && filteredCinemas) {
      return Math.ceil(filteredCinemas.length / 4);
    } else {
      return Object.keys(cinemasByPage).length;
    }
  };

  // Mendapatkan tanggal hari ini untuk atribut min di input date
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

      {/* Gambar Latar Belakang Film - Responsif */}
      <div
        className="w-full h-[200px] xs:h-[250px] sm:h-[300px] md:h-[350px] lg:h-[415px] bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          backgroundPosition: "center 25%",
          backgroundSize: "cover",
        }}
      ></div>

      {/* Detail Film - Kontainer Responsif */}
      <div className="mx-3 xs:mx-4 md:mx-8 lg:mx-[70px] p-3 xs:p-4 md:p-6 bg-white mt-4 xs:mt-6 rounded-md shadow-sm">
        {/* Bagian Informasi Film - Flex Responsif */}
        <div className="relative flex flex-col md:flex-row md:items-start mb-0 gap-4 md:gap-6">
          {/* Poster Film - Ukuran dan Posisi Responsif */}
          <div className="relative -mt-16 xs:-mt-20 md:-mt-32 lg:-mt-40 w-full max-w-[180px] xs:max-w-[220px] md:max-w-[264px] mx-auto md:mx-0 z-10">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-auto rounded-md shadow-lg"
            />
          </div>

          {/* Detail Film - Layout Responsif */}
          <div className="flex-1 mt-2 xs:mt-4 md:mt-0">
            <h2 className="text-xl xs:text-2xl md:text-3xl font-bold text-center md:text-left">
              {movie.title}
            </h2>

            {/* Genre Film - Responsif */}
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

            {/* Grid Informasi Film - Layout Responsif */}
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

        {/* Bagian Sinopsis */}
        <div className="mt-5 xs:mt-6 md:mt-8">
          <h3 className="text-lg xs:text-xl font-semibold">Synopsis</h3>
          <p className="text-sm xs:text-base text-gray-700 mt-2">
            {movie.overview}
          </p>
        </div>

        {/* UPDATED BOOKING SECTION - TO MATCH SCREENSHOT */}
        <div className="mt-8">
          <h1 className="text-2xl font-bold mb-8">Book Tickets</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <h2 className="font-medium mb-2">Choose Date</h2>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 2V6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 2V6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 10H21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <select
                  value={bookingDate}
                  onChange={handleDateChange}
                  className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-md cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="choose" disabled={hasSelectedDate}>
                    Choose Date
                  </option>
                  <option value={today}>21/07/20</option>
                  {[...Array(7)].map((_, i) => {
                    const nextDate = new Date();
                    nextDate.setDate(nextDate.getDate() + i + 1);
                    const nextDateStr = nextDate.toISOString().split("T")[0];
                    return (
                      <option key={i} value={nextDateStr}>
                        {nextDate.getDate()}/{nextDate.getMonth() + 1}/
                        {nextDate.getFullYear().toString().substr(-2)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div>
              <h2 className="font-medium mb-2">Choose Time</h2>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="9"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M12 7V12L15 15"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <select
                  value={bookingTime}
                  onChange={handleTimeChange}
                  className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-md cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              </div>
            </div>

            <div>
              <h2 className="font-medium mb-2">Choose Location</h2>
              <div className="relative flex items-center">
                <div className="absolute left-3 top-3">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="3"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <select
                  value={bookingCity}
                  onChange={handleCityChange}
                  className="w-full py-3 pl-10 pr-4 bg-gray-100 rounded-md cursor-pointer border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="choose" disabled={hasSelectedCity}>
                    Choose Location
                  </option>
                  <option value="Purwokerto">Purwokerto</option>
                  <option value="Jakarta">Jakarta</option>
                  <option value="Bandung">Bandung</option>
                  <option value="Yogyakarta">Yogyakarta</option>
                  <option value="Surabaya">Surabaya</option>
                  <option value="Bali">Bali</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleFilter}
            className={`w-full md:w-auto px-8 py-3 rounded-md text-white font-medium transition ${
              bookingDate !== "choose" &&
              bookingTime !== "choose" &&
              bookingCity !== "choose"
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-blue-400 cursor-not-allowed"
            }`}
            disabled={
              bookingDate === "choose" ||
              bookingTime === "choose" ||
              bookingCity === "choose"
            }
          >
            Filter
          </button>

          {/* Pesan Filter */}
          {showFilterMessage && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-blue-800">
              {filterMessage}
            </div>
          )}

          {/* Indikator Filter Aktif */}
          {isFiltered && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-700">
                <span className="font-semibold">Filter aktif:</span>{" "}
                {bookingCity}, {formatDate(bookingDate)}, {bookingTime}
              </span>
              <button
                onClick={() => {
                  setIsFiltered(false);
                  setFilteredCinemas(null);
                  setActivePage(1);
                  setShowFilterMessage(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Choose Cinema Section - UPDATED TO MATCH SCREENSHOT */}
        <div className="mt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Choose Cinema</h2>
            {isFiltered && filteredCinemas && (
              <span className="text-gray-500 text-sm">39 Result</span>
            )}
          </div>

          {isFiltered && filteredCinemas && filteredCinemas.length === 0 ? (
            <div className="p-4 bg-gray-50 rounded text-center">
              Tidak ada bioskop yang tersedia dengan filter yang dipilih.
              Silahkan ubah filter Anda.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                {getCinemasToDisplay().map((cinema) => (
                  <button
                    key={cinema.id}
                    onClick={() => handleCinemaSelect(cinema.id)}
                    className={`relative h-32 rounded-md cursor-pointer border-2 p-4 flex items-center justify-center ${
                      selectedCinema === cinema.id
                        ? "border-blue-600 bg-blue-500"
                        : cinema.id === "hiflix-1"
                        ? "bg-blue-600 border-blue-600"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={cinema.image}
                      alt={cinema.name}
                      className={`max-h-12 object-contain ${
                        cinema.id === "hiflix-1" ? "brightness-0 invert" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Pagination */}
              {getTotalPages() > 1 && (
                <div className="flex justify-center gap-2 mb-8">
                  {[...Array(getTotalPages())].map((_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
                      className={`cursor-pointer w-8 h-8 border rounded flex items-center justify-center text-sm ${
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

          {/* Tombol Pesan Sekarang */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleBookNow}
              className={`cursor-pointer w-full px-6 py-3 rounded text-sm ${
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
