import React from "react";
import HeaderDashboard from "../../components/HeaderDashboard.jsx";

const SalesDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderDashboard />

      <div className="container mx-auto py-8 px-4">
        {/* Sales Chart Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Sales Chart</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative">
              <select className="appearance-none bg-gray-100 text-gray-700 py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-56">
                <option>Movies Name</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select className="appearance-none bg-gray-100 text-gray-700 py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-40">
                <option>Weekly</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
              Filter
            </button>
          </div>

          <p className="text-gray-700 mb-4">Avengers: End Game</p>

          {/* Chart Area */}
          <div className="h-64 relative">
            {/* Chart Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
              <span>$800</span>
              <span>$600</span>
              <span>$400</span>
              <span>$200</span>
              <span>$0</span>
            </div>

            {/* Chart area */}
            <div className="ml-10 h-full relative">
              {/* Blue chart area */}
              <div className="absolute inset-0">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <path
                    d="M0,80 C15,70 25,30 35,10 C45,30 55,70 65,60 C75,50 85,40 100,45 L100,100 L0,100 Z"
                    fill="url(#blue-gradient)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient
                      id="blue-gradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Peak marker */}
              <div className="absolute top-2 left-1/3 bg-blue-600 w-8 h-5 rounded-md"></div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 translate-y-6 w-full flex justify-between text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Sales Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Ticket Sales</h2>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative">
              <select className="appearance-none bg-gray-100 text-gray-700 py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-56">
                <option>Category</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <div className="relative">
              <select className="appearance-none bg-gray-100 text-gray-700 py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 w-40">
                <option>Location</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>

            <button className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors">
              Filter
            </button>
          </div>

          <p className="text-gray-700 mb-4">Adventure, Purwokerto</p>

          {/* Chart Area */}
          <div className="h-64 relative">
            {/* Chart Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
              <span>$800</span>
              <span>$600</span>
              <span>$400</span>
              <span>$200</span>
              <span>$0</span>
            </div>

            {/* Chart area */}
            <div className="ml-10 h-full relative">
              {/* Blue chart area */}
              <div className="absolute inset-0">
                <svg
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                >
                  <path
                    d="M0,80 C15,70 25,30 35,10 C45,30 55,70 65,60 C75,50 85,40 100,45 L100,100 L0,100 Z"
                    fill="url(#blue-gradient-2)"
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient
                      id="blue-gradient-2"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.5)" />
                      <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Peak marker */}
              <div className="absolute top-2 left-1/3 bg-blue-600 w-8 h-5 rounded-md"></div>

              {/* X-axis labels */}
              <div className="absolute bottom-0 translate-y-6 w-full flex justify-between text-xs text-gray-500">
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;
