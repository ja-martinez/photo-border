import "./Slider.css";

function Slider({ value, setValue, min, max, step, displayValue }) {
  return (
    <div className="slider">
      <div className="slider-value">{displayValue}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onInput={(e) => setValue(e.target.value)}
      />
    </div>
  );
}

export default Slider;
