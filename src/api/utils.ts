import { CLIError } from "@oclif/errors";

import { getClient } from "./client";

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
