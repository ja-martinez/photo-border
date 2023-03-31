/*
Separates two app screens/views/pages to decouple logic.
*/

/*
todo: 
validate image type when loading image so that it is limited by browser, not app
*/

import useImageInput from "./hooks/useImageInput";

import "./App.css";

import MainScreen from "./components/MainScreen";
import InitialScreen from "./components/InitialScreen";

function App() {
  const { image, onFileChange, isLoading } = useImageInput();

  let content;
  if (!image) {
    content = <InitialScreen onFileChange={onFileChange} isLoading={isLoading} />;
  } else {
    content = (
      <MainScreen image={image} onFileChange={onFileChange} key={image.src} />
    );
  }

  return <div id="app">{content}</div>;
}

export default App;
