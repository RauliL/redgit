import { Command, flags } from "@oclif/command";
import { isEmpty } from "lodash";
import { Listing, Submission } from "snoowrap";
import { SortedListingOptions } from "snoowrap/dist/objects/Listing";

import { getClient } from "../api";
import { createPager } from "../pager";
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

    return getClient().then((client) => {
      let promise: Promise<Listing<Submission>>;

      switch (flags.ordering) {
        case SubmissionOrdering.CONTROVERSIAL:
          promise = client.getControversial(subreddit, options);
          break;

        case SubmissionOrdering.HOT:
        default:
          promise = client.getHot(subreddit, options);
          break;

        case SubmissionOrdering.NEW:
          promise = client.getNew(subreddit, options);
          break;

        case SubmissionOrdering.RISING:
          promise = client.getRising(subreddit, options);
          break;

        case SubmissionOrdering.TOP:
          promise = client.getTop(subreddit, options);
          break;
      }

      return promise.then((submissions) =>
        createPager().then((output) => {
          renderSubmissionList(output, submissions, {
            displaySubreddit: isEmpty(subreddit),
          });
          output.end();
        })
      );
    });
  }
}
