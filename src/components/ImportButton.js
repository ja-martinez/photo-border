import { useRef } from "react";

import Button from "./Button";

function ImportButton({ onFileChange, variant, className, children }) {
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
        variant={variant}
        className={className}
        onClick={() => fileInputRef.current.click()}
      >
        {children}
      </Button>
    </>
  );
}

export default ImportButton;
