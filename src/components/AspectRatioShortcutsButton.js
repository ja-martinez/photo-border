import "./AspectRatioShortcutsButton.css";

function AspectRatioShortcutsButton({ ratio, iconSrc, handleClick }) {
  const ratioWithHyphen = ratio.split(":").join("-");
  const iconID = `icon-${ratioWithHyphen}`;
  return (
    <button className="aspect-ratio-shortcut" onClick={handleClick}>
      {ratio}
      <img src={iconSrc} alt="" className="aspect-ratio-icon" id={iconID} />
    </button>
  );
}

export default AspectRatioShortcutsButton;
