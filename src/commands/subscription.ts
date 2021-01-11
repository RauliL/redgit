import { Command } from "@oclif/command";
import { CLIError } from "@oclif/errors";
import { isEmpty } from "lodash";

import { getClient, getSubreddit } from "../api";

export default class SubscriptionCommand extends Command {
  static description = "manage subreddit subscriptions";

  static args = [
    {
      name: "command",
      options: ["add", "rm"],
      required: false,
    },
    {
      name: "subreddit",
      description: "name of subreddit (without /r/ prefix)",
      required: false,
    },
  ];

  run() {
    const {
      args: { command, subreddit },
    } = this.parse(SubscriptionCommand);

    if (isEmpty(command)) {
      return getClient()
        .then((client) => client.getSubscriptions())
        .then((subreddits) =>
          subreddits.forEach((subreddit) =>
            process.stdout.write(`${subreddit.display_name}\n`)
          )
        );
    }

    if (isEmpty(subreddit)) {
      throw new CLIError("Missing subreddit name");
    }

    return getSubreddit(subreddit)
      .then((subreddit) =>
        command === "add" ? subreddit.subscribe() : subreddit.unsubscribe()
      )
      .then((subreddit) =>
        this.log(
          command === "add"
            ? `Subscribed to ${subreddit.display_name}`
            : `Removed subscription of ${subreddit.display_name}`
        )
      );
  }
}
