import { useEffect, useRef } from "react";
import getFinalImageParameters from "../utils/getFinalImageParameters";

function useCanvas(
  image,
  scaledImage,
  aspectRatio,
  additionalBorder,
  color,
  isOnExportScreen
) {
  const canvasRef = useRef(null);

  // put border image on canvas
  useEffect(() => {
    if (!scaledImage) return;

    const canvas = canvasRef.current;

    drawBorderImage(canvas, scaledImage, aspectRatio, additionalBorder, color);
  }, [scaledImage, color, additionalBorder, aspectRatio]);

  function handleExport() {
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
    handleExport,
    canvasRef,
  };
}

export default useCanvas;

function drawBorderImage(canvas, image, aspectRatio, additionalBorder, color) {
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
}
