export const MAX_CANVAS_AREA = 16777216;

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
