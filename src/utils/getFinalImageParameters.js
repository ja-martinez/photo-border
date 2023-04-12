import getBorderSize from "./getBorderSize.js";
import getScaledImageDimensionsCanvas, {
  MAX_CANVAS_AREA_SAFE,
} from "./getScaledDimensionsCanvas.js";

export const MIN_ASPECT_RATIO = 0.8;
export const MAX_ASPECT_RATIO = 1.77;

export default function getFinalImageParameters(
  originalImageWidth,
  originalImageHeight,
  aspectRatio,
  additionalBorder
) {
  // get border and final size
  let imageWidth = originalImageWidth;
  let imageHeight = originalImageHeight;
  let { horizontalBorder, verticalBorder } = getBorderSize(
    imageWidth,
    imageHeight,
    aspectRatio,
    additionalBorder
  );
  let totalWidth = imageWidth + horizontalBorder * 2;
  let totalHeight = imageHeight + verticalBorder * 2;

  // check if canvas size will exceed safari limits (16,777,216 sq. px)
  if (totalWidth * totalHeight > MAX_CANVAS_AREA_SAFE) {
    ({ width: imageWidth, height: imageHeight } =
      getScaledImageDimensionsCanvas(
        imageWidth,
        imageHeight,
        aspectRatio,
        additionalBorder
      ));

    ({ horizontalBorder, verticalBorder } = getBorderSize(
      imageWidth,
      imageHeight,
      aspectRatio,
      additionalBorder
    ));

    totalWidth = imageWidth + horizontalBorder * 2;
    totalHeight = imageHeight + verticalBorder * 2;
  }

  /*
    Rounding
  */
  horizontalBorder = Math.floor(horizontalBorder);
  verticalBorder = Math.floor(verticalBorder);

  totalWidth = imageWidth + horizontalBorder * 2;
  totalHeight = imageHeight + verticalBorder * 2;
  let resultingAspectRatio = totalWidth / totalHeight;

  while (resultingAspectRatio < MIN_ASPECT_RATIO) {
    horizontalBorder += 1;
    totalWidth = imageWidth + horizontalBorder * 2;
    totalHeight = imageHeight + verticalBorder * 2;
    resultingAspectRatio = totalWidth / totalHeight;
  }

  while (resultingAspectRatio > MAX_ASPECT_RATIO) {
    verticalBorder += 1;
    totalWidth = imageWidth + horizontalBorder * 2;
    totalHeight = imageHeight + verticalBorder * 2;
    resultingAspectRatio = totalWidth / totalHeight;
  }

  return {
    totalWidth,
    totalHeight,
    horizontalBorder,
    verticalBorder,
    imageWidth,
    imageHeight,
  };
}
