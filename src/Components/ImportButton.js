import { useRef } from "react";

function ImportButton({ onFileChange, children }) {
  const fileInputRef = useRef(null);
  
  return (
    <>
      <input
        type="file"
        name="image"
        accept="image/*"
        style={{display: 'none'}}
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <button type="button" onClick={() => fileInputRef.current.click()}>
        {children}
      </button>
    </>
  );
}

export default ImportButton;
