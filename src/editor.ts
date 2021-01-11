import { spawn } from "child_process";

/**
 * Opens an file in users preferred text editor, defined by $VISUAL or
 * $EDITOR environment variable.
 *
 * @param file File to open in text editor.
 */
export const openEditor = (file: string) => {
  const defaultEditor = /^win/.test(process.platform) ? "notepad" : "vim";
  const editor = process.env.VISUAL ?? process.env.EDITOR ?? defaultEditor;
  const args = editor.split(/\s+/);
  const bin = args.shift() as string;

  return new Promise<number | null>((resolve, reject) => {
    const childProcess = spawn(bin, args.concat([file]), { stdio: "inherit" });

    childProcess.on("error", (error) => reject(error));
    childProcess.on("exit", (exitCode) => resolve(exitCode));
  });
};
