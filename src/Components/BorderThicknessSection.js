import WorkAreaSection from "./WorkAreaSection";
import AdditionalBorderInput from "./AdditionalBorderInput";

function BorderThicknessSection({ additionalBorder, setAdditionalBorder }) {
  return (
    <WorkAreaSection sectionTitle={"Thickness"}>
      <AdditionalBorderInput
        additionalBorder={additionalBorder}
        setAdditionalBorder={setAdditionalBorder}
      />
    </WorkAreaSection>
  );
}

export default BorderThicknessSection;
