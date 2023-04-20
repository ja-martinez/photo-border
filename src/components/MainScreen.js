/*
TODO:
can we check browser to only do canvas area limit on safari and iphone?

TODO:
release canvas when opening another image
*/

import "./MainScreen.css";

import { useState } from "react";

import useCanvas from "../hooks/useCanvas";
import useScaledPreviewImage from "../hooks/useScaledPreviewImage";

import PageLayout from "./PageLayout";
import BorderThicknessSection from "./BorderThicknessSection";
import ColorSection from "./ColorSection";
import AspectRatioSection from "./AspectRatioSection";
import ActionsSection from "./ActionsSection";

const INITIAL_COLOR = "#797979";

function MainScreen({ image, onFileChange }) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const [additionalBorder, setAdditionalBorder] = useState(0);
  const [color, setColor] = useState(INITIAL_COLOR);

  const scaledImage = useScaledPreviewImage(image);

  const { onExport, canvasRef } = useCanvas(
    scaledImage,
    aspectRatio,
    additionalBorder,
    color
  );

  return (
    <PageLayout
      previewContent={<canvas id="canvas" ref={canvasRef}></canvas>}
      workAreaContent={
        <>
          <AspectRatioSection
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
          <BorderThicknessSection
            additionalBorder={additionalBorder}
            setAdditionalBorder={setAdditionalBorder}
          />
          <ColorSection color={color} setColor={setColor} />
          <ActionsSection onExport={onExport} onFileChange={onFileChange} />
        </>
      }
    />
  );
}

export default MainScreen;
