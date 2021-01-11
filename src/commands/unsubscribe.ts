import { Command } from "@oclif/command";

import { getSubreddit } from "../api";

export default class UnsubscribeCommand extends Command {
  static description = "removes subscription of an subreddit";

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
    } = this.parse(UnsubscribeCommand);

    return getSubreddit(subreddit)
      .then((subreddit) => subreddit.unsubscribe())
      .then((subreddit) =>
        this.log(`Removed subscription of ${subreddit.display_name_prefixed}`)
      );
  }
}
