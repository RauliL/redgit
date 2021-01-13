import chalk from "chalk";
import columnify from "columnify";
import { isEmpty } from "lodash";
import { Submission } from "snoowrap";
import { Writable } from "stream";

import { renderTimestamp, renderWrappedText } from "./util";

type RenderSubmissionOptions = {
  displaySelfText: boolean;
  displaySubreddit: boolean;
};

export const renderSubmission = (
  output: Writable,
  submission: Submission,
  options: Partial<RenderSubmissionOptions> = {}
) => {
  const info: Record<string, string> = {};

  if (options.displaySubreddit) {
    info["Subreddit:"] = submission.subreddit_name_prefixed;
  }
  info["Author:"] = submission.author.name;
  info["Date:"] = renderTimestamp(submission.created);
  info["Comments:"] = submission.num_comments.toString();
  if (submission.url) {
    info["URL:"] = submission.url;
  }

  output.write(
    `${chalk.yellow(`submission ${submission.id} (`)}${chalk.green(
      submission.score.toString()
    )}${chalk.yellow(")")}\n`
  );
  output.write(columnify(info, { showHeaders: false }));
  output.write("\n\n");
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
