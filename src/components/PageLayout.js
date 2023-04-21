/*
Helps maintain consistency between the initial and main screens
*/

import "./PageLayout.css";

import AboutSection from "./AboutSection";
import Button from "./Button";

function PageLayout({ previewContent, workAreaContent, isOnExportScreen, setIsOnExportScreen }) {

  const exportElementsStyle = isOnExportScreen ? {} : {display: "none"};

  return (
    <div id="app">
      <div id="title">INSTA-BORDERS</div>
      <div className="preview">{previewContent}</div>
      <div className="work-area">
        {workAreaContent && workAreaContent}
        <AboutSection />
      </div>
      <div className="preview export" style={exportElementsStyle}></div>
      <div className="work-area export" style={exportElementsStyle}>
        <p>
        To save to your camera roll, press and hold the image above and select “Save to Photos”.
        </p>
        <Button variant={"primary"} onClick={() => setIsOnExportScreen(false)}>
          Go Back To Controls
        </Button>
      </div>
    </div>
  );
}

export default PageLayout;
