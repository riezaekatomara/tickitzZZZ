import React, { useState, useEffect } from "react";
import HeaderProfile from "../../components/HeaderProfile.jsx";
import TitikTiga from "../../assets/svg/titik-tiga.svg";
import Star from "../../assets/svg/star.svg";
import QRCode from "../../assets/svg/qrcode.svg";
import { useUser } from "../../context/userContext.jsx";
import {
  saveUserDataToLocalStorage,
  getUserDataFromLocalStorage,
} from "../../utils/localStorageUtils.js";

const Profile = () => {
  const { userData, updateUserData } = useUser();
  const [activeTab, setActiveTab] = useState("account");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    countryCode: userData.countryCode,
  });

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const savedUserData = getUserDataFromLocalStorage();
    if (savedUserData) {
      updateUserData(savedUserData);
    }
  }, [updateUserData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        if (value.length > 10) {
          error = "First name cannot exceed 10 characters";
        }
        break;
      case "lastName":
        if (value.length > 20) {
          error = "Last name cannot exceed 20 characters";
        }
        break;
      case "email":
        const validDomains = [
          ".com",
          ".co.id",
          ".ac.id",
          ".org",
          ".net",
          ".edu",
          ".info",
          ".asia",
          ".id",
          ".co",
          ".biz",
        ];
        const hasValidDomain = validDomains.some((domain) =>
          value.toLowerCase().includes(domain)
        );

        if (!value.includes("@") || !hasValidDomain) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        if (!/^\d+$/.test(value)) {
          error = "Phone number must contain only digits";
        } else if (value.length > 12) {
          error = "Phone number cannot exceed 12 digits";
        }
        break;
      default:
        break;
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: error,
    }));

    return error === "";
  };

  const validateForm = () => {
    const firstNameValid = validateField("firstName", formData.firstName);
    const lastNameValid = validateField("lastName", formData.lastName);
    const emailValid = validateField("email", formData.email);
    const phoneValid = validateField("phone", formData.phone);

    return firstNameValid && lastNameValid && emailValid && phoneValid;
  };

  const handleSaveDetails = () => {
    if (validateForm()) {
      const updatedUserData = { ...userData, ...formData };
      updateUserData(updatedUserData);
      saveUserDataToLocalStorage(updatedUserData);
      alert("Details updated successfully!");
    } else {
      alert("Please fix the validation errors before saving.");
    }
  };

  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number");
    }

    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("Password must contain at least one special character");
    }

    if (!/[a-zA-Z]/.test(password)) {
      errors.push("Password must contain letters");
    }

    return errors;
  };

  useEffect(() => {
    if (newPassword) {
      const errors = validatePassword(newPassword);
      setPasswordErrors(errors);
      setIsPasswordValid(errors.length === 0);

      if (confirmPassword) {
        if (confirmPassword !== newPassword) {
          setConfirmPasswordError("Passwords do not match");
          setIsConfirmPasswordValid(false);
        } else {
          setConfirmPasswordError("");
          setIsConfirmPasswordValid(true);
        }
      }
    } else {
      setPasswordErrors([]);
      setIsPasswordValid(false);
    }
  }, [newPassword, confirmPassword]);

  useEffect(() => {
    if (confirmPassword) {
      if (confirmPassword !== newPassword) {
        setConfirmPasswordError("Passwords do not match");
        setIsConfirmPasswordValid(false);
      } else {
        setConfirmPasswordError("");
        setIsConfirmPasswordValid(true);
      }
    } else {
      setConfirmPasswordError("");
      setIsConfirmPasswordValid(false);
    }
  }, [confirmPassword, newPassword]);

  const handleOrderClick = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  const handleUpdatePassword = () => {
    setFormSubmitted(true);

    if (!newPassword && !confirmPassword) {
      return;
    }

    if (newPassword && !isPasswordValid) {
      return;
    }

    if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setIsConfirmPasswordValid(false);
      return;
    }

    alert("Password updated successfully!");

    setNewPassword("");
    setConfirmPassword("");
    setFormSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderProfile />

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-72 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-gray-500 text-sm font-medium">INFO</h2>
              <button className="text-purple-700 cursor-pointer">
                <img src={TitikTiga} alt="Menu" />
              </button>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-blue-200">
                <img
                  src="../../src/assets/png/rieza.png"
                  alt="User avatar"
                  className="object-cover"
                />
              </div>
              <h3 className="text-lg font-medium">
                {userData.firstName} {userData.lastName}
              </h3>
              <p className="text-gray-500 text-sm">Moviegoers</p>
            </div>

            <div className="mb-6">
              <h3 className="text-gray-700 mb-4">Loyalty Points</h3>
              <div className="bg-primary w-full h-32 rounded-lg p-4 text-white relative overflow-hidden">
                <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500 rounded-full -mr-6 -mt-6 flex items-end justify-start p-4">
                  <img src={Star} alt="Star" />
                </div>
                <h4 className="font-medium mb-1">Moviegoers</h4>
                <p className="text-2xl font-bold">
                  {userData.loyaltyPoints}{" "}
                  <span className="text-xs">points</span>
                </p>
              </div>
              <p className="text-sm text-gray-600 mt-3">
                {userData.masterPoints} points become a master
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${
                      (userData.loyaltyPoints / userData.maxPoints) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex border-b">
                <button
                  className={`cursor-pointer px-4 py-3 ${
                    activeTab === "account"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("account")}
                >
                  Account Settings
                </button>
                <button
                  className={`cursor-pointer px-4 py-3 ${
                    activeTab === "order"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-400"
                  }`}
                  onClick={() => setActiveTab("order")}
                >
                  Order History
                </button>
              </div>
            </div>

            {activeTab === "account" ? (
              <>
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-medium mb-6">
                    Details Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        First Name
                        {formErrors.firstName && (
                          <span className="text-red-500 ml-2">
                            *{formErrors.firstName}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className={`w-full px-4 py-3 border ${
                          formErrors.firstName
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Last Name
                        {formErrors.lastName && (
                          <span className="text-red-500 ml-2">
                            *{formErrors.lastName}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        className={`w-full px-4 py-3 border ${
                          formErrors.lastName
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        E-mail
                        {formErrors.email && (
                          <span className="text-red-500 ml-2">
                            *{formErrors.email}
                          </span>
                        )}
                      </label>
                      <input
                        type="email"
                        name="email"
                        className={`w-full px-4 py-3 border ${
                          formErrors.email
                            ? "border-red-300"
                            : "border-gray-300"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Phone Number
                        {formErrors.phone && (
                          <span className="text-red-500 ml-2">
                            *{formErrors.phone}
                          </span>
                        )}
                      </label>
                      <div className="flex">
                        <select
                          className="px-4 py-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-20"
                          name="countryCode"
                          value={formData.countryCode}
                          onChange={handleInputChange}
                        >
                          <option>{userData.countryCode}</option>
                        </select>
                        <input
                          type="text"
                          name="phone"
                          className={`flex-1 px-4 py-3 border ${
                            formErrors.phone
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    <button
                      className={`cursor-pointer ${
                        Object.values(formErrors).every((error) => !error)
                          ? "bg-primary hover:bg-white text-white hover:text-primary"
                          : "bg-blue-300 cursor-not-allowed"
                      } text-white font-medium px-8 py-3 rounded-lg transition`}
                      disabled={
                        !Object.values(formErrors).every((error) => !error)
                      }
                      onClick={handleSaveDetails}
                    >
                      Save Details
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h2 className="text-lg font-medium mb-6">
                    Account and Privacy
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        New Password
                        {newPassword &&
                          confirmPassword &&
                          newPassword !== confirmPassword && (
                            <span className="text-red-500 ml-2">
                              *Passwords must match
                            </span>
                          )}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          className={`w-full px-4 py-3 border ${
                            (newPassword && !isPasswordValid) ||
                            (formSubmitted &&
                              newPassword &&
                              confirmPassword &&
                              newPassword !== confirmPassword)
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 ${
                            isPasswordValid
                              ? "focus:ring-green-500"
                              : "focus:ring-blue-500"
                          }
                                                    }`}
                          placeholder="Write your password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {showPassword ? (
                              <>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                                />
                              </>
                            ) : (
                              <>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </>
                            )}
                          </svg>
                        </button>
                      </div>
                      {newPassword && passwordErrors.length > 0 && (
                        <div className="mt-2">
                          {passwordErrors.map((error, index) => (
                            <p key={index} className="text-red-500 text-sm">
                              {error}
                            </p>
                          ))}
                        </div>
                      )}
                      {newPassword && isPasswordValid && (
                        <p className="text-green-500 text-sm mt-2">
                          Password meets all requirements
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-gray-700 mb-2">
                        Confirm Password
                        {newPassword &&
                          confirmPassword &&
                          newPassword !== confirmPassword && (
                            <span className="text-red-500 ml-2">
                              *Passwords must match
                            </span>
                          )}
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          className={`w-full px-4 py-3 border ${
                            (confirmPassword && !isConfirmPasswordValid) ||
                            (formSubmitted &&
                              newPassword &&
                              confirmPassword &&
                              newPassword !== confirmPassword)
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-lg focus:outline-none focus:ring-2 ${
                            isConfirmPasswordValid
                              ? "focus:ring-green-500"
                              : "focus:ring-blue-500"
                          }`}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            {showConfirmPassword ? (
                              <>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                                />
                              </>
                            ) : (
                              <>
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </>
                            )}
                          </svg>
                        </button>
                      </div>
                      {confirmPassword && confirmPasswordError && (
                        <p className="text-red-500 text-sm mt-2">
                          {confirmPasswordError}
                        </p>
                      )}
                      {confirmPassword &&
                        isConfirmPasswordValid &&
                        newPassword === confirmPassword && (
                          <p className="text-green-500 text-sm mt-2">
                            Passwords match
                          </p>
                        )}
                    </div>
                  </div>

                  {(newPassword || confirmPassword) &&
                    !(
                      newPassword &&
                      confirmPassword &&
                      newPassword === confirmPassword
                    ) &&
                    newPassword &&
                    confirmPassword && (
                      <div className="mb-4 text-center">
                        <p className="text-red-500">
                          New Password and Confirm Password must match
                        </p>
                      </div>
                    )}

                  <div className="flex justify-center">
                    <button
                      className={`cursor-pointer ${
                        (isPasswordValid &&
                          isConfirmPasswordValid &&
                          newPassword === confirmPassword) ||
                        (!newPassword && !confirmPassword)
                          ? "bg-primary hover:bg-white text-white hover:text-primary"
                          : "bg-blue-300 cursor-not-allowed"
                      } text-white font-medium px-8 py-3 rounded-lg transition`}
                      disabled={
                        !(
                          isPasswordValid &&
                          isConfirmPasswordValid &&
                          newPassword === confirmPassword
                        ) &&
                        (newPassword || confirmPassword)
                      }
                      onClick={handleUpdatePassword}
                    >
                      Update changes
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                {userData.orders.map((order) => (
                  <div
                    key={order.id}
                    className="mb-6 border-b pb-6 last:border-b-0 last:pb-0"
                  >
                    <div className="mb-2 text-gray-400 text-sm">
                      {order.date} - {order.time}
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">{order.movie}</h3>
                      <div className="text-blue-600 font-medium">
                        <img src={order.cinema} />
                      </div>
                    </div>

                    <div className="flex space-x-4 mb-4">
                      <div
                        className={`px-6 py-2 rounded-md text-center ${
                          order.status === "active"
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {order.status === "active"
                          ? "Ticket in active"
                          : "Ticket used"}
                      </div>

                      <div
                        className={`px-6 py-2 rounded-md text-center ${
                          order.paid
                            ? "bg-blue-100 text-blue-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {order.paid ? "Paid" : "Not Paid"}
                      </div>

                      <button
                        className="cursor-pointer ml-auto text-gray-400 flex items-center"
                        onClick={() => handleOrderClick(order.id)}
                      >
                        Show Details &nbsp;{" "}
                        <img
                          src={
                            expandedOrder === order.id
                              ? "../../src/assets/svg/forward-kecil-keatas.svg"
                              : "../../src/assets/svg/forward-kecil-kebawah.svg"
                          }
                        ></img>
                      </button>
                    </div>

                    {expandedOrder === order.id && (
                      <>
                        <div className="mb-4">
                          <h4 className="text-gray-600 mb-4">
                            Ticket Information
                          </h4>

                          {!order.paid && order.paymentDue && (
                            <>
                              <div className="flex justify-between mb-2">
                                <div className="text-gray-500">
                                  No. Rekening Virtual :
                                </div>
                                <div className="flex items-center">
                                  <span className="font-medium mr-2">
                                    {order.ticketInfo.number}
                                  </span>
                                  <button className="text-blue-600 border border-blue-600 px-3 py-1 rounded-md text-sm">
                                    Copy
                                  </button>
                                </div>
                              </div>

                              <div className="flex justify-between mb-2">
                                <div className="text-gray-500">
                                  Total Payment
                                </div>
                                <div className="text-blue-600 font-medium">
                                  ${order.ticketInfo.totalPayment}
                                </div>
                              </div>

                              <div className="text-gray-600 mb-4">
                                Pay this payment bill before it is due, on{" "}
                                <span className="text-red-500 font-medium">
                                  {order.paymentDue}
                                </span>
                                . If the bill has not been paid by the specified
                                time, it will be forfeited
                              </div>

                              <button className="cursor-pointer bg-blue-600 text-white font-medium px-4 py-2 rounded-md hover:bg-blue-700 transition">
                                Cek Pembayaran
                              </button>
                            </>
                          )}

                          {order.paid && order.ticketInfo && (
                            <div className="flex">
                              <div className="mr-6">
                                <div className="w-24 h-24">
                                  <img src={QRCode}></img>
                                </div>
                              </div>

                              <div className="flex-1 grid grid-cols-3 gap-4">
                                <div>
                                  <div className="text-gray-400 text-sm">
                                    Category
                                  </div>
                                  <div>{order.ticketInfo.category}</div>
                                </div>

                                <div>
                                  <div className="text-gray-400 text-sm">
                                    Time
                                  </div>
                                  <div>{order.ticketInfo.time}</div>
                                </div>

                                <div>
                                  <div className="text-gray-400 text-sm">
                                    Seats
                                  </div>
                                  <div>{order.ticketInfo.seats}</div>
                                </div>

                                <div>
                                  <div className="text-gray-400 text-sm">
                                    Movie
                                  </div>
                                  <div>{order.movie}</div>
                                </div>

                                <div>
                                  <div className="text-gray-400 text-sm">
                                    Date
                                  </div>
                                  <div>{order.date.split(",")[1]}</div>
                                </div>

                                <div>
                                  <div className="text-gray-400 text-sm">
                                    Count
                                  </div>
                                  <div>{order.ticketInfo.count} pcs</div>
                                </div>

                                <div className="col-span-3 flex items-end justify-end">
                                  <div className="text-gray-400 mr-2">
                                    Total
                                  </div>
                                  <div className="text-xl font-bold">
                                    ${order.ticketInfo.totalPayment}.00
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
