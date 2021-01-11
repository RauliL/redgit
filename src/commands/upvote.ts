import { Command } from "@oclif/command";
import { CLIError } from "@oclif/errors";

import { getClient } from "../api";

export default class UpvoteCommand extends Command {
  static description = "upvotes an submission";

  static args = [
    {
      description: "id of the submission to upvote",
      name: "id",
      required: true,
    },
  ];

  run() {
    const {
      args: { id },
    } = this.parse(UpvoteCommand);

    return getClient()
      .then((client) => client.getSubmission(id).fetch())
      .then((submission) =>
        submission == null
          ? Promise.reject(new CLIError(`No submission with ${id} was found.`))
          : submission.upvote()
      )
      .then(() => this.log(`Submission ${id} upvoted.`));
  }
}
