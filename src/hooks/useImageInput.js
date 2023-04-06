import { useState, useEffect } from "react";
import isValidImage from "../utils/isValidImage";

function useImageInput() {
  const [imageFile, setImageFile] = useState();
  const [image, setImage] = useState();

  let isLoading = !image && imageFile;

  // have to use effect since image loading is async and may set state when component unmounts or imageFile changes
  useEffect(() => {
    if (!imageFile) return; // there's no file

    const newImage = new Image();
    newImage.src = URL.createObjectURL(imageFile);

    newImage.onload = () => {
      URL.revokeObjectURL(newImage.src); // don't need URL anymore
      setImage(newImage);
    };

    return () => {
      // if a new image was being loaded, stop it.

      if (newImage.complete) return; // finished loading, nothing to do

      newImage.onload = null;
      const newImageSource = newImage.src;
      newImage.src = ""; // triggers load, so do it after clearing onload
      URL.revokeObjectURL(newImageSource); // after unsetting src to prevent loading errors
    };
  }, [imageFile]);

  function onFileChange(e) {
    const currFile = e.target.files[0];

    if (!currFile) {
      return;
    }

    if (!isValidImage(currFile)) {
      // TODO:
      throw new Error("invalid image type");
    }

    setImageFile(currFile);
  }

  return {
    image,
    onFileChange,
    isLoading,
  };
}

export default useImageInput;
