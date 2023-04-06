import icon4_5 from "../assets/4-5-icon.svg";
import icon1_1 from "../assets/1-1-icon.svg";
import icon3_2 from "../assets/3-2-icon.svg";
import icon16_9 from "../assets/16-9-icon.svg";

import "./AspectRatioShortcuts.css";

import AspectRatioShortcutsButton from "./AspectRatioShortcutsButton";

const shortcutsList = [
  {
    ratio: "4:5",
    value: 0.8,
    iconSrc: icon4_5,
  },
  {
    ratio: "1:1",
    value: 1,
    iconSrc: icon1_1,
  },
  {
    ratio: "3:2",
    value: 1.5,
    iconSrc: icon3_2,
  },
  {
    ratio: "16:9",
    value: 1.77,
    iconSrc: icon16_9,
  },
];

function AspectRatioShortcuts({ setAspectRatio }) {
  return (
    <div className="aspect-ratio-shortcuts-container">
      {shortcutsList.map((shortcut) => (
        <AspectRatioShortcutsButton
          key={shortcut.ratio}
          ratio={shortcut.ratio}
          iconSrc={shortcut.iconSrc}
          handleClick={() => setAspectRatio(shortcut.value)}
        />
      ))}
    </div>
  );
}

export default AspectRatioShortcuts;
