import { isBlank, splitLines } from "../../util";

export const formatWrappedText = (
  input: string,
  width: number = 79
): string[] => {
  const result: string[] = [];

  splitLines(input).forEach((inputLine) => {
    if (isBlank(inputLine)) {
      result.push("");
    } else {
      let outputLine = "";

      inputLine.split(" ").forEach((word) => {
        if (outputLine.length + word.length <= width) {
          if (outputLine.length > 0) {
            outputLine += " ";
          }
          outputLine += word;
        } else {
          result.push(outputLine);
          outputLine = word;
        }
      });
      if (outputLine.length > 0) {
        result.push(outputLine);
      }
    }
  });

  return result;
};
