import cardIllustration from "../assets/mountain-illustration.jpg";
import "./ImportCard.css";

import ImportButton from "./ImportButton";

function ImportCard({ onFileChange, isLoading }) {
  let buttonText = isLoading ? "Loading..." : "Import image";
  return (
    <div class="card">
      <img src={cardIllustration} alt="" class="card-image" />
      <ImportButton onFileChange={onFileChange}>{buttonText}</ImportButton>
    </div>
  );
}

export default ImportCard;
