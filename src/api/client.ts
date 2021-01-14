import { isEmpty } from "lodash";
import Snoowrap from "snoowrap";

import { CLIENT_ID } from "./const";

import { getConfiguration } from "../config";

const getTokens = () =>
  new Promise<[string, string]>((resolve, reject) => {
    const config = getConfiguration();
    const accessToken = config.get("accessToken");
    const refreshToken = config.get("refreshToken");

    if (isEmpty(accessToken)) {
      reject(new Error("Reddit access token is missing."));
    } else if (isEmpty(refreshToken)) {
      reject(new Error("Reddit refresh token is missing."));
    } else {
      resolve([accessToken, refreshToken]);
    }
  });

export const getClient = (): Promise<Snoowrap> =>
  getTokens().then(
    ([accessToken, refreshToken]) =>
      new Snoowrap({
        accessToken,
        clientId: CLIENT_ID,
        refreshToken,
        userAgent: "RedGit",
      })
  );
