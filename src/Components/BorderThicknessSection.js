import WorkAreaSection from "./WorkAreaSection";
import Slider from "./Slider";

function BorderThicknessSection({ additionalBorder, setAdditionalBorder }) {
  return (
    <WorkAreaSection sectionTitle={"Thickness"}>
      <Slider
        value={additionalBorder}
        setValue={setAdditionalBorder}
        min="0.8"
        max="1.77"
        step="0.01"
        displayValue={additionalBorder}
      />
    </WorkAreaSection>
  );
}

export default BorderThicknessSection;
