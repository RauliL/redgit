import { Writable } from "stream";

import { formatWrappedText } from "./format";

export const renderWrappedText = (
  output: Writable,
  input: string,
  width: number = 79,
  padding: number = 0
) =>
  formatWrappedText(input, width - padding).forEach((line) =>
    output.write(`${" ".repeat(padding)}${line}\n`)
  );

export const renderTimestamp = (timestamp: number) =>
  new Date(timestamp * 1000).toString();
