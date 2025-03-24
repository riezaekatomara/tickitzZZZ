import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import GooglePay from "../assets/svg/google-pay.svg";
import Visa from "../assets/svg/visa.svg";
import Gopay from "../assets/svg/gopay.svg";
import Paypal from "../assets/svg/paypal.svg";
import Dana from "../assets/svg/dana.svg";
import Bca from "../assets/svg/bca.svg";
import Bri from "../assets/svg/bri.svg";
import Ovo from "../assets/svg/ovo.svg";

const PaymentInfo = () => {
  const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "Rieza Eka Tomara",
    email: "riezaekatomara@gmail.com",
    phoneNumber: "81271414441",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const paymentMethods = [
    { id: "gpay", name: "Google Pay", logo: GooglePay },
    { id: "visa", name: "Visa", logo: Visa },
    { id: "gopay", name: "GoPay", logo: Gopay },
    { id: "paypal", name: "PayPal", logo: Paypal },
    { id: "dana", name: "Dana", logo: Dana },
    { id: "bca", name: "BCA", logo: Bca },
    { id: "bri", name: "Bank BRI", logo: Bri },
    { id: "ovo", name: "OVO", logo: Ovo },
  ];

  const handlePaymentSelect = (id) => {
    setSelectedPayment(id);
  };

  const handleOrderSubmit = () => {
    if (!selectedPayment) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    // Simpan data order di localStorage sebagai alternatif Redux
    const orderData = {
      name: "Spider-Man: Homecoming",
      quantity: 3,
      price: 30,
      paymentMethod: selectedPayment,
      customer: formData,
    };

    // Simpan order dalam localStorage
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");
    orders.push(orderData);
    localStorage.setItem("orders", JSON.stringify(orders));

    alert("Order berhasil disimpan!");
    navigate("/ticket-result");
  };

  return (
    <div className="mx-auto bg-gray-50 min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 px-5 py-6 ml-0">
        <div className="bg-white rounded-lg p-6 shadow-sm mx-60 max-w-4xl">
          <h2 className="text-xl font-bold mb-5">Payment Info</h2>

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">DATE & TIME</p>
            <p className="text-gray-800">Tuesday, 07 July 2020 at 02:00pm</p>
            <div className="h-px bg-gray-200 mt-3"></div>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">MOVIE TITLE</p>
            <p className="text-gray-800">Spider-Man: Homecoming</p>
            <div className="h-px bg-gray-200 mt-3"></div>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">CINEMA NAME</p>
            <p className="text-gray-800">Cineone21 Cinema</p>
            <div className="h-px bg-gray-200 mt-3"></div>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">NUMBER OF TICKETS</p>
            <p className="text-gray-800">3 Pieces</p>
            <div className="h-px bg-gray-200 mt-3"></div>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-sm mb-1">TOTAL PAYMENT</p>
            <p className="text-primary font-bold">$30.00</p>
            <div className="h-px bg-gray-200 mt-3"></div>
          </div>

          <h2 className="text-xl font-bold mb-4">Personal Information</h2>

          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-600 mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border border-gray-300 rounded-md px-4 py-2"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block text-gray-600 mb-2">
              Phone Number
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <div className="px-3 text-gray-600">+62</div>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="flex-1 py-2 px-2 outline-none"
              />
            </div>
          </div>
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paymentMethods.map((method) => (
              <PaymentMethod
                key={method.id}
                method={method}
                handlePaymentSelect={handlePaymentSelect}
                selectedPayment={selectedPayment}
              />
            ))}
          </div>
          <br></br>
          <button
            onClick={handleOrderSubmit}
            className="cursor-pointer w-full py-3 bg-primary text-white rounded-md font-bold"
          >
            Pay Your Order
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

function PaymentMethod({ method, selectedPayment, handlePaymentSelect }) {
  return (
    <button
      className={`border rounded-md p-4 flex items-center justify-center cursor-pointer ${
        selectedPayment === method.id
          ? "bg-primary text-white"
          : "border-gray-300"
      }`}
      onClick={() => handlePaymentSelect(method.id)}
    >
      <img src={method.logo} alt={method.name} className="h-6 object-contain" />
    </button>
  );
}

export default PaymentInfo;
