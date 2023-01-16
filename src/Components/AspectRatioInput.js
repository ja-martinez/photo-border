import './AspectRatioInput.css';

function AspectRatioInput({ aspectRatio, setAspectRatio }) {
  return (
    <div id="aspect-ratio-input">
      <label htmlFor="aspect-ratio">Aspect Ratio</label>
      <input
        name="aspect-ratio"
        type="range"
        min="0.8"
        max="1.77"
        step="0.01"
        value={aspectRatio}
        onInput={(e) => setAspectRatio(e.target.value)}
      />
      {aspectRatio}
    </div>
  );
}

export default AspectRatioInput;
