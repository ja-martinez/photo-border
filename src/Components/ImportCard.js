import ImportButton from "./ImportButton";

function ImportCard({ onFileChange, isLoading }) {
  let buttonText = isLoading ? "Loading..." : "Import image";
  return (
    <div class="card">
      <img src="mountain-illustration.jpg" alt="" class="card-image" />
      <ImportButton onFileChange={onFileChange}>{buttonText}</ImportButton>
    </div>
  );
}

export default ImportCard;
