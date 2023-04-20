import cardIllustration from "../assets/mountain-illustration.jpg";
import "./ImportCard.css";

import ImportButton from "./ImportButton";

function ImportCard({ onFileChange, isLoading }) {
  let buttonText = isLoading ? "Loading..." : "Import image";
  return (
    <div className="card">
      <img src={cardIllustration} alt="" className="card-image" />
      <ImportButton variant="primary" onFileChange={onFileChange}>{buttonText}</ImportButton>
    </div>
  );
}

export default ImportCard;
