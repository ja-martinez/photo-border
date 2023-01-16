import "./AdditionalBorderInput.css"

function AdditionalBorderInput({ additionalBorder, setAdditionalBorder }) {
  return (
    <div id="additional-border-input">
      <label htmlFor="additional-border">Additional Border</label>
      <input
        name="additional-border"
        type="range"
        min="0"
        max="12"
        step="0.1"
        value={additionalBorder}
        onInput={(e) => setAdditionalBorder(e.target.value)}
      />
      {additionalBorder}
    </div>
  );
}

export default AdditionalBorderInput;
