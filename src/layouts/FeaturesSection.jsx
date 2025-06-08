import { FaShieldAlt, FaDollarSign, FaHeadset, FaCheckCircle, FaStar, FaUsers } from "react-icons/fa";
import centangS from "../assets/images/svg/centang-s.svg";
import centang from "../assets/images/svg/centang-group.svg";
import message from "../assets/images/svg/message-group.svg";

const FeaturesSection = () => {
  const FeaturesContent = ({ icon, iconComponent: IconComponent, title, desc, color, bgColor, index }) => {
    return (
      <div className={`group relative overflow-hidden bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fadeInUp`} 
           style={{ animationDelay: `${index * 200}ms` }}>
        
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
          <div className={`w-full h-full ${bgColor} rounded-full`}></div>
        </div>
        
        {/* Icon Container */}
        <div className="relative mb-6">
          <div className={`w-20 h-20 ${bgColor} rounded-2xl flex justify-center items-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            {icon ? (
              <img src={icon} className="h-10 w-auto filter brightness-110" alt={title} />
            ) : (
              <IconComponent className={`text-2xl ${color}`} />
            )}
          </div>
          
          {/* Floating Badge */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-75 group-hover:scale-100">
            <FaCheckCircle className="text-white text-sm" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center space-y-4">
          <h4 className={`text-2xl font-bold mb-4 text-gray-800 group-hover:${color.replace('text-', 'text-')} transition-colors duration-300`}>
            {title}
          </h4>
          <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
            {desc}
          </p>
        </div>

        {/* Hover Effect Border */}
        <div className={`absolute inset-0 border-2 ${color.replace('text-', 'border-')} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      </div>
    );
  };

  const features = [
    {
      icon: centangS,
      title: "100% Guaranteed",
      desc: "Secure booking process with authentic tickets and money-back guarantee for your peace of mind",
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      icon: centang,
      title: "Best Prices",
      desc: "Competitive pricing with regular discounts, seasonal offers, and exclusive member benefits",
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      icon: message,
      title: "24/7 Support",
      desc: "Round-the-clock customer service with instant chat support and dedicated help center",
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  const stats = [
    { icon: FaUsers, value: "50K+", label: "Happy Customers", color: "text-blue-600" },
    { icon: FaStar, value: "4.9", label: "Average Rating", color: "text-yellow-500" },
    { icon: FaShieldAlt, value: "100%", label: "Secure Transactions", color: "text-green-600" }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-100 rounded-full blur-2xl opacity-30"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 backdrop-blur-sm px-6 py-3 rounded-full mb-6">
            <FaShieldAlt className="text-blue-600" />
            <span className="text-blue-600 font-bold text-sm uppercase tracking-wider">Why Choose Us</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Unleashing the Ultimate
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Movie Experience
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We provide the best movie ticket booking experience with guaranteed authenticity, 
            competitive prices, and exceptional customer service that sets us apart from the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <FeaturesContent
              key={index}
              icon={feature.icon}
              title={feature.title}
              desc={feature.desc}
              color={feature.color}
              bgColor={feature.bgColor}
              index={index}
            />
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 lg:p-12 text-white mb-16 animate-fadeInUp delay-600">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">Premium Experience Awaits</h3>
              <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                Join thousands of movie enthusiasts who trust us for their entertainment needs. 
                Experience cinema like never before with our premium services and exclusive benefits.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheckCircle className="text-green-300" />
                  <span className="text-sm font-medium">Instant Booking</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheckCircle className="text-green-300" />
                  <span className="text-sm font-medium">Mobile Tickets</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <FaCheckCircle className="text-green-300" />
                  <span className="text-sm font-medium">Loyalty Points</span>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors duration-300">
                  <stat.icon className={`text-3xl ${stat.color} mx-auto mb-3`} />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-blue-100 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fadeInUp delay-800">
          {[
            { icon: FaShieldAlt, title: "Secure Payment", desc: "SSL encrypted transactions" },
            { icon: FaDollarSign, title: "Best Price", desc: "Guaranteed lowest prices" },
            { icon: FaHeadset, title: "24/7 Support", desc: "Always here to help" },
            { icon: FaStar, title: "Top Rated", desc: "Highest customer satisfaction" }
          ].map((item, index) => (
            <div key={index} className="text-center p-6 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 group">
              <item.icon className="text-2xl text-gray-400 group-hover:text-blue-600 mx-auto mb-3 transition-colors duration-300" />
              <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;