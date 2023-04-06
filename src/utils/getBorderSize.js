export default function getBorderSize(
  width,
  height,
  aspectRatio,
  additionalBorder
) {
  /*
    gets the border size of one side only, not both
  */

  const borderSize = getMinBorderSize(width, height, aspectRatio);

  // 1 additional border unit adds 10px to verticalBorder
  // borderSize.horizontalBorder += 10 * additionalBorder * aspectRatio
  // borderSize.verticalBorder += 10 * additionalBorder

  // Additional Border goes up to 10, where the border's in the largest dimension take up half total space
  if (height > width) {
    // additional border is relative to height
    const additionalBorderUnit = (height / 2 - borderSize.verticalBorder) / 10;

    borderSize.verticalBorder += additionalBorder * additionalBorderUnit;
    borderSize.horizontalBorder += borderSize.verticalBorder * aspectRatio;
  } else {
    // additional border is relative to width
    const additionalBorderUnit = (width / 2 - borderSize.horizontalBorder) / 10;

    borderSize.horizontalBorder += additionalBorder * additionalBorderUnit;
    borderSize.verticalBorder += borderSize.horizontalBorder / aspectRatio;
  }

  borderSize.horizontalBorder = Math.floor(borderSize.horizontalBorder);
  borderSize.verticalBorder = Math.floor(borderSize.verticalBorder);

  return borderSize;
}

function getMinBorderSize(width, height, aspectRatio) {
  /*
    Gets the minimum border size required 
    to get desired aspect ratio

    gets the border size of one side only, not both
  */

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
