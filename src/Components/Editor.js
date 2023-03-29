/*
Put canvas interaction in useEffect
separate canvas logic and state in custom hooks
check canvas size if browser is safari and resize accordingly
release canvas when opening another image

*/

/*
can we check browser to only do canvas area limit on safari and iphone?
*/

import { useState, useRef, useEffect } from "react";
import ExportButton from "./ExportButton";
import ImageInput from "./ImageInput";
import ColorPicker from "./ColorPicker";
import AspectRatioInput from "./AspectRatioInput";
import AdditionalBorderInput from "./AdditionalBorderInput";
import "./Editor.css";

const INITIAL_COLOR = "#797979";
const MAX_CANVAS_AREA = 16777216;

function Editor({ image, onFileChange }) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [additionalBorder, setAdditionalBorder] = useState(0);
  const [color, setColor] = useState(INITIAL_COLOR);
  const canvasRef = useRef(null);

  // get border and final size
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  let { horizontalBorder, verticalBorder } = getBorderSize(
    width,
    height,
    aspectRatio,
    additionalBorder
  );
  let finalWidth = width + horizontalBorder * 2;
  let finalHeight = height + verticalBorder * 2;
  console.log(finalWidth, finalHeight);

  // check if canvas size will exceed safari limits (16,777,216 sq. px)
  if (finalWidth * finalHeight > MAX_CANVAS_AREA) {
    ({ width, height } = getScaledImageDimensionsCanvas(
      width,
      height,
      aspectRatio,
      additionalBorder
    ));

    ({ horizontalBorder, verticalBorder } = getBorderSize(
      width,
      height,
      aspectRatio,
      additionalBorder
    ));

    finalWidth = width + horizontalBorder * 2;
    finalHeight = height + verticalBorder * 2;
  }

  // put border image on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // fill canvas with color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // add image to canvas
    ctx.drawImage(image, horizontalBorder, verticalBorder, width, height);
  }, [image, horizontalBorder, verticalBorder, color, width, height]);

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
  /*
    gets the border size of one side only, not both
  */

  const borderSize = getMinBorderSize(width, height, aspectRatio);

  // 1 additional border unit adds 10px to verticalBorder
  // borderSize.horizontalBorder += 10 * additionalBorder * aspectRatio
  // borderSize.verticalBorder += 10 * additionalBorder

  // Additional Border goes up to 10, where the border's in the largest dimension take up half total space
  if (height > width) {
    // additional border is relative to height
    const additionalBorderUnit = (height / 2 - borderSize.verticalBorder) / 10;

    borderSize.verticalBorder += additionalBorder * additionalBorderUnit;
    borderSize.horizontalBorder += borderSize.verticalBorder * aspectRatio;
  } else {
    // additional border is relative to width
    const additionalBorderUnit = (width / 2 - borderSize.horizontalBorder) / 10;

    borderSize.horizontalBorder += additionalBorder * additionalBorderUnit;
    borderSize.verticalBorder += borderSize.horizontalBorder / aspectRatio;
  }

  return borderSize;
}

function getMinBorderSize(width, height, aspectRatio) {
  /*
    Gets the minimum border size required 
    to get desired aspect ratio

    gets the border size of one side only, not both
  */

  const originalAspectRatio = width / height;

  const borderSize = {
    horizontalBorder: 0,
    verticalBorder: 0,
  };

  // need to add height/make it narrower
  if (originalAspectRatio > aspectRatio) {
    // aspectRatio = width / (height + x)
    // x = width / aspectRatio - height

    let extraHeight = width / aspectRatio - height;
    let verticalBorder =  
    extraHeight / 2; 

    borderSize.verticalBorder = verticalBorder;
  }
  
  // need to add width/make it wider
  if (originalAspectRatio < aspectRatio) {
    // aspectRatio = (width + x) / height
    // x = aspectRatio * height - width
    
    let extraWidth = aspectRatio * height - width;
    let horizontalBorder = extraWidth / 2; 
    console.log(`border ${extraWidth / 2}`)
    
    borderSize.horizontalBorder = horizontalBorder;
  }

  return borderSize;
}

function getScaledImageDimensionsCanvas(
  width,
  height,
  aspectRatio,
  additionalBorder
) {
  /*
    See docs for equation details
  */
  const originalAspectRatio = width / height;

  const newDimensions = {};

  if (height > width) {
    let totalHeightConstant;

    if (originalAspectRatio > aspectRatio) {
      const minBorderConstant = originalAspectRatio / aspectRatio - 1;
      totalHeightConstant =
        1 +
        minBorderConstant +
        additionalBorder * ((1 - minBorderConstant) / 10);
    } else {
      totalHeightConstant = 1 + additionalBorder / 10;
    }

    newDimensions.height =
      Math.sqrt(MAX_CANVAS_AREA / aspectRatio) / totalHeightConstant;
    newDimensions.width = newDimensions.height * originalAspectRatio;
  } else {
    let totalWidthConstant;

    if (originalAspectRatio > aspectRatio) {
      totalWidthConstant = 1 + additionalBorder / 10;
    } else {
      const minBorderConstant = aspectRatio / originalAspectRatio - 1;
      totalWidthConstant =
        1 +
        minBorderConstant +
        additionalBorder * ((1 - minBorderConstant) / 10);
    }

    newDimensions.width =
      Math.sqrt(MAX_CANVAS_AREA * aspectRatio) / totalWidthConstant;
    newDimensions.height = newDimensions.width / originalAspectRatio;
  }

  return newDimensions;
}
