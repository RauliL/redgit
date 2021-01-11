import { CLIError } from "@oclif/errors";

import { getClient } from "./client";

/**
 * Attempts to retrieve subreddit from the API, identified by it's name without
 * the "/r/" prefix. Fails if subreddit does not exist.
 */
export const getSubreddit = (name: string) =>
  getClient()
    .then((client) => client.getSubreddit(name).fetch())
    .then((subreddit) =>
      subreddit == null
        ? Promise.reject(`No subreddit with name ${name} was found.`)
        : subreddit
    );

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
