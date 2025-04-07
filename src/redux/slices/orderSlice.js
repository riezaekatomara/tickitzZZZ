import { createSlice } from "@reduxjs/toolkit";

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

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // Action to select a movie
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
      // Reset all related selections when movie changes
      state.selectedDate = null;
      state.selectedTime = null;
      state.selectedCity = null;
      state.selectedCinema = { id: null, name: null, image: null };
      state.selectedSeats = [];
      state.ticketPrice = 0;
      state.totalPrice = 0;
      state.paymentMethod = null;
    },

    // Action to select a date
    selectDate: (state, action) => {
      state.selectedDate = action.payload;
      // Reset time and seats when date changes
      state.selectedTime = null;
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action to select a time
    selectTime: (state, action) => {
      state.selectedTime = action.payload;
      // Reset seats when time changes
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action to select a city
    selectCity: (state, action) => {
      state.selectedCity = action.payload;
      // Reset cinema and seats when city changes
      state.selectedCinema = { id: null, name: null, image: null };
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action to select a cinema
    selectCinema: (state, action) => {
      state.selectedCinema = {
        id: action.payload.id,
        name: action.payload.name,
        image: action.payload.image,
      };
      // Reset seats when cinema changes
      state.selectedSeats = [];
      state.totalPrice = 0;
    },

    // Action to select seats
    selectSeats: (state, action) => {
      state.selectedSeats = action.payload.seats;
      state.ticketPrice = action.payload.price;
      state.totalPrice = action.payload.seats.length * action.payload.price;
    },

    // Action to select payment method
    selectPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },

    // Action to complete an order
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

        // Reset state after order completion but keep history
        Object.assign(state, {
          ...initialState,
          orderHistory: state.orderHistory,
        });
      }
    },

    // Action to reset order state
    resetOrder: (state) => {
      Object.assign(state, {
        ...initialState,
        orderHistory: state.orderHistory,
      });
    },

    // Action to set loading state
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    // Action for error handling
    setError: (state, action) => {
      state.error = action.payload;
    },

    // Action to clear error
    clearError: (state) => {
      state.error = null;
    },

    // Action to update ticket price
    updateTicketPrice: (state, action) => {
      state.ticketPrice = action.payload;
      if (state.selectedSeats.length > 0) {
        state.totalPrice = state.selectedSeats.length * action.payload;
      }
    },
  },
});

// Export actions
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

// Selectors
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

// Export reducer
export default orderSlice.reducer;
