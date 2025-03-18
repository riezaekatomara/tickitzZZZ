import React, { useState } from "react";

const PaymentInfo = () => {
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
    {
      id: "gpay",
      name: "Google Pay",
      logo: "../src/assets/svg/google-pay.svg",
    },
    { id: "visa", name: "Visa", logo: "../src/assets/svg/visa.svg" },
    { id: "gopay", name: "GoPay", logo: "../src/assets/svg/gopay.svg" },
    { id: "paypal", name: "PayPal", logo: "../src/assets/svg/paypal.svg" },
    { id: "dana", name: "Dana", logo: "../src/assets/svg/dana.svg" },
    { id: "bca", name: "BCA", logo: "../src/assets/svg/bca.svg" },
    { id: "bri", name: "Bank BRI", logo: "../src/assets/svg/bri.svg" },
    { id: "ovo", name: "OVO", logo: "../src/assets/svg/ovo.svg" },
  ];

  const handlePaymentSelect = (id) => {
    setSelectedPayment(id);
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <img src="../src/assets/svg/logo-tickitz.svg"></img>
        <button className="text-2xl">
          <img src="../src/assets/svg/menu-right.svg"></img>
        </button>
      </header>

      {/* Main Content */}
      <div className="bg-gray-50 flex-1 px-5 py-6">
        {/* Payment Info Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
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

          <div className="mb-2">
            <p className="text-gray-400 text-sm mb-1">TOTAL PAYMENT</p>
            <p className="text-primary font-bold">$30.00</p>
            <div className="h-px bg-gray-200 mt-3"></div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Personal Information</h2>

          {/* Full Name */}
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

          {/* Email */}
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

          {/* Phone Number */}
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
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          <div className="grid grid-cols-2 gap-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className={`border rounded-md p-4 flex items-center justify-center cursor-pointer ${
                  selectedPayment === method.id
                    ? "bg-primary"
                    : "border-gray-300"
                }`}
                onClick={() => handlePaymentSelect(method.id)}
              >
                <img
                  src={method.logo}
                  alt={method.name}
                  className="h-6 object-contain"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pay Button */}
        <button className="cursor-pointer w-full py-3 bg-primary text-white rounded-md font-bold">
          Pay Your Order
        </button>
      </div>
    </div>
  );
};

export default PaymentInfo;
