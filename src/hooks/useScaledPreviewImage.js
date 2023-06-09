import { useState, useEffect } from "react";
import debounce from "../utils/debounce";

function useScaledPreviewImage(image) {
  const [scaledImage, setScaledImage] = useState();
  const [previewDimensions, setPreviewDimensions] =
    useState(getPreviewDimensions);

  useEffect(() => {
    function onResize() {
      setPreviewDimensions(getPreviewDimensions());
    }

    const onResizeDebounced = debounce(onResize, 300);

    window.addEventListener("resize", onResizeDebounced);

    return () => window.removeEventListener("resize", onResizeDebounced);
  }, []);

  useEffect(() => {
    const imageCanvas = document.createElement("canvas");
    const ctx = imageCanvas.getContext("2d", { alpha: false });

    const { width: previewWidth, height: previewHeight } = previewDimensions;

    const oWidth = image.naturalWidth;
    const oHeight = image.naturalHeight;

    // get factor that would fit image in preview element
    // multiply pixel ratio to prevent pixelating due to difference between physical and CSS pixels.
    const scaleFactor =
      Math.min(previewWidth / oWidth, previewHeight / oHeight) *
      window.devicePixelRatio;

    // image doesn't need to be scaled down
    if (scaleFactor >= 1) {
      setScaledImage(image);
      return;
    }

    const newWidth = Math.round(oWidth * scaleFactor);
    const newHeight = Math.round(oHeight * scaleFactor);

    imageCanvas.width = newWidth;
    imageCanvas.height = newHeight;

    ctx.drawImage(image, 0, 0, newWidth, newHeight);

    setScaledImage(imageCanvas);

    return () => imageCanvas.remove();
  }, [previewDimensions, image]);

  return scaledImage;
}

export default useScaledPreviewImage;

function getPreviewDimensions() {
  const preview = document.getElementsByClassName("preview")[0];

  return {
    width: preview.offsetWidth,
    height: preview.offsetHeight,
  };
}
