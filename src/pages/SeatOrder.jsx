import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Centang from "../assets/svg/centang-date.svg";

const SeatOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Default data jika location.state tidak ada
  const defaultBookingData = {
    movieId: "",
    movieTitle: "Movie not selected",
    moviePoster: "",
    movieGenres: [],
    bookingDate: "",
    formattedDate: "Date not selected",
    bookingTime: "Time not selected",
    bookingCity: "City not selected",
    cinemaId: "",
    cinemaName: "Cinema not selected",
    cinemaImage: "",
  };

  // Mengambil data booking dari location state atau menggunakan default
  const bookingData = location.state || defaultBookingData;

  // State untuk kursi
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [soldSeats, setSoldSeats] = useState([]);
  const [totalPayment, setTotalPayment] = useState(0);
  const ticketPrice = 10;

  // Data kursi love nest (pasangan, 2 kursi bersebelahan)
  const loveNestPairs = [
    ["F9", "F10"],
    ["C1", "C2"],
    ["E7", "E8"],
    ["G10", "G11"],
  ];

  // Flatten loveNestPairs untuk mempermudah pengecekan
  const loveNestSeats = loveNestPairs.flat();

  // Fungsi untuk menangani pemilihan kursi
  const handleSeatSelection = (row, col) => {
    const seatId = `${row}${col}`;

    if (isSeatSold(row, col)) {
      return; // Tidak bisa memilih kursi yang sudah terjual
    }

    if (selectedSeats.includes(seatId)) {
      // Menghapus kursi dari pilihan
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatId);
      setSelectedSeats(updatedSeats);
      setTotalPayment(updatedSeats.length * ticketPrice);
    } else {
      // Menambah kursi ke pilihan
      const updatedSeats = [...selectedSeats, seatId];
      setSelectedSeats(updatedSeats);
      setTotalPayment(updatedSeats.length * ticketPrice);
    }
  };

  // Fungsi untuk mengurutkan kursi berdasarkan baris dan kolom
  const getSortedSeats = () => {
    return [...selectedSeats].sort((a, b) => {
      // Jika baris (huruf pertama) berbeda, urutkan berdasarkan huruf
      if (a[0] !== b[0]) {
        return a[0].localeCompare(b[0]);
      }

      // Jika baris sama, urutkan berdasarkan nomor kolom
      const aCol = parseInt(a.substring(1));
      const bCol = parseInt(b.substring(1));
      return aCol - bCol;
    });
  };

  // Fungsi untuk mengecek status kursi
  const getSeatStatus = (row, col) => {
    const seatId = `${row}${col}`;

    if (isSeatSold(row, col)) {
      return "sold";
    }

    if (selectedSeats.includes(seatId)) {
      return "selected";
    }

    if (isLoveNest(row, col)) {
      return "love-nest";
    }

    return "available";
  };

  // Fungsi untuk mengecek apakah kursi sudah terjual
  const isSeatSold = (row, col) => {
    const seatId = `${row}${col}`;
    return soldSeats.includes(seatId);
  };

  // Fungsi untuk mengecek apakah kursi adalah love nest
  const isLoveNest = (row, col) => {
    const seatId = `${row}${col}`;
    return loveNestSeats.includes(seatId);
  };

  // Handle checkout (ketika user menekan tombol checkout)
  const handleCheckout = () => {
    // Pindahkan semua kursi yang dipilih ke soldSeats
    setSoldSeats([...soldSeats, ...selectedSeats]);
    // Reset kursi yang dipilih setelah checkout
    setSelectedSeats([]);
    setTotalPayment(0);
    // Di sini bisa ditambahkan navigasi ke halaman pembayaran
  };

  // Handle kembali ke halaman movie ticketing jika tidak ada data
  const handleChangeMovie = () => {
    navigate("/movie-ticketing");
  };

  // Membuat grid kursi
  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G"];
    const leftCols = [1, 2, 3, 4, 5, 6, 7];
    const rightCols = [8, 9, 10, 11, 12, 13, 14];

    // Menentukan ukuran kursi berdasarkan lebar layar
    const seatSizeClass = "h-5 w-5 sm:h-6 sm:w-6";
    const gapClass = "gap-1 sm:gap-2";

    return (
      <div className="flex flex-col items-center overflow-x-auto">
        <div className="mb-4 sm:mb-8 mt-2 w-full sm:w-2/3 border-b-2 border-gray-200 pb-2 text-center text-xs sm:text-sm text-gray-400">
          Screen
        </div>

        <div
          className={`max-w-full ${gapClass} grid grid-cols-[auto_repeat(7,1fr)_auto_repeat(7,1fr)]`}
        >
          <div className={`flex flex-col ${gapClass}`}>
            {rows.map((row) => (
              <div
                key={row}
                className={`flex ${seatSizeClass} items-center justify-center text-xs sm:text-sm font-medium text-gray-600`}
              >
                {row}
              </div>
            ))}
          </div>

          {leftCols.map((col) => (
            <div key={`left-${col}`} className={`flex flex-col ${gapClass}`}>
              {rows.map((row) => {
                const status = getSeatStatus(row, col);
                return (
                  <div
                    key={`${row}${col}`}
                    className={`${seatSizeClass} cursor-pointer rounded-sm ${
                      status === "available"
                        ? "border border-gray-300 bg-gray-100 hover:bg-gray-200"
                        : status === "selected"
                        ? "bg-primary"
                        : status === "love-nest"
                        ? "bg-pink-400 hover:bg-pink-500"
                        : "bg-gray-500"
                    }`}
                    onClick={() => handleSeatSelection(row, col)}
                    title={`${row}${col}`}
                  ></div>
                );
              })}
            </div>
          ))}

          <div className={`flex flex-col ${gapClass}`}>
            {rows.map((row) => (
              <div key={`gap-${row}`} className={`${seatSizeClass}`}></div>
            ))}
          </div>

          {rightCols.map((col) => (
            <div key={`right-${col}`} className={`flex flex-col ${gapClass}`}>
              {rows.map((row) => {
                const status = getSeatStatus(row, col);
                return (
                  <div
                    key={`${row}${col}`}
                    className={`${seatSizeClass} cursor-pointer rounded-sm ${
                      status === "available"
                        ? "border border-gray-300 bg-gray-100 hover:bg-gray-200"
                        : status === "selected"
                        ? "bg-primary"
                        : status === "love-nest"
                        ? "bg-pink-400 hover:bg-pink-500"
                        : "bg-gray-500"
                    }`}
                    onClick={() => handleSeatSelection(row, col)}
                    title={`${row}${col}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>

        <div
          className={`mt-1 sm:mt-2 ${gapClass} grid grid-cols-[auto_repeat(7,1fr)_auto_repeat(7,1fr)]`}
        >
          <div className={`${seatSizeClass}`}></div>
          {leftCols.map((col) => (
            <div
              key={`num-left-${col}`}
              className={`${seatSizeClass} flex items-center justify-center text-xs text-gray-600`}
            >
              {col}
            </div>
          ))}
          <div className={`${seatSizeClass}`}></div>
          {rightCols.map((col) => (
            <div
              key={`num-right-${col}`}
              className={`${seatSizeClass} flex items-center justify-center text-xs text-gray-600`}
            >
              {col}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow bg-white py-4 sm:py-8">
        <div className="container mx-auto px-4 pt-16 sm:pt-24 mb-6 sm:mb-10">
          {/* Progress steps - lebih responsif */}
          <div className="mb-6 sm:mb-10 flex justify-center">
            <div className="flex items-center max-w-full overflow-x-auto">
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-green-700 text-white">
                  <img
                    src={Centang}
                    alt="Completed"
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  />
                </div>
                <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  Dates And Time
                </span>
              </div>
              <div className="w-8 sm:w-16 border-t border-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-primary text-white text-xs sm:text-base">
                  2
                </div>
                <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  Seat
                </span>
              </div>
              <div className="w-8 sm:w-16 border-t border-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-gray-400 text-white text-xs sm:text-base">
                  3
                </div>
                <span className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 whitespace-nowrap">
                  Payment
                </span>
              </div>
            </div>
          </div>

          {/* Informasi Movie Details */}
          <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row">
            <div className="flex-grow rounded-lg bg-white p-4 sm:p-6 shadow-sm">
              <div className="mb-4 sm:mb-6 border-b pb-4">
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                  {bookingData.moviePoster ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${bookingData.moviePoster}`}
                      alt={bookingData.movieTitle}
                      className="w-full sm:w-[184px] h-auto sm:h-[117px] rounded object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/184x117?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full sm:w-[184px] h-[117px] rounded bg-gray-200 flex items-center justify-center">
                      No Image
                    </div>
                  )}
                  <div className="flex flex-col gap-2 w-full">
                    <h2 className="text-lg sm:text-xl font-semibold">
                      {bookingData.movieTitle}
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {bookingData.movieGenres.length > 0 ? (
                        bookingData.movieGenres.map((genre, index) => (
                          <span
                            key={index}
                            className="rounded bg-gray-100 px-2 sm:px-3 py-1 text-xs text-gray-500"
                          >
                            {genre}
                          </span>
                        ))
                      ) : (
                        <span className="rounded bg-gray-100 px-2 sm:px-3 py-1 text-xs text-gray-500">
                          No genres available
                        </span>
                      )}
                    </div>
                    <div className="mt-2 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">
                        {bookingData.cinemaName} - {bookingData.bookingTime}
                      </span>
                      <button
                        onClick={handleChangeMovie}
                        className="mt-2 sm:mt-0 cursor-pointer rounded bg-primary px-3 sm:px-4 py-1 text-xs sm:text-sm text-white sm:ml-4"
                      >
                        Change Movie
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-3 sm:mb-6 text-base sm:text-lg font-semibold">
                  Choose Your Seat
                </h3>
                <div className="overflow-x-auto pb-2">{renderSeats()}</div>

                <div className="mt-6 sm:mt-8">
                  <h4 className="mb-2 sm:mb-4 text-xs sm:text-sm font-medium">
                    Seating key
                  </h4>
                  <div className="flex flex-wrap gap-3 sm:gap-6">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm border border-gray-300 bg-gray-100"></div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Available
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm bg-primary"></div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Selected
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm bg-pink-400"></div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Love nest
                      </span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm bg-gray-500"></div>
                      <span className="text-xs sm:text-sm text-gray-600">
                        Sold
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Kupon Seat */}
            <div className="relative w-full rounded-lg bg-white p-4 sm:p-6 shadow-sm lg:w-80">
              <div className="mb-4 sm:mb-6 text-center">
                {bookingData.cinemaImage ? (
                  <img
                    src={bookingData.cinemaImage}
                    className="w-[100px] sm:w-[124px] h-[20px] sm:h-[24px] mx-auto"
                    alt={bookingData.cinemaName}
                  />
                ) : (
                  <div className="w-[100px] sm:w-[124px] h-[20px] sm:h-[24px] mx-auto bg-gray-200"></div>
                )}
                <p className="text-lg sm:text-[22px]">
                  {bookingData.cinemaName}
                </p>
              </div>
              <div className="space-y-3 sm:space-y-4 border-b pb-4 sm:pb-6 text-xs sm:text-[13.6px]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Movie selected</span>
                  <span className="text-right font-medium overflow-hidden overflow-ellipsis max-w-[150px] sm:max-w-[200px]">
                    {bookingData.movieTitle}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    {bookingData.formattedDate}
                  </span>
                  <span className="font-medium">{bookingData.bookingTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">One ticket price</span>
                  <span className="font-medium">${ticketPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seat choosed</span>
                  <span className="font-medium">
                    {getSortedSeats().length > 0
                      ? getSortedSeats().join(", ")
                      : "No seats selected"}
                  </span>
                </div>
              </div>
              <div className="flex justify-between py-3 sm:py-6">
                <span className="text-base sm:text-lg font-semibold">
                  Total Payment
                </span>
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  ${totalPayment}
                </span>
              </div>
              <button
                onClick={() => {
                  handleCheckout();
                  navigate("/payment-info", {
                    state: {
                      ...bookingData,
                      selectedSeats: getSortedSeats(),
                      totalPayment: totalPayment,
                    },
                  });
                }}
                className={`w-full mt-4 sm:mt-10 cursor-pointer rounded-md py-2 sm:py-3 text-sm sm:text-base text-white transition-colors hover:bg-white hover:text-primary hover:border-[2px] ${
                  selectedSeats.length > 0 ? "bg-primary" : "bg-gray-400"
                }`}
                disabled={selectedSeats.length === 0}
              >
                Checkout now
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeatOrder;
