import "./AdditionalBorderInput.css";

function AdditionalBorderInput({ additionalBorder, setAdditionalBorder }) {
  return (
    <div id="additional-border-input">
      {additionalBorder}
      <input
        name="additional-border"
        type="range"
        min="0"
        max="10"
        step="0.1"
        value={additionalBorder}
        onInput={(e) => setAdditionalBorder(e.target.value)}
      />
    </div>
  );
}

export default AdditionalBorderInput;
