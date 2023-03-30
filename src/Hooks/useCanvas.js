import { useEffect, useRef } from "react";
import getBorderSize from "../utils/getBorderSize";
import getScaledImageDimensionsCanvas, {
  MAX_CANVAS_AREA,
} from "../utils/getScaledDimensionsCanvas";

function useCanvas(image, aspectRatio, additionalBorder, color) {
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

  return {
    finalWidth,
    finalHeight,
    onExport,
    canvasRef,
  };
}

export default useCanvas;
