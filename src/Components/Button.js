import "./Button.css";

function Button({ onClick, className, children }) {
  return (
    <button type="button" className={`button-base ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
