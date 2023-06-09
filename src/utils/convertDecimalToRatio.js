export default function convertDecimalToRatio(decimal) {
  const decimalNum = parseFloat(decimal);

  switch (decimalNum) {
    case 0.8:
      return "4:5";
    case 1:
      return "1:1";
    case 1.5:
      return "3:2";
    case 1.77:
      return "16:9";
    // Extra Values
    case 1.25:
      return "5:4";
    case 1.33:
      return "4:3";
    default:
      return `${decimal}:1`;
  }
}