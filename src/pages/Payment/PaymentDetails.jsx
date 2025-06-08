import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function PaymentDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  // Jika ada data tiket yang dikirim via navigate(..., { state: ticket })
  const ticketData = location.state || {};

  const handleCheckPayment = () => {
    // Misal setelah cek pembayaran, status menjadi "paid"
    navigate("/ticket-details", { state: ticketData });
  };

  return (
    <div className="flex">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="p-6 w-3/4"
      >
        <h2 className="text-xl font-bold mb-4">Payment Details</h2>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between mb-2">
            <span className="font-semibold">No. Rekening Virtual</span>
            <span className="text-gray-600">12321328913829724</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Total Payment</span>
            <span className="text-gray-600">$30</span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            Pay this payment bill before it is due, on{" "}
            <strong>June 23, 2023</strong>. If the bill has not been paid by the
            specified time, it will be forfeited.
          </div>
          <button
            onClick={handleCheckPayment}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
          >
            Cek Pembayaran
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PaymentDetails;
