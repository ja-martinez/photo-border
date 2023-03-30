export default function isValidImage(file) {
  // may need to specify file types in future
  if (file.type.startsWith("image/")) {
    return true;
  }
  return false;
}
