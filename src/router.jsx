import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import HomePage from "./pages/HomePage.jsx";
import AllMovie from "./pages/Movie/AllMovie.jsx";
import MovieDetails from "./pages/Movie/MovieDetails.jsx";
import SelectSeat from "./pages/Booking/SelectSeat.jsx";
import PaymentInfo from "./pages/Payment/PaymentInfo.jsx";
import TicketResult from "./pages/Payment/TicketResult.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import SalesDashboard from "./pages/Admin/SalesDashboard.jsx";
import Admin from "./pages/Admin/Admin.jsx";
import AddNewMovie from "./pages/Admin/AddNewMovie.jsx";
import { Routes, Route } from "react-router-dom"; // ✅ HAPUS BrowserRouter dari sini
import { UserProvider } from "./context/userContext.jsx";

function Router() {
  return (
    <UserProvider>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<AllMovie />} />
        <Route path="/movie-details/:id" element={<MovieDetails />} />
        <Route path="/seat-order" element={<SelectSeat />} />
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

export default Router;
