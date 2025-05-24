import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/svg/logo-tickitz2.svg";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    // Jika ini event dari form submit, cegah refresh halaman
    if (e) {
      e.preventDefault();
    }

    if (email && password) {
      if (!agreeToTerms) {
        alert("Please agree to the terms and conditions!");
        return;
      }

      // Store registered users in localStorage
      const registeredUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );

      // Check if email already exists
      if (registeredUsers.some((user) => user.email === email)) {
        alert("This email is already registered!");
        return;
      }

      // Add new user to registered users
      registeredUsers.push({ email, password, role: "user" });
      localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

      // Redirect to login page
      navigate("/login");
    } else {
      alert("Masukkan email dan password!");
    }
  };

  // Handler untuk tombol ketika ditekan dalam input field
  const handleKeyDown = (e) => {
    // Jika tombol yang ditekan adalah Enter (kode 13)
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4">
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center brightness-70 -z-10 bg-[url(/png/bg-avanger.png)]"></div>

      <div className="flex flex-col items-center w-full max-w-md">
        <div className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-5 tracking-wide relative">
          <img
            src={Logo}
            alt="Tickitz Logo"
            className="w-[180px] h-[42px] sm:w-[200px] sm:h-[48px] lg:w-[226px] lg:h-[54px]"
          />
          <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white transform rotate-45 -right-1 sm:-right-2 top-2 sm:top-3"></div>
        </div>

        <form
          onSubmit={handleRegister}
          className="bg-white rounded-lg shadow-lg py-6 sm:py-8 px-6 sm:px-8 md:px-12 w-full"
        >
          {/* Step Indicator - Responsive */}
          <div className="flex items-center justify-center mb-6 overflow-x-auto px-2">
            <div className="flex items-center">
              {/* Step 1 - Fill Form (active) */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary text-white flex items-center justify-center text-sm sm:text-md md:text-lg font-semibold mb-1 sm:mb-2">
                  1
                </div>
                <div className="text-gray-800 font-medium text-xs sm:text-sm md:text-base">
                  Fill Form
                </div>
              </div>

              {/* Connector */}
              <div className="w-10 sm:w-16 md:w-18 flex items-center justify-center mx-1">
                <div className="text-gray-400 tracking-wider text-xs sm:text-sm md:text-lg">
                  - - - - -
                </div>
              </div>

              {/* Step 2 - Activate (inactive) */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm sm:text-md md:text-lg font-semibold mb-1 sm:mb-2">
                  2
                </div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">
                  Activate
                </div>
              </div>

              {/* Connector */}
              <div className="w-10 sm:w-16 md:w-18 flex items-center justify-center mx-1">
                <div className="text-gray-400 tracking-wider text-xs sm:text-sm md:text-lg">
                  - - - - -
                </div>
              </div>

              {/* Step 3 - Done (inactive) */}
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-gray-400 text-white flex items-center justify-center text-sm sm:text-md md:text-lg font-semibold mb-1 sm:mb-2">
                  3
                </div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base">
                  Done
                </div>
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none text-sm sm:text-base ${
                emailFocused || email.length > 0
                  ? "border-2 border-purple-500 focus:border-purple-600"
                  : "border border-gray-200"
              }`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocused(true)}
              onBlur={() => setEmailFocused(false)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-sm sm:text-base md:text-lg">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg focus:outline-none text-sm sm:text-base ${
                  passwordFocused || password.length > 0
                    ? "border-2 border-purple-500 focus:border-purple-600"
                    : "border border-gray-200"
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onKeyDown={handleKeyDown}
              />
              <span
                className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
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
                </svg>
              </span>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="mb-4 sm:mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded bg-primary"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
              />
              <span className="ml-2 text-gray-700 text-sm sm:text-base">
                I agree to terms & conditions
              </span>
            </label>
          </div>

          {/* Join Button */}
          <button
            type="submit"
            className="cursor-pointer w-full bg-primary text-white py-2 sm:py-3 rounded-lg text-sm sm:text-base md:text-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Join For Free Now
          </button>

          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-2 sm:mx-4 text-gray-400 text-xs sm:text-sm">
              Or
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex gap-2 sm:gap-4">
            <Link
              to="#"
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              <img
                src="../../src/assets/svg/google.svg"
                alt="Google"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              />
              Google
            </Link>

            <Link
              to="#"
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors text-xs sm:text-sm"
            >
              <img
                src="../../src/assets/svg/fb.svg"
                alt="Facebook"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2"
              />
              Facebook
            </Link>
          </div>

          <div className="text-center mt-4 sm:mt-6 text-sm sm:text-base">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-primary hover:underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
