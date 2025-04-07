import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedMovie: null,
  selectedDate: null,
  selectedTime: null,
  selectedCity: null,
  selectedCinema: null,
  selectedSeats: [],
  ticketPrice: 0,
  totalPrice: 0,
  paymentMethod: null,
  orderHistory: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Action untuk memilih film
    selectMovie: (state, action) => {
      state.selectedMovie = action.payload;
      state.selectedDate = null;
      state.selectedTime = null;
      state.selectedCity = null;
      state.selectedCinema = null;
      state.selectedSeats = [];
    },

    // Action untuk memilih tanggal
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
    },

    // Action untuk memilih waktu
    selectTime: (state, action) => {
      state.selectedTime = action.payload;
    },

    // Action untuk memilih kota
    selectCity: (state, action) => {
      state.selectedCity = action.payload;
      state.selectedCinema = null; // Reset cinema ketika kota berubah
    },

    // Action untuk memilih bioskop
    selectCinema: (state, action) => {
      state.selectedCinema = action.payload;
    },

    // Action untuk memilih kursi
    selectSeats: (state, action) => {
      state.selectedSeats = action.payload.seats;
      state.ticketPrice = action.payload.price;
      state.totalPrice = action.payload.seats.length * action.payload.price;
    },

    // Action untuk memilih metode pembayaran
    selectPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    // Action untuk menyelesaikan pemesanan
    completeOrder: (state) => {
      if (
        state.selectedMovie &&
        state.selectedDate &&
        state.selectedTime &&
        state.selectedCity &&
        state.selectedCinema &&
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
          totalPrice: state.totalPrice,
          paymentMethod: state.paymentMethod,
          orderDate: new Date().toISOString(),
        };

        state.orderHistory.push(newOrder);
        // Reset state setelah order selesai
        Object.assign(state, initialState, {
          orderHistory: state.orderHistory,
        });
      }
    },

    // Action untuk reset order
    resetOrder: (state) => {
      Object.assign(state, initialState, { orderHistory: state.orderHistory });
    },

    // Action untuk loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Action untuk error handling
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  selectMovie,
  selectDate,
  selectTime,
  selectCity,
  selectCinema,
  selectSeats,
  selectPaymentMethod,
  completeOrder,
  resetOrder,
  setLoading,
  setError,
} = orderSlice.actions;

export default orderSlice.reducer;
