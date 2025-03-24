import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import Centang from "../assets/svg/centang-date.svg";
import Cine from "../assets/svg/Cine.svg";

const SeatOrder = () => {
  // State untuk kursi yang dipilih
  const [selectedSeats, setSelectedSeats] = useState(["C4", "C5", "C6"]);
  const [totalPayment, setTotalPayment] = useState(30);
  const ticketPrice = 10;

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

  // Fungsi untuk mengecek status kursi
  const getSeatStatus = (row, col) => {
    const seatId = `${row}${col}`;

    if (isSeatSold(row, col)) {
      return "sold";
    }

    if (isLoveNest(row, col)) {
      return "love-nest";
    }

    if (selectedSeats.includes(seatId)) {
      return "selected";
    }

    return "available";
  };

  // Fungsi untuk mengecek apakah kursi sudah terjual
  const isSeatSold = (row, col) => {
    // Data kursi yang sudah terjual (hardcoded berdasarkan gambar)
    const soldSeats = [
      "A6",
      "B1",
      "B2",
      "B7",
      "D2",
      "D7",
      "D12",
      "E4",
      "F13",
      "G3",
      "A12",
      "C8",
      "C12",
      "D9",
      "E12",
    ];

    return soldSeats.includes(`${row}${col}`);
  };

  // Fungsi untuk mengecek apakah kursi adalah love nest
  const isLoveNest = (row, col) => {
    // Data kursi love nest (hardcoded berdasarkan gambar)
    const loveNestSeats = ["F9", "F10", "F11"];

    return loveNestSeats.includes(`${row}${col}`);
  };

  // Membuat grid kursi
  const renderSeats = () => {
    const rows = ["A", "B", "C", "D", "E", "F", "G"];
    const leftCols = [1, 2, 3, 4, 5, 6, 7];
    const rightCols = [8, 9, 10, 11, 12, 13, 14];

    return (
      <div className="flex flex-col items-center">
        <div className="mb-8 mt-2 w-2/3 border-b-2 border-gray-200 pb-2 text-center text-sm text-gray-400">
          Screen
        </div>

        <div className="grid grid-cols-[auto_repeat(7,1fr)_auto_repeat(7,1fr)] gap-3">
          <div className="flex flex-col gap-2">
            {rows.map((row) => (
              <div
                key={row}
                className="flex h-6 w-6 items-center justify-center text-sm font-medium text-gray-600"
              >
                {row}
              </div>
            ))}
          </div>

          {leftCols.map((col) => (
            <div key={`left-${col}`} className="flex flex-col gap-2">
              {rows.map((row) => {
                const status = getSeatStatus(row, col);
                return (
                  <div
                    key={`${row}${col}`}
                    className={`h-6 w-6 cursor-pointer rounded-sm ${
                      status === "available"
                        ? "border border-gray-300 bg-gray-100 hover:bg-gray-200"
                        : status === "selected"
                        ? "bg-primary"
                        : status === "love-nest"
                        ? "bg-pink-400"
                        : "bg-gray-500"
                    }`}
                    onClick={() => handleSeatSelection(row, col)}
                  ></div>
                );
              })}
            </div>
          ))}

          <div className="flex flex-col gap-2">
            {rows.map((row) => (
              <div key={`gap-${row}`} className="h-6 w-6"></div>
            ))}
          </div>

          {rightCols.map((col) => (
            <div key={`right-${col}`} className="flex flex-col gap-2">
              {rows.map((row) => {
                const status = getSeatStatus(row, col);
                return (
                  <div
                    key={`${row}${col}`}
                    className={`h-6 w-6 cursor-pointer rounded-sm ${
                      status === "available"
                        ? "border border-gray-300 bg-gray-100 hover:bg-gray-200"
                        : status === "selected"
                        ? "bg-primary"
                        : status === "love-nest"
                        ? "bg-pink-400"
                        : "bg-gray-500"
                    }`}
                    onClick={() => handleSeatSelection(row, col)}
                  ></div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-[auto_repeat(7,1fr)_auto_repeat(7,1fr)] gap-3">
          <div className="h-6 w-6"></div>
          {leftCols.map((col) => (
            <div
              key={`num-left-${col}`}
              className="h-6 w-6 flex items-center justify-center text-xs text-gray-600"
            >
              {col}
            </div>
          ))}
          <div className="h-6 w-6"></div>
          {rightCols.map((col) => (
            <div
              key={`num-right-${col}`}
              className="h-6 w-6 flex items-center justify-center text-xs text-gray-600"
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

      <main className="flex-grow bg-gray-100 py-8">
        <div className="container mx-auto px-24 mb-10">
          <div className="mb-10 flex justify-center">
            <div className="flex items-center">
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-700 text-white">
                  <img src={Centang}></img>
                </div>
                <span className="mt-2 text-sm text-gray-600">
                  Dates And Time
                </span>
              </div>
              <div className="w-16 border-t border-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                  2
                </div>
                <span className="mt-2 text-sm text-gray-600">Seat</span>
              </div>
              <div className="w-16 border-t border-gray-300"></div>
              <div className="flex flex-col items-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white">
                  3
                </div>
                <span className="mt-2 text-sm text-gray-600">Payment</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="flex-grow rounded-lg bg-white p-6 shadow-sm">
              <div className="mb-6 border-b pb-4">
                <div className="flex items-start gap-4">
                  <img
                    src="../../src/assets/png/spiderman05.png"
                    alt="Spider-Man Homecoming"
                    className="w-[184px] h-[117px] rounded"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-xl font-semibold">
                      Spider-Man: Homecoming
                    </h2>
                    <div className="flex gap-2">
                      <span className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-500">
                        Action
                      </span>
                      <span className="rounded bg-gray-100 px-3 py-1 text-xs text-gray-500">
                        Adventure
                      </span>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Regular - 13:00 PM
                      </span>
                      <button className="cursor-pointer relative left-34 rounded bg-primary px-4 py-1 text-sm text-white">
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="mb-6 text-lg font-semibold">Choose Your Seat</h3>
                {renderSeats()}

                <div className="mt-8">
                  <h4 className="mb-4 text-sm font-medium">Seating key</h4>
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-sm border border-gray-300 bg-gray-100"></div>
                      <span className="text-sm text-gray-600">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-sm bg-primary"></div>
                      <span className="text-sm text-gray-600">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-sm bg-pink-400"></div>
                      <span className="text-sm text-gray-600">Love nest</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-sm bg-gray-500"></div>
                      <span className="text-sm text-gray-600">Sold</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative w-full h-86 rounded-lg bg-white p-6 shadow-sm lg:w-80">
              <div className="mb-6 text-center">
                <img
                  src={Cine}
                  className="w-[124px] h-[24px] relative left-18"
                ></img>
                <p className="text-[22px]">CineOne21 Cinema</p>
              </div>
              <div className="space-y-4 border-b pb-6 text-[13.6px]">
                <div className="flex justify-between ">
                  <span className="text-gray-500">Movie selected</span>
                  <span className="text-right font-medium">
                    Spider-Man: Homecoming
                  </span>
                </div>
                <div className="flex justify-between ">
                  <span className="text-gray-500">Tuesday, 07 July 2020</span>
                  <span className="font-medium">13:00pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">One ticket price</span>
                  <span className="font-medium">${ticketPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Seat choosed</span>
                  <span className="font-medium">
                    {selectedSeats.join(", ")}
                  </span>
                </div>
              </div>
              <div className="flex justify-between py-6">
                <span className="text-lg font-semibold">Total Payment</span>
                <span className="text-2xl font-bold text-primary">
                  ${totalPayment}
                </span>
              </div>
              <Link to="/payment-info">
                <button className="absolute right-[0.1px] mt-10 cursor-pointer w-full rounded-md bg-primary py-3 text-white transition-colors hover:bg-white hover:text-primary hover:border-[2px]">
                  Checkout now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeatOrder;
