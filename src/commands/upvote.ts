import { Command } from "@oclif/command";

import { getSubmission } from "../api";

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

    return getSubmission(id)
      .then((submission) => submission.upvote())
      .then(() => this.log(`Submission ${id} upvoted.`));
  }
}
