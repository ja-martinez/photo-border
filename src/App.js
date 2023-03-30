/*
validate image type when loading image so that it is limited by browser, not app
put state in reducer
add url as id to reset editor
*/

import useImageInput from "./hooks/useImageInput";
import "./App.css";
import Editor from "./components/Editor";
import InitialPage from "./components/InitialPage";

function App() {
  const { image, onFileChange, isLoading } = useImageInput();

  let content;
  if (!image) {
    content = <InitialPage onFileChange={onFileChange} isLoading={isLoading} />;
  } else {
    content = (
      <Editor image={image} onFileChange={onFileChange} key={image.src} />
    );
  }

  return <div className="App">{content}</div>;
}

export default App;
