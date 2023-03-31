import "./AspectRatioInput.css";

function AspectRatioInput({ aspectRatio, setAspectRatio }) {
  return (
    <div id="aspect-ratio-input">
      {convertDecimalToRatio(aspectRatio)}
      <input
        name="aspect-ratio"
        type="range"
        min="0.8"
        max="1.77"
        step="0.01"
        value={aspectRatio}
        onInput={(e) => setAspectRatio(e.target.value)}
      />
    </div>
  );
}

export default AspectRatioInput;

function convertDecimalToRatio(decimal) {
  const decimalNum = parseFloat(decimal);

  switch (decimalNum) {
    case 0.8:
      return "4:5";
    case 1:
      return "1:1";
    case 1.5:
      return "3:2";
    case 1.77:
      return "16:9";
    // Extra Values
    case 1.25:
      return "5:4";
    case 1.33:
      return "4:3";
    default:
      return `${decimal}:1`;
  }
}
