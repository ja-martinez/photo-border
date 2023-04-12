/*
  TODO:
  Write tests for these functions
  make error object
*/

import {
  MIN_ASPECT_RATIO,
  MAX_ASPECT_RATIO,
} from "./getFinalImageParameters.js";

export default function getBorderSize(
  width,
  height,
  aspectRatio,
  additionalBorder
) {
  /*
    gets half the total border size (e.g. left/border)
  */

  if (aspectRatio < MIN_ASPECT_RATIO || aspectRatio > MAX_ASPECT_RATIO) {
    throw Error(
      `Invalid aspect ratio. Aspect ratio should be in [${MIN_ASPECT_RATIO}, ${MAX_ASPECT_RATIO}]`
    );
  }

  const borderSize = getMinBorderSize(width, height, aspectRatio);

  /*
    Calculate additional border
  */

  // 1 additional border unit adds 10px to verticalBorder
  // borderSize.horizontalBorder += 10 * additionalBorder * aspectRatio
  // borderSize.verticalBorder += 10 * additionalBorder

  // Additional Border goes up to 10, where the border's in the largest dimension take up half total space
  if (height > width) {
    // additional border is relative to height
    const additionalBorderUnit = (height / 2 - borderSize.verticalBorder) / 10;
    const additionalVerticalBorder = additionalBorder * additionalBorderUnit;

    borderSize.verticalBorder += additionalVerticalBorder;
    borderSize.horizontalBorder += additionalVerticalBorder * aspectRatio;
  } else {
    // height <= width
    // additional border is relative to width
    const additionalBorderUnit = (width / 2 - borderSize.horizontalBorder) / 10;
    const additionalHorizontalBorder = additionalBorder * additionalBorderUnit;

    borderSize.horizontalBorder += additionalHorizontalBorder;
    borderSize.verticalBorder += additionalHorizontalBorder / aspectRatio;
  }

  return borderSize;
}

function getMinBorderSize(width, height, aspectRatio) {
  /*
    Gets the minimum border size required 
    to get desired aspect ratio

    gets half the total border size (e.g. left/border)
  */

  if (aspectRatio < MIN_ASPECT_RATIO || aspectRatio > MAX_ASPECT_RATIO) {
    throw Error(
      `Invalid aspect ratio. Aspect ratio should be in [${MIN_ASPECT_RATIO}, ${MAX_ASPECT_RATIO}]`
    );
  }

  const originalAspectRatio = width / height;

  const borderSize = {
    horizontalBorder: 0,
    verticalBorder: 0,
  };

  // need to add height/make it narrower
  if (originalAspectRatio > aspectRatio) {
    // aspectRatio = width / (height + x)
    // x = width / aspectRatio - height

    let extraHeight = width / aspectRatio - height;
    let verticalBorder = extraHeight / 2;

    borderSize.verticalBorder = verticalBorder;
  }

  // need to add width/make it wider
  if (originalAspectRatio < aspectRatio) {
    // aspectRatio = (width + x) / height
    // x = aspectRatio * height - width

    let extraWidth = aspectRatio * height - width;
    let horizontalBorder = extraWidth / 2;

    borderSize.horizontalBorder = horizontalBorder;
  }

  return borderSize;
}
