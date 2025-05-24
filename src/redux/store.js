import { configureStore } from "@reduxjs/toolkit";

import orderReducer from "./slices/orderSlice.js";

// Membuat dan mengkonfigurasi store Redux
export const store = configureStore({
  // Mendefinisikan reducer yang akan digunakan dalam aplikasi
  // Saat ini hanya menggunakan orderReducer untuk state 'order'
  reducer: {
    order: orderReducer,
  },

  // Menggunakan middleware default dari Redux Toolkit
  // Ini termasuk thunk, serialisable check, dll.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),

  // Mengaktifkan Redux DevTools hanya pada mode development
  // DevTools akan dinonaktifkan saat aplikasi berjalan di production
  devTools: process.env.NODE_ENV !== "production",
});

// Mengekspor store sebagai default export
export default store;
