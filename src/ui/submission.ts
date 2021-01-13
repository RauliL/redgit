import chalk from "chalk";
import { isEmpty } from "lodash";
import { Submission } from "snoowrap";
import { Writable } from "stream";

import { renderTable, renderTimestamp, renderWrappedText } from "./util";

type RenderSubmissionOptions = {
  displaySelfText: boolean;
  displaySubreddit: boolean;
};

export const renderSubmission = (
  output: Writable,
  submission: Submission,
  options: Partial<RenderSubmissionOptions> = {}
) => {
  output.write(
    `${chalk.yellow(`submission ${submission.id} (`)}${chalk.green(
      submission.score.toString()
    )}${chalk.yellow(")")}\n`
  );
  renderTable(output, [
    options.displaySubreddit
      ? ["Subreddit", submission.subreddit_name_prefixed]
      : null,
    ["Author", submission.author.name],
    ["Date", renderTimestamp(submission.created)],
    ["Comments", submission.num_comments],
    submission.url ? ["URL", submission.url] : null,
  ]);
  output.write("\n");
  renderWrappedText(output, submission.title, 79, 4);
  if (options.displaySelfText && !isEmpty(submission.selftext)) {
    output.write("\n");
    renderWrappedText(output, submission.selftext, 79, 4);
  }
};

export const renderSubmissionList = (
  output: Writable,
  submissions: Submission[],
  options: Partial<RenderSubmissionOptions> = {}
) =>
  submissions.forEach((submission, index) => {
    renderSubmission(output, submission, options);
    if (index + 1 < submissions.length) {
      output.write("\n");
    }
  });
