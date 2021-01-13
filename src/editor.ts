import { spawn } from "child_process";
import fs from "fs";
import { noop } from "lodash";
import tmp from "tmp";

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

/**
 * Opens an temporary file in users preferred text editor, with optional
 * initial contents.
 */
export const openTemporaryFileEditor = (initialContent?: string) =>
  new Promise<string>((resolve, reject) => {
    tmp.file((error, path, fd, cleanupCallback) => {
      if (error) {
        reject(error);
        return;
      }
      if (initialContent != null) {
        fs.write(fd, Buffer.from(initialContent), noop);
      }
      openEditor(path)
        .then(() => {
          fs.readFile(path, (error, content) => {
            if (error) {
              reject(error);
            } else {
              resolve(content.toString());
            }
          });
        })
        .catch(resolve)
        .finally(cleanupCallback);
    });
  });
