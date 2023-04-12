import "./Slider.css";
import useThrottle from "../hooks/useThrottle";

function Slider({ value, setValue, min, max, step, displayValue }) {
  const throttledSetValue = useThrottle(setValue, 10)

  return (
    <div className="slider">
      <div className="slider-value">{displayValue}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => throttledSetValue(e.target.value)}
      />
    </div>
  );
}

export default Slider;
