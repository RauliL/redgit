import { Command } from "@oclif/command";

import { getSubreddit } from "../api";

export default class SubscribeCommand extends Command {
  static description = "subscribes to an subreddit";

  static args = [
    {
      name: "subreddit",
      description: "name of the subreddit (without the /r/ prefix)",
      required: true,
    },
  ];

  run() {
    const {
      args: { subreddit },
    } = this.parse(SubscribeCommand);

    return getSubreddit(subreddit)
      .then((subreddit) => subreddit.subscribe())
      .then((subreddit) =>
        this.log(`Subscribed to ${subreddit.display_name_prefixed}`)
      );
  }
}
