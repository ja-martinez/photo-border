import { useEffect, useRef } from "react";
import getFinalImageParameters from "../utils/getFinalImageParameters";

function useCanvas(image, aspectRatio, additionalBorder, color) {
  const canvasRef = useRef(null);
  
  const {
    totalWidth,
    totalHeight,
    horizontalBorder,
    verticalBorder,
    imageWidth,
    imageHeight,
  } = getFinalImageParameters(
    image.naturalWidth,
    image.naturalHeight,
    aspectRatio,
    additionalBorder
  );

  // put border image on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // fill canvas with color
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // add image to canvas
    ctx.drawImage(
      image,
      horizontalBorder,
      verticalBorder,
      imageWidth,
      imageHeight
    );
  }, [image, horizontalBorder, verticalBorder, color, imageWidth, imageHeight]);

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
    totalWidth,
    totalHeight,
    onExport,
    canvasRef,
  };
}

export default useCanvas;
