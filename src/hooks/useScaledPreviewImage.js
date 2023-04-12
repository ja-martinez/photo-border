import { useState, useEffect } from "react";
import debounce from "../utils/debounce";

function useScaledPreviewImage(image) {
  const [scaledImageCanvas, setScaledImageCanvas] = useState();
  const [previewDimensions, setPreviewDimensions] =
    useState(getPreviewDimensions);

  // console.log(`The dimensions are ${previewDimensions.width} x ${previewDimensions.height}`);

  useEffect(() => {
    console.log("inside the resize listener effect");
    function onResize() {
      setPreviewDimensions(getPreviewDimensions());
    }

    const onResizeDebounced = debounce(onResize, 300);

    window.addEventListener("resize", onResizeDebounced);

    return () => window.removeEventListener("resize", onResizeDebounced);
  }, []);

  useEffect(() => {
    console.log("inside the image scaling effect");
    const imageCanvas = document.createElement("canvas");
    const ctx = imageCanvas.getContext("2d", { alpha: false });

    const preview = document.getElementById("preview");
    const previewWidth = preview.offsetWidth;
    const previewHeight = preview.offsetHeight;

    const oWidth = image.naturalWidth;
    const oHeight = image.naturalHeight;

    // get factor that would fit image in preview element
    const scaleFactor = Math.min(
      previewWidth / oWidth,
      previewHeight / oHeight
    );

    // image doesn't need to be scaled down
    if (scaleFactor >= 1) return;

    const newWidth = Math.round(oWidth * scaleFactor);
    const newHeight = Math.round(oHeight * scaleFactor);

    imageCanvas.width = newWidth;
    imageCanvas.height = newHeight;

    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    setScaledImageCanvas(imageCanvas);

    return () => imageCanvas.remove();
  }, [previewDimensions, image]);

  return scaledImageCanvas;
}

export default useScaledPreviewImage;

function getPreviewDimensions() {
  return {
    width: document.getElementById("preview").offsetWidth,
    height: document.getElementById("preview").offsetHeight,
  };
}
