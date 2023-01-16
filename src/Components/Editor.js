/*
Put canvas interaction in useEffect
separate canvas logic and state in custom hooks
check canvas size if browser is safari and resize accordingly
release canvas when opening another image

*/
import { useState, useRef, useEffect } from "react";
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
  const canvasRef = useRef(null);

  // get border and final size
  const width = image.naturalWidth;
  const height = image.naturalHeight;
  const { horizontalBorder, verticalBorder } = getBorderSize(
    width,
    height,
    aspectRatio,
    additionalBorder
  );
  const finalWidth = width + horizontalBorder * 2;
  const finalHeight = height + verticalBorder * 2;

  // put border image on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // fill canvas with color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // add image to canvas
    ctx.drawImage(image, horizontalBorder, verticalBorder);
  }, [image, horizontalBorder, verticalBorder, color]);

  function onExport() {
    const url = canvasRef.current.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    link.download = "test.jpeg";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

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

function getBorderSize(width, height, aspectRatio, additionalBorder) {
  const borderSize = getMinBorderSize(width, height, aspectRatio);

  // 1 additional border unit adds 10px to verticalBorder
  // borderSize.horizontalBorder += 10 * additionalBorder * aspectRatio
  // borderSize.verticalBorder += 10 * additionalBorder
  
  // Additional Border goes up to 12, where the border's in the largest dimension take up half total space
  if (height > width) {
    const additionalBorderUnit = ((height / 2 - borderSize.verticalBorder)) / 12;
    // additional border is relative to height
    borderSize.verticalBorder += additionalBorder * additionalBorderUnit;
    borderSize.horizontalBorder += borderSize.verticalBorder * aspectRatio
  } else {
    const additionalBorderUnit = ((width / 2 - borderSize.horizontalBorder)) / 12;
    // additional border is relative to width
    borderSize.horizontalBorder += additionalBorder * additionalBorderUnit;
    borderSize.verticalBorder += borderSize.horizontalBorder / aspectRatio
  }

  return borderSize;
}

function getMinBorderSize(width, height, aspectRatio) {
  /*
    Gets the minimum border size required 
    to get desired aspect ratio
  */

  const currAspectRatio = width / height;

  const borderSize = {
    horizontalBorder: 0,
    verticalBorder: 0,
  };

  // need to add height/make it narrower
  if (currAspectRatio > aspectRatio) {
    // aspectRatio = width / (height + x)
    // x = width / aspectRatio - height

    let extraHeight = width / aspectRatio - height;
    let extraHeightPerSide = Math.ceil(extraHeight / 2); // ceil to guarantee aspect ratio is <= max allowed when rounded to int

    borderSize.verticalBorder = extraHeightPerSide;
  }

  // need to add width/make it wider
  if (currAspectRatio < aspectRatio) {
    // aspectRatio = (width + x) / height
    // x = aspectRatio * height - width

    let extraWidth = aspectRatio * height - width;
    let extraWidthPerSide = Math.ceil(extraWidth / 2); // ceil to guarantee aspect ratio is >= min allowed when rounded to int

    borderSize.horizontalBorder = extraWidthPerSide;
  }

  return borderSize;
}
