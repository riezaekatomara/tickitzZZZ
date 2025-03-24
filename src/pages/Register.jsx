import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import Logo from "../assets/svg/logo-tickitz2.svg";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (email && password) {
      // Simpan data registrasi di localStorage atau session sebagai alternatif Redux
      localStorage.setItem("user", JSON.stringify({ email, role: "user" }));
      navigate("/");
    } else {
      alert("Masukkan email dan password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center brightness-70 -z-10 bg-[url(/png/bg-avanger.png)]"></div>

      <div className="flex flex-col items-center w-full max-w-md">
        <div className="text-white text-5xl font-bold mb-5 tracking-wide relative">
          <img
            src={Logo}
            alt="Tickitz Logo"
            className="lg:w-[226px] lg:h-[54px]"
          />
          <div className="absolute w-4 h-4 bg-white transform rotate-45 -right-2 top-3"></div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 w-full">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="text-2xl font-bold">Fill Form</div>
              <div className="w-4 h-px bg-gray-300 mx-2"></div>
              <div className="text-gray-500">Activate</div>
              <div className="w-4 h-px bg-gray-300 mx-2"></div>
              <div className="text-gray-500">Done</div>
            </div>
          </div>

          <div className="text-gray-500 text-sm mb-6">
            Activate your account by filling the form below
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border mb-4"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer">
                <img
                  src="../../src/assets/svg/eye.svg"
                  alt="Toggle Password"
                  className="relative bottom-2"
                />
              </span>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center">
              <input type="checkbox" className="form-checkbox" />
              <span className="ml-2 text-gray-700">
                I agree to terms & conditions
              </span>
            </label>
          </div>

          <button
            onClick={handleRegister}
            className="cursor-pointer w-full bg-blue-600 text-white py-2 rounded"
          >
            Join For Free Now
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-4 text-gray-400 text-sm">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex gap-4">
            <Link
              to="#"
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <img
                src="../../src/assets/svg/google.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Google
            </Link>

            <Link
              to="#"
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors"
            >
              <img
                src="../../src/assets/svg/fb.svg"
                alt="Facebook"
                className="w-5 h-5 mr-2"
              />
              Facebook
            </Link>
          </div>

          <div className="text-center mt-6">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-blue-700 hover:underline">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;