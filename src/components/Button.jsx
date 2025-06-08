const Button = ({ 
  children, 
  onClick, 
  variant = "primary", 
  size = "medium", 
  className = "",
  disabled = false,
  ...props 
}) => {
  const baseClasses = "font-medium rounded transition-colors duration-300 cursor-pointer";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1 pulse-on-hover",
    secondary: "bg-white text-primary border border-primary hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1",
    outline: "text-primary hover:bg-primary hover:text-white border border-primary shine-on-hover",
    ghost: "text-gray-700 hover:text-blue-600 border-fill-on-hover"
  };
  
  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3"
  };
  
  const disabledClasses = disabled 
    ? "opacity-50 cursor-not-allowed hover:transform-none hover:shadow-none" 
    : "";

  const buttonClasses = `
    ${baseClasses}
    ${variants[variant] || variants.primary}
    ${sizes[size] || sizes.medium}
    ${disabledClasses}
    ${className}
  `.trim();

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;