export const MAX_CANVAS_AREA = 16777216;
export const MAX_CANVAS_AREA_SAFE = 0.9 * MAX_CANVAS_AREA;

export default function getScaledImageDimensionsCanvas(
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
      Math.sqrt(MAX_CANVAS_AREA_SAFE / aspectRatio) / totalHeightConstant;
    newDimensions.width = newDimensions.height * originalAspectRatio;
  } else {
    // height <= width
    let totalWidthConstant;

    if (originalAspectRatio > aspectRatio) {
      totalWidthConstant = 1 + additionalBorder / 10;
    } else {
      // originalAspectRatio <= aspectRatio

      const minBorderConstant = aspectRatio / originalAspectRatio - 1;
      totalWidthConstant =
        1 +
        minBorderConstant +
        additionalBorder * ((1 - minBorderConstant) / 10);
    }

    newDimensions.width =
      Math.sqrt(MAX_CANVAS_AREA_SAFE * aspectRatio) / totalWidthConstant;
    newDimensions.height = newDimensions.width / originalAspectRatio;
  }

  /*
    Rounding
  */
  // floor because we want image to be less than or equal to what we calculated
  newDimensions.width = Math.floor(newDimensions.width);
  newDimensions.height = Math.floor(newDimensions.height);

  return newDimensions;
}
