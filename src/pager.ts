import { spawn } from "child_process";
import { Writable } from "stream";
import through from "through";

export const createPager = () =>
  new Promise<Writable>(async (resolve, reject) => {
    // TODO: Find out an solution to use pagers on Windows.
    if (/^win/.test(process.platform)) {
      resolve(process.stdout);
      return;
    }

    const stream = through();
    const sink = spawn(process.env.PAGER ?? "less", {
      stdio: ["pipe", process.stdout, process.stderr],
    });

    sink.on("error", reject);
    sink.on("close", process.exit);

    stream.pipe(sink.stdin);
    resolve(stream);

    stream.on("end", () => {
      process.stdin.setRawMode?.(true);
      process.stdin.resume();
      process.stdin.pipe(sink.stdin, { end: false });
    });
  });
