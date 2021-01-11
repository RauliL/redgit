import { Command } from "@oclif/command";

import { getSubmission } from "../api";
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

    return getSubmission(id).then((submission) =>
      renderSubmission(process.stdout, submission, {
        displaySelfText: true,
        displaySubreddit: true,
      })
    );
  }
}
