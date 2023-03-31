import WorkAreaSection from "./WorkAreaSection";
import ExportButton from "./ExportButton";
import ImportButton from "./ImportButton";

function ActionsSection({ onExport, onFileChange }) {
  return (
    <WorkAreaSection sectionTitle={"Actions"}>
      <ExportButton onExport={onExport} />
      <ImportButton onFileChange={onFileChange}>Change Image</ImportButton>
    </WorkAreaSection>
  );
}

export default ActionsSection;
