import WorkAreaSection from "./WorkAreaSection";
import AspectRatioInput from "./AspectRatioInput";

function AspectRatioSection({ aspectRatio, setAspectRatio }) {
  return (
    <WorkAreaSection sectionTitle={"Aspect Ratio"}>
      <AspectRatioInput
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
      />
    </WorkAreaSection>
  );
}

export default AspectRatioSection;
