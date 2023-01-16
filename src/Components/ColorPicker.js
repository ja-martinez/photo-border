import { useState } from "react";
import { ChromePicker } from "react-color";

function ColorPicker({color, setColor}) {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  

  return (
    <ChromePicker
    disableAlpha={true}
    color={color}
    onChange={(color) => setColor(color.hex)}
  />
  )
}

export default ColorPicker;