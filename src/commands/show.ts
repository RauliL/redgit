import { Command } from "@oclif/command";
import { CLIError } from "@oclif/errors";

import { getClient } from "../api";
import { renderSubmission } from "../ui";

export default class ShowCommand extends Command {
  static description = "display single submission";

  static args = [
    {
      description: "id of the submission to display",
      name: "id",
      required: true,
    },
  ];

  run() {
    const {
      args: { id },
    } = this.parse(ShowCommand);

    return getClient()
      .then((client) => client.getSubmission(id).fetch())
      .then((submission) =>
        submission == null
          ? Promise.reject(
              new CLIError(`No submission with ID ${id} was found.`)
            )
          : renderSubmission(process.stdout, submission, {
              displaySelfText: true,
              displaySubreddit: true,
            })
      );
  }
}
