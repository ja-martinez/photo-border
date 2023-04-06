import PageLayout from "./PageLayout";
import ImportCard from "./ImportCard";

function InitialScreen({ onFileChange, isLoading }) {
  return (
    <PageLayout
      previewContent={
        <ImportCard onFileChange={onFileChange} isLoading={isLoading} />
      }
    />
  );
}

export default InitialScreen;
