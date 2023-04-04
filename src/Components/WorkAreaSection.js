import "./WorkAreaSection.css";

function WorkAreaSection({ sectionTitle, children }) {
  return (
    <div className="work-area-section">
      <h2 className="work-area-section-title">{sectionTitle}</h2>
      <div className="work-area-section-content">{children}</div>
    </div>
  );
}

export default WorkAreaSection;
