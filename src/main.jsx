import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/tailwind.css";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Login from "./pages/Login.jsx";
import MovieDetails from "./pages/Movie-Details.jsx";
// import SeatSelectionPage from "./pages/Seat.jsx";
// import PaymentInfo from "./pages/PaymentInfo.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movie" element={<Movie />} />
      <Route path="/login" element={<Login />} />
      <Route path="/movie-details" element={<MovieDetails />} />
      {/* <Route path="/seat" element={<SeatSelectionPage />} />
      <Route path="/payment-info" element={<PaymentInfo />} /> */}
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
