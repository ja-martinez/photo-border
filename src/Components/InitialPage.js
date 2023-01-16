import ImageInput from "./ImageInput";

function InitialPage({onFileChange, isLoading}) {
  return (
    <div className="initial-page">
      <ImageInput onFileChange={onFileChange}>Import an image</ImageInput>
      {isLoading && <p>Loading Image...</p>}
    </div>
  )
}

export default InitialPage;