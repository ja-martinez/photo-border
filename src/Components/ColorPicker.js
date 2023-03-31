/*
TODO: Consider memo for this component
*/
import { ChromePicker } from "react-color";

function ColorPicker({ color, setColor }) {
  return (
    <ChromePicker
      disableAlpha={true}
      color={color}
      onChange={(color) => setColor(color.hex)}
    />
  );
}

export default ColorPicker;
