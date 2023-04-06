import WorkAreaSection from "./WorkAreaSection";
import Slider from "./Slider";

function BorderThicknessSection({ additionalBorder, setAdditionalBorder }) {
  return (
    <WorkAreaSection sectionTitle={"Thickness"}>
      <Slider
        value={additionalBorder}
        setValue={setAdditionalBorder}
        min="0"
        max="10"
        step="0.1"
        displayValue={additionalBorder}
      />
    </WorkAreaSection>
  );
}

export default BorderThicknessSection;
