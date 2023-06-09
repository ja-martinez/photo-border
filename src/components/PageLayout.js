/*
Helps maintain consistency between the initial and main screens
*/

import "./PageLayout.css";

import AboutSection from "./AboutSection";

function PageLayout({ previewContent, workAreaContent }) {
  return (
    <div id="app">
      <div id="title">INSTA-BORDERS</div>
      <div className="preview">{previewContent}</div>
      <div className="work-area">
        {workAreaContent && workAreaContent}
        <AboutSection />
      </div>
    </div>
  );
}

export default PageLayout;
