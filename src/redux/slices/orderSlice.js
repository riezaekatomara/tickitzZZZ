import { createSlice } from "@reduxjs/toolkit";

// State awal untuk order slice
const initialState = {
  selectedMovie: {
    id: null,
    title: null,
    poster: null,
    backdrop: null,
    genres: [],
    overview: null,
    releaseDate: null,
    runtime: null,
  },
  selectedDate: null,
  selectedTime: null,
  selectedCity: null,
  selectedCinema: {
    id: null,
    name: null,
    image: null,
  },
  selectedSeats: [],
  ticketPrice: 0,
  totalPrice: 0,
  paymentMethod: null,
  orderHistory: [],
  isLoading: false,
  error: null,
};

// Membuat slice dengan createSlice dari Redux Toolkit
const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Action untuk memilih film
    selectMovie: (state, action) => {
      state.selectedMovie = {
        id: action.payload.id,
        title: action.payload.title,
        poster: action.payload.poster,
        backdrop: action.payload.backdrop,
        genres: action.payload.genres || [],
        overview: action.payload.overview,
        releaseDate: action.payload.releaseDate,
        runtime: action.payload.runtime || null,
      };
      // Mengatur ulang semua pilihan terkait ketika film berubah
      state.selectedDate = null;
      state.selectedTime = null;
      state.selectedCity = null;
      state.selectedCinema = { id: null, name: null, image: null };
      state.selectedSeats = [];
      state.ticketPrice = 0;
      state.totalPrice = 0;
      state.paymentMethod = null;
    },

    // Action untuk memilih tanggal
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
      // Mengatur ulang waktu dan kursi ketika tanggal berubah
      state.selectedTime = null;
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action untuk memilih waktu
    selectTime: (state, action) => {
      state.selectedTime = action.payload;
      // Mengatur ulang kursi ketika waktu berubah
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action untuk memilih kota
    selectCity: (state, action) => {
      state.selectedCity = action.payload;
      // Mengatur ulang bioskop dan kursi ketika kota berubah
      state.selectedCinema = { id: null, name: null, image: null };
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action untuk memilih bioskop
    selectCinema: (state, action) => {
      state.selectedCinema = {
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
      };
      // Mengatur ulang kursi ketika bioskop berubah
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action untuk memilih kursi
    selectSeats: (state, action) => {
      state.selectedSeats = action.payload.seats;
      state.ticketPrice = action.payload.price;
      state.totalPrice = action.payload.seats.length * action.payload.price;
    },

    // Action untuk menghapus kursi yang dipilih
    clearSeats: (state) => {
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action untuk memilih metode pembayaran
    selectPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    // Action untuk menyelesaikan pesanan
    completeOrder: (state) => {
      if (
        state.selectedMovie.id &&
        state.selectedDate &&
        state.selectedTime &&
        state.selectedCity &&
        state.selectedCinema.id &&
        state.selectedSeats.length > 0 &&
        state.paymentMethod
      ) {
        const newOrder = {
          id: Date.now(),
          movie: state.selectedMovie,
          date: state.selectedDate,
          time: state.selectedTime,
          city: state.selectedCity,
          cinema: state.selectedCinema,
          seats: state.selectedSeats,
          ticketPrice: state.ticketPrice,
          totalPrice: state.totalPrice,
          paymentMethod: state.paymentMethod,
          orderDate: new Date().toISOString(),
        };

        state.orderHistory.push(newOrder);

        // Mengatur ulang state setelah pesanan selesai tetapi tetap menyimpan riwayat
        Object.assign(state, {
          ...initialState,
          orderHistory: state.orderHistory,
        });
      }
    },

    // Action untuk mengatur ulang state pesanan
    resetOrder: (state) => {
      Object.assign(state, {
        ...initialState,
        orderHistory: state.orderHistory,
      });
    },

    // Action untuk mengatur status loading
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Action untuk menangani error
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Action untuk menghapus error
    clearError: (state) => {
      state.error = null;
    },

    // Action untuk memperbarui harga tiket
    updateTicketPrice: (state, action) => {
      state.ticketPrice = action.payload;
      if (state.selectedSeats.length > 0) {
        state.totalPrice = state.selectedSeats.length * action.payload;
      }
    },
  },
});

// Ekspor semua action
export const {
  selectMovie,
  selectDate,
  selectTime,
  selectCity,
  selectCinema,
  selectSeats,
  clearSeats,
  selectPaymentMethod,
  completeOrder,
  resetOrder,
  setLoading,
  setError,
  clearError,
  updateTicketPrice,
} = orderSlice.actions;

// Selector untuk mengakses state
export const selectSelectedMovie = (state) => state.order.selectedMovie;
export const selectSelectedDate = (state) => state.order.selectedDate;
export const selectSelectedTime = (state) => state.order.selectedTime;
export const selectSelectedCity = (state) => state.order.selectedCity;
export const selectSelectedCinema = (state) => state.order.selectedCinema;
export const selectSelectedSeats = (state) => state.order.selectedSeats;
export const selectTicketPrice = (state) => state.order.ticketPrice;
export const selectTotalPrice = (state) => state.order.totalPrice;
export const selectChosenPayment = (state) => state.order.paymentMethod;
export const selectOrderHistory = (state) => state.order.orderHistory;
export const selectOrderLoading = (state) => state.order.isLoading;
export const selectOrderError = (state) => state.order.error;

// Ekspor reducer
export default orderSlice.reducer;
