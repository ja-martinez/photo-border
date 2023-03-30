/*
Put canvas interaction in useEffect
separate canvas logic and state in custom hooks
check canvas size if browser is safari and resize accordingly
release canvas when opening another image

*/

/*
can we check browser to only do canvas area limit on safari and iphone?
*/

import { useState } from "react";
import useCanvas from "../Hooks/useCanvas";
import ExportButton from "./ExportButton";
import ImageInput from "./ImageInput";
import ColorPicker from "./ColorPicker";
import AspectRatioInput from "./AspectRatioInput";
import AdditionalBorderInput from "./AdditionalBorderInput";
import "./Editor.css";

const INITIAL_COLOR = "#797979";

function Editor({ image, onFileChange }) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [additionalBorder, setAdditionalBorder] = useState(0);
  const [color, setColor] = useState(INITIAL_COLOR);

  const { finalWidth, finalHeight, onExport, canvasRef } = useCanvas(
    image,
    aspectRatio,
    additionalBorder,
    color
  );

  return (
    <div id="editor">
      <div id="preview">
        <canvas
          id="canvas"
          width={finalWidth}
          height={finalHeight}
          ref={canvasRef}
        ></canvas>
      </div>
      <div id="controls">
        <ColorPicker color={color} setColor={setColor} />
        <AspectRatioInput
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
        />
        <AdditionalBorderInput
          additionalBorder={additionalBorder}
          setAdditionalBorder={setAdditionalBorder}
        />
        <ExportButton onExport={onExport} />
        <ImageInput onFileChange={onFileChange}>Change Image</ImageInput>
      </div>
    </div>
  );
}

export default Editor;
