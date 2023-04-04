import convertDecimalToRatio from "../utils/convertDecimalToRatio";

import WorkAreaSection from "./WorkAreaSection";
import Slider from "./Slider";
import AspectRatioShortcuts from "./AspectRatioShortcuts";

function AspectRatioSection({ aspectRatio, setAspectRatio }) {
  return (
    <WorkAreaSection sectionTitle={"Aspect Ratio"}>
      <Slider
        value={aspectRatio}
        setValue={setAspectRatio}
        min="0.8"
        max="1.77"
        step="0.01"
        displayValue={convertDecimalToRatio(aspectRatio)}
      />
      <AspectRatioShortcuts setAspectRatio={setAspectRatio} />
    </WorkAreaSection>
  );
}

export default AspectRatioSection;
