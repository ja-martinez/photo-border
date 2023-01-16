/*
To style, look at https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#using_hidden_file_input_elements_using_the_click_method

*/

function ImageInput({ onFileChange, children }) {
  return (
    <div>
      <label htmlFor="image">{children}</label>
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={onFileChange}
      />
    </div>
  );
}

export default ImageInput;
