import { Command } from "@oclif/command";

import { getSubmission } from "../api";

export default class DownvoteCommand extends Command {
  static description = "downvotes an submission";

  static args = [
    {
      description: "id of the submission to downvote",
      name: "id",
      required: true,
    },
  ];

  run() {
    const {
      args: { id },
    } = this.parse(DownvoteCommand);

    return getSubmission(id)
      .then((submission) => submission.upvote())
      .then(() => this.log(`Submission ${id} downvoted.`));
  }
}
