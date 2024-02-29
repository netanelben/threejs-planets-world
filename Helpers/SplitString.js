export function splitString(str, maxLength) {
  const words = str.split(" ");
  let lines = [];
  let currentLine = "";

  words.forEach((word) => {
    if ((currentLine + word).length <= maxLength) {
      currentLine += (currentLine === "" ? "" : " ") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine !== "") {
    lines.push(currentLine);
  }

  return lines;
}
