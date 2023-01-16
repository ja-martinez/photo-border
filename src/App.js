/*
validate image type when loading image so that it is limited by browser, not app
put state in reducer
add url as id to reset editor
*/

import { useState, useEffect } from "react";
import "./App.css";
import Editor from "./Components/Editor";
import InitialPage from "./Components/InitialPage";

function App() {
  const [imageFile, setImageFile] = useState();
  const [image, setImage] = useState();

  // have to use effect since image loading is async and may set state when component unmounts or imageFile changes
  useEffect(() => {
    if (!imageFile) return  // there's no file

    const newImage = new Image();
    newImage.src = URL.createObjectURL(imageFile);
    console.log(newImage.src)

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
  
  let content;
  if (!image) {
    content = <InitialPage onFileChange={onFileChange} isLoading={imageFile === true} />;
  } else {
    content = <Editor image={image} onFileChange={onFileChange} key={image.src} />;
  }

  return <div className="App">{content}</div>;
}

export default App;

// Utilities

function isValidImage(file) {
  // may have to have specific file types
  if (file.type.startsWith("image/")) {
    return true;
  }
  return false;
}
