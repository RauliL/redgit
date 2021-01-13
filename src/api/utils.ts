import { CLIError } from "@oclif/errors";
import { Listing, Submission } from "snoowrap";
import { SortedListingOptions } from "snoowrap/dist/objects/Listing";

import { SubmissionOrdering } from "../types";
import { isBlank, stripSubredditPrefix } from "../util";

import { getClient } from "./client";

/**
 * Attempts to retrieve subreddit from the API, identified by it's name without
 * the "/r/" prefix. Fails if subreddit does not exist.
 */
export const getSubreddit = (name: string) => {
  const strippedName = stripSubredditPrefix(name);

  if (isBlank(strippedName)) {
    return Promise.reject(new CLIError("Missing subreddit name."));
  }

  return getClient()
    .then((client) => client.getSubreddit(strippedName as string).fetch())
    .then((subreddit) =>
      subreddit == null
        ? Promise.reject(
            new CLIError(`No subreddit with name ${strippedName} was found.`)
          )
        : subreddit
    );
};

/**
 * Attempts to retrieve list of submissions from the API.
 */
export const getSubmissionList = (
  subreddit?: string,
  ordering?: SubmissionOrdering,
  options?: SortedListingOptions
): Promise<Listing<Submission>> =>
  getClient().then((client) => {
    switch (ordering) {
      case SubmissionOrdering.CONTROVERSIAL:
        return client.getControversial(
          stripSubredditPrefix(subreddit),
          options
        );

      case SubmissionOrdering.HOT:
      default:
        return client.getHot(stripSubredditPrefix(subreddit), options);

      case SubmissionOrdering.NEW:
        return client.getNew(stripSubredditPrefix(subreddit), options);

      case SubmissionOrdering.RISING:
        return client.getRising(stripSubredditPrefix(subreddit), options);

      case SubmissionOrdering.TOP:
        return client.getTop(stripSubredditPrefix(subreddit), options);
    }
  });

/**
 * Attempts to retrieve single submission from the API, identified by it's ID.
 * Fails if the submission does not exist.
 */
export const getSubmission = (id: string) =>
  getClient()
    .then((client) => client.getSubmission(id).fetch())
    .then((submission) =>
      submission == null
        ? Promise.reject(
            new CLIError(`No submission with ID ${id} was found.`)
          )
        : submission
    );
