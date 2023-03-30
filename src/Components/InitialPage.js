import ImportButton from "./ImportButton";

function InitialPage({onFileChange, isLoading}) {
  return (
    <div className="initial-page">
      <ImportButton onFileChange={onFileChange}>Import image</ImportButton>
      {isLoading && <p>Loading Image...</p>}
    </div>
  )
}

export default InitialPage;