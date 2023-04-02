import "./WorkAreaSection.css";

function WorkAreaSection({ sectionTitle, children }) {
  return (
    <div class="work-area-section">
      <h2 class="work-area-section-title">{sectionTitle}</h2>
      <div class="work-area-section-content">{children}</div>
    </div>
  );
}

export default WorkAreaSection;
