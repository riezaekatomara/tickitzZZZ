import { useState } from "react";
import { FaEnvelope, FaUser, FaBell, FaCheck, FaStar, FaGift } from "react-icons/fa";

const MoreInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!firstName.trim() || !email.trim()) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setTimeout(() => {
        setIsSubscribed(false);
        setFirstName("");
        setEmail("");
      }, 3000);
    }, 1500);
  };

  const benefits = [
    { icon: FaStar, text: "Exclusive movie premieres" },
    { icon: FaGift, text: "Special discount codes" },
    { icon: FaBell, text: "Early ticket access" }
  ];

  return (
    <section className="px-4 lg:px-8 md:px-12 xl:px-24 py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 py-16 lg:py-24 px-6 lg:px-12 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-purple-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-2xl"></div>
          
          {/* Decorative Circles */}
          <div className="absolute top-8 right-8 w-4 h-4 bg-white/30 rounded-full animate-ping"></div>
          <div className="absolute bottom-8 left-8 w-6 h-6 bg-yellow-400/40 rounded-full animate-pulse"></div>
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-white/50 rounded-full animate-bounce"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          
          {/* Header Section */}
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <FaEnvelope className="text-white" />
              <span className="text-white font-semibold text-sm uppercase tracking-wider">Newsletter</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Stay Updated with
              <br />
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Latest Movies
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Get exclusive access to movie premieres, special discounts, and be the first to know about upcoming blockbusters.
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition-all duration-300">
                <benefit.icon className="text-yellow-300 text-xl" />
                <span className="text-white font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>

          {/* Subscription Form */}
          {!isSubscribed ? (
            <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                {/* First Name Input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaUser className="text-blue-300" />
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder-blue-200 rounded-xl focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300 font-medium"
                    required
                  />
                </div>

                {/* Email Input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-blue-300" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white placeholder-blue-200 rounded-xl focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all duration-300 font-medium"
                    required
                  />
                </div>
              </div>

              {/* Subscribe Button */}
              <button
                type="submit"
                disabled={isLoading || !firstName.trim() || !email.trim()}
                className="group relative w-full lg:w-auto px-8 py-4 bg-white text-blue-700 font-bold text-lg rounded-xl hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-1 transition-all duration-300 shadow-xl hover:shadow-2xl overflow-hidden"
              >
                {/* Button Background Animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-blue-700 border-t-transparent rounded-full animate-spin"></div>
                      Subscribing...
                    </>
                  ) : (
                    <>
                      <FaBell className="group-hover:scale-110 transition-transform" />
                      Subscribe Now
                    </>
                  )}
                </span>
              </button>

              {/* Privacy Note */}
              <p className="text-sm text-blue-200 mt-4 opacity-80">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            /* Success State */
            <div className="max-w-md mx-auto">
              <div className="bg-green-500/20 backdrop-blur-sm border-2 border-green-400/50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <FaCheck className="text-white text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
                <p className="text-green-100">
                  Thank you for subscribing. You'll receive amazing movie updates soon!
                </p>
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50K+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Subscribers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">95%</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">1000+</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Movies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-200 text-sm uppercase tracking-wide">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreInfo;