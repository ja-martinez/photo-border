import { useRef } from "react";

import Button from "./Button";

function ImportButton({ onFileChange, className, children }) {
  const fileInputRef = useRef(null);

  return (
    <>
      <input
        type="file"
        name="image"
        accept="image/*"
        style={{ display: "none" }}
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <Button
        className={className}
        onClick={() => fileInputRef.current.click()}
      >
        {children}
      </Button>
    </>
  );
}

export default ImportButton;
