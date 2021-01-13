import { Command, flags } from "@oclif/command";
import { isEmpty } from "lodash";
import { SortedListingOptions } from "snoowrap/dist/objects/Listing";

import { getSubmissionList } from "../api";
import { SubmissionOrdering, SubmissionTime } from "../types";
import { renderSubmissionList } from "../ui";

export default class LogCommand extends Command {
  static description = "list submissions";

  static flags = {
    // TODO: --after, --before
    limit: flags.integer({
      char: "l",
      description: "limit the number of listed submissions",
    }),
    ordering: flags.string({
      char: "o",
      default: SubmissionOrdering.HOT,
      description: "ordering of submissions",
      options: Object.values(SubmissionOrdering),
    }),
    // TODO: Add description about this option.
    time: flags.string({
      char: "t",
      options: Object.values(SubmissionTime),
    }),
  };

  static args = [
    {
      description: "subreddit to list submissions from",
      name: "subreddit",
      required: false,
    },
  ];

  run() {
    const {
      args: { subreddit },
      flags,
    } = this.parse(LogCommand);
    const options: SortedListingOptions = {
      limit: flags.limit,
    };

    if (flags.time) {
      options.time = flags.time as SubmissionTime;
    }

    return getSubmissionList(
      subreddit,
      flags.ordering as SubmissionOrdering,
      options
    ).then((submissions) =>
      renderSubmissionList(process.stdout, submissions, {
        displaySubreddit: isEmpty(subreddit),
      })
    );
  }
}
