import { Command } from "@oclif/command";
import { CLIError } from "@oclif/errors";
import open from "open";

import { getClient } from "../api";

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

    return getClient()
      .then((client) => client.getSubmission(id).fetch())
      .then((submission) =>
        submission == null
          ? Promise.reject(
              new CLIError(`No submission with ID ${id} was found.`)
            )
          : open(submission.url)
      );
  }
}
