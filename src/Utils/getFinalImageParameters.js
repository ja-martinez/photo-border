import getBorderSize from "./getBorderSize";
import getScaledImageDimensionsCanvas, {
  MAX_CANVAS_AREA,
} from "./getScaledDimensionsCanvas";

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
  if (totalWidth * totalHeight > MAX_CANVAS_AREA) {
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

  return {
    totalWidth,
    totalHeight,
    horizontalBorder,
    verticalBorder,
    imageWidth,
    imageHeight,
  };
}
