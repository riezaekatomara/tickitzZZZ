import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/svg/logo-tickitz2.svg";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      // Get registered users from localStorage
      const registeredUsers = JSON.parse(
        localStorage.getItem("registeredUsers") || "[]"
      );

      // Find user with matching email and password
      const matchedUser = registeredUsers.find(
        (user) => user.email === email && user.password === password
      );

      if (matchedUser) {
        // Login successful - store current user session
        localStorage.setItem(
          "user",
          JSON.stringify({
            email: matchedUser.email,
            role: matchedUser.role,
          })
        );
        navigate("/");
      } else {
        alert("Email atau password salah!");
      }
    } else {
      alert("Masukkan email dan password!");
    }
  };

  // Handler untuk tombol Enter
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to determine border style based on focus state and input value
  const getBorderStyle = (isFocused, value) => {
    if (isFocused || value) {
      return "border-purple-500 focus:border-purple-600";
    }
    return "border-gray-200";
  };

  return (
    <div className="min-h-screen flex justify-center items-center w-full p-4">
      <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center brightness-70 -z-10 bg-[url(/png/bg-avanger.png)]"></div>

      <div className="flex flex-col items-center w-full max-w-md">
        {/* Logo dengan responsive sizing */}
        <div className="text-white text-5xl font-bold mb-5 tracking-wide relative">
          <img
            src={Logo}
            alt="Tickitz Logo"
            className="w-[180px] h-[43px] sm:w-[200px] sm:h-[48px] lg:w-[226px] lg:h-[54px]"
          />
          <div className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-white transform rotate-45 -right-1 sm:-right-2 top-2 sm:top-3"></div>
        </div>

        {/* Card container dengan responsive padding */}
        <div className="bg-white rounded-lg shadow-lg py-6 px-6 sm:py-8 sm:px-8 md:px-12 w-full">
          {/* Header dengan responsive font */}
          <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
            Welcome Back<span className="ml-2">👋</span>
          </div>
          <div className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6">
            Sign in with your data that you entered during your registration
          </div>

          {/* Form sebagai wrapper untuk input fields */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {/* Form inputs dengan responsive padding dan font */}
            <div className="mb-4 sm:mb-6">
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-base sm:text-lg">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full px-3 py-2 sm:px-4 sm:py-3 border-2 rounded-lg focus:outline-none ${getBorderStyle(
                  isFocusedEmail,
                  email
                )}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                onKeyPress={handleKeyPress}
              />
            </div>

            <div className="mb-4 sm:mb-6">
              <label className="block text-gray-700 font-medium mb-1 sm:mb-2 text-base sm:text-lg">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`w-full px-3 py-2 sm:px-4 sm:py-3 border-2 rounded-lg focus:outline-none ${getBorderStyle(
                    isFocusedPassword,
                    password
                  )}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setIsFocusedPassword(true)}
                  onBlur={() => setIsFocusedPassword(false)}
                  onKeyPress={handleKeyPress}
                />
                <span
                  className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                  onClick={togglePasswordVisibility}
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
              <Link
                to="/forgot-password"
                className="block text-right text-blue-700 text-xs sm:text-sm mt-1 sm:mt-2 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Button dengan responsive padding dan font */}
            <button
              type="submit"
              className="cursor-pointer w-full bg-primary text-white py-2 sm:py-3 rounded-lg text-base sm:text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
          </form>

          {/* Divider dengan responsive margin */}
          <div className="flex items-center my-4 sm:my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="mx-3 sm:mx-4 text-gray-400 text-xs sm:text-sm">
              Or
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Social login buttons dengan responsive spacing */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <Link
              to="#"
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 text-sm sm:text-base hover:bg-gray-50 transition-colors"
            >
              <img
                src="../../src/assets/svg/google.svg"
                alt="Google"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              />
              Google
            </Link>

            <Link
              to="#"
              className="flex-1 flex justify-center items-center py-2 border border-gray-300 rounded-lg text-gray-500 text-sm sm:text-base hover:bg-gray-50 transition-colors"
            >
              <img
                src="../../src/assets/svg/fb.svg"
                alt="Facebook"
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
              />
              Facebook
            </Link>
          </div>

          {/* Footer text dengan responsive font dan margin */}
          <div className="text-center mt-4 sm:mt-6 text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
