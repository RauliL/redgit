import { Command, flags } from "@oclif/command";
import { CLIError } from "@oclif/errors";
import { Submission } from "snoowrap";

import { getSubmission } from "../api";
import { openTemporaryFileEditor } from "../editor";
import { formatWrappedText } from "../ui";
import { isBlank, splitLines } from "../util";

export default class ReplyCommand extends Command {
  static description = "replies to an submission";

  static flags = {
    message: flags.string({
      char: "m",
      description: "message to send as an reply",
      required: false,
    }),
  };

  static args = [
    {
      description: "id of the submission to reply to",
      name: "id",
      required: true,
    },
  ];

  run() {
    const {
      args: { id },
      flags,
    } = this.parse(ReplyCommand);

    return getSubmission(id).then((submission) => {
      const hasSelftext = !isBlank(submission.selftext);

      if (flags.message != null) {
        return this.sendMessage(submission, flags.message);
      }

      return openTemporaryFileEditor(
        [
          "",
          "#",
          "# Replying to:",
          ...formatWrappedText(submission.title, 77).map(
            (line) => `# ${line}`
          ),
          hasSelftext ? "#" : null,
          ...(hasSelftext
            ? formatWrappedText(submission.selftext, 77)
            : []
          ).map((line) => `# ${line}`),
          "#",
        ]
          .filter((line) => line != null)
          .join("\n")
      ).then((rawMessage) =>
        this.sendMessage(
          submission,
          splitLines(rawMessage)
            .filter((line) => !line.startsWith("#"))
            .join("\n")
            .trim()
        )
      );
    });
  }

  private sendMessage(submission: Submission, message: string) {
    if (isBlank(message)) {
      return Promise.reject(new CLIError("Cannot reply with empty message."));
    }

    return submission.reply(message).then(() => this.log("Reply sent."));
  }
}
