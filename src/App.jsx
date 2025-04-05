import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import MovieDetails from "./pages/MovieDetails.jsx";
import SeatOrder from "./pages/SeatOrder.jsx";
import PaymentInfo from "./pages/PaymentInfo.jsx";
import TicketResult from "./pages/TicketResult.jsx";
import Profile from "./pages/Profile.jsx";
import SalesDashboard from "./pages/SalesDashboard.jsx";
import Admin from "./pages/Admin.jsx";
import AddNewMovie from "./pages/AddNewMovie.jsx";
import { Routes, Route } from "react-router"; // Perbaikan import dari react-router-dom
import { UserProvider } from "./context/userContext.jsx";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />{" "}
        {/* Update: tambahkan parameter :id */}
        <Route path="/seat-order" element={<SeatOrder />} />{" "}
        {/* Update: tambahkan parameter :id */}
        <Route path="/payment-info" element={<PaymentInfo />} />
        <Route path="/ticket-result" element={<TicketResult />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sales-dashboard" element={<SalesDashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/add-new-movie" element={<AddNewMovie />} />
      </Routes>
    </UserProvider>
  );
}

export default App;
