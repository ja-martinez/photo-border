import { useEffect, useRef } from "react";
import getFinalImageParameters from "../utils/getFinalImageParameters";

function useCanvas(image, aspectRatio, additionalBorder, color) {
  const canvasRef = useRef(null);

  // put border image on canvas
  useEffect(() => {
    if (!image) return;

    let originalImageWidth;
    let originalImageHeight;

    if (image instanceof HTMLImageElement) {
      originalImageWidth = image.naturalWidth;
      originalImageHeight = image.naturalHeight;
    } else {
      // it is a canvas element
      originalImageWidth = image.width;
      originalImageHeight = image.height;
    }

    const {
      totalWidth,
      totalHeight,
      horizontalBorder,
      verticalBorder,
      imageWidth,
      imageHeight,
    } = getFinalImageParameters(
      originalImageWidth,
      originalImageHeight,
      aspectRatio,
      additionalBorder
    );
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false });

    // resize canvas
    canvas.width = totalWidth;
    canvas.height = totalHeight;

    // fill canvas with border color
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
  }, [image, color, additionalBorder, aspectRatio]);

  function onExport() {
    const url = canvasRef.current.toDataURL("image/jpeg", 1.0);
    const link = document.createElement("a");
    // TODO: preserve image name
    link.download = "test.jpeg";
    link.href = url;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return {
    onExport,
    canvasRef,
  };
}

export default useCanvas;
