import { Command, flags } from "@oclif/command";
import chalk from "chalk";
import open from "open";

import { createAuthenticationServer } from "../api";
import { getConfiguration } from "../config";

export default class InitCommand extends Command {
  static description = "initializes RedGit with Reddit authentication tokens";

  static flags = {
    "no-open": flags.boolean({
      description:
        "do not automatically open the authorization URL in browser",
      default: false,
      hidden: true,
    }),
    "no-write": flags.boolean({
      description:
        "do not write authorization tokens into the configuration file",
      default: false,
      hidden: true,
    }),
  };

  async run() {
    const { flags } = this.parse(InitCommand);
    const onStart = (authenticationURL: string) => {
      this.log(
        "Open URL %s in the browser to authorize RedGit to use the Reddit API.",
        authenticationURL
      );
      if (!flags["no-open"]) {
        open(authenticationURL);
      }
    };
    const onReject = (authenticationURL: string) => {
      this.warn(
        'In order to obtain a token, you will need to click "allow" at the Reddit authentication screen.'
      );
      this.log(
        "You can try again by opening following URL in the browser: %s",
        authenticationURL
      );
    };
    const onError = () => {
      this.warn("An error occurred while obtaining the authorization tokens.");
    };

    return createAuthenticationServer(onStart, onReject, onError).then(
      ([accessToken, refreshToken]) => {
        const config = getConfiguration();

        process.stdout.write(
          "Your Reddit tokens have been successfully retrieved.\n\n"
        );
        if (!flags["no-write"]) {
          config.set("accessToken", accessToken);
          config.set("refreshToken", refreshToken);
          process.stdout.write(`\
These tokens have been written into your RedGit configuration file located at:
    ${chalk.yellow(config.path)}

You can now start using ${chalk.yellow("redgit")}.
`);
        } else {
          process.stdout.write(`\
In order to use RedGit, you need to store these tokens into your RedGit configuration file located at:
    ${chalk.yellow(config.path)}

Insert following lines into the file:
    ${chalk.yellow(`{
      "accessToken": "${accessToken}",
      "refreshToken": "${refreshToken}"
    }`)}
`);
        }
      }
    );
  }
}
