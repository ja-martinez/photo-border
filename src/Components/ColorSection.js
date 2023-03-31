import WorkAreaSection from "./WorkAreaSection";
import ColorPicker from "./ColorPicker";

function ColorSection({ color, setColor }) {
  return (
    <WorkAreaSection sectionTitle={"Color"}>
      <ColorPicker color={color} setColor={setColor} />
    </WorkAreaSection>
  );
}

export default ColorSection;
