import React from "react";
import { Link } from "react-router-dom";
// import bgAvenger from "../assets/png/bg3.png";

function Login() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      {/* Background */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center brightness-70 -z-10"
        style={{ backgroundImage: "url('/src/assetspng\bg-avanger.png')" }}
      ></div>

      {/* Container */}
      <div className="flex flex-col items-center w-full max-w-md">
        {/* Logo */}
        <div className="text-white text-5xl font-bold mb-5 tracking-wide relative">
          <img
            src="../src/assets/svg/logo-tickitz2.svg"
            alt="Tickitz Logo"
            className="lg:w-[226px] lg:h-[54px]"
          />
          <div className="absolute w-4 h-4 bg-white transform rotate-45 -right-2 top-3"></div>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full">
          {/* Welcome Header */}
          <div className="text-2xl font-bold mb-2 flex items-center">
            Welcome Back<span className="ml-2">👋</span>
          </div>
          <div className="text-gray-500 text-sm mb-6">
            Sign in with your data that you entered during your registration
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                <img src="../src/assets/svg/eye.svg" alt="Toggle Password" />
              </span>
            </div>
            <Link
              to="/forgot-password" // Ganti dengan route yang sesuai
              className="block text-right text-blue-700 text-sm mt-2 hover:underline"
            >
              Forgot your password?
            </Link>
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-700 text-white py-3 rounded-lg font-medium hover:bg-blue-800 transition-colors">
            <Link to="/index" className="text-white no-underline">
              Login
            </Link>
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            {/* Google Button */}
            <Link
              to="/google-auth" // Ganti dengan route yang sesuai
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <img
                src="../src/assets/svg/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </Link>

            {/* Facebook Button */}
            <Link
              to="/facebook-auth" // Ganti dengan route yang sesuai
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <img
                src="../src/assets/svg/fb.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
