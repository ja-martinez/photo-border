import WorkAreaSection from "./WorkAreaSection";

function AboutSection() {
  return (
    <WorkAreaSection sectionTitle={"About"}>
      <p>
        This tool was made to provide an easy and free way of adding a border to
        your images to conform to Instagram’s aspect ratio imitations.
      </p>
      <p>The tallest ratio allowed is 4:5 and the widest is 16:9.</p>
      <footer id="made-by">
        Made by <b>Alejandro Martinez</b>
      </footer>
    </WorkAreaSection>
  );
}

export default AboutSection;
