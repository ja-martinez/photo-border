import "./ActionsSection.css";

import WorkAreaSection from "./WorkAreaSection";
import Button from "./Button";
import ImportButton from "./ImportButton";

function ActionsSection({ onExport, onFileChange }) {
  return (
    <WorkAreaSection sectionTitle={"Actions"}>
      <div className="actions-content">
        <Button variant="primary" className="export-button" onClick={onExport}>
          Export
        </Button>
        <ImportButton variant="secondary" onFileChange={onFileChange}>
          Change Image
        </ImportButton>
      </div>
    </WorkAreaSection>
  );
}

export default ActionsSection;
