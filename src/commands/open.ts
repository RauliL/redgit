import { Command } from "@oclif/command";
import open from "open";

import { getSubmission } from "../api";

export default class OpenCommand extends Command {
  static description = "opens URL of an submission in browser";

  static args = [
    {
      description: "id of the submission to open",
      name: "id",
      required: true,
    },
  ];

  run() {
    const {
      args: { id },
    } = this.parse(OpenCommand);

    return getSubmission(id).then((submission) => open(submission.url));
  }
}
