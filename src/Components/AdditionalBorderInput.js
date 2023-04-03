import Slider from "./Slider";

function AdditionalBorderInput({ additionalBorder, setAdditionalBorder }) {
  return (
    <>
      <Slider
        value={additionalBorder}
        setValue={setAdditionalBorder}
        min="0.8"
        max="1.77"
        step="0.01"
        displayValue={additionalBorder}
      />
    </>
  );
}

export default AdditionalBorderInput;
