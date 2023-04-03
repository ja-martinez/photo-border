import "./AspectRatioInput.css";

import convertDecimalToRatio from "../utils/convertDecimalToRatio";

import Slider from "./Slider";

function AspectRatioInput({ aspectRatio, setAspectRatio }) {
  return (
    <>
      <Slider
        value={aspectRatio}
        setValue={setAspectRatio}
        min="0.8"
        max="1.77"
        step="0.01"
        displayValue={convertDecimalToRatio(aspectRatio)}
      />
    </>
  );
}

export default AspectRatioInput;
