import "./Button.css";

function Button({ onClick, variant, className, children }) {
  let variantClass;

  switch (variant) {
    case "secondary":
      variantClass = "secondary-button";
      break;
    default:
      variantClass = "primary-button";
  }

  return (
    <button
      type="button"
      className={`button-base ${variantClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
