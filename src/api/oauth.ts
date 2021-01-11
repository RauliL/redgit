import { CLIError } from "@oclif/errors";
import { randomBytes } from "crypto";
import fs from "fs";
import http from "http";
import { template } from "lodash";
import path from "path";
import request from "request";
import { stringify } from "querystring";
import url from "url";

import { CLIENT_ID } from "./const";

const BASE_URL = "https://www.reddit.com/api/v1/";
const PORT = 65010;
const EXPECTED_REDIRECT_URI = `http://localhost:${65010}/authorize_callback`;
const REQUESTED_SCOPES = [
  "edit",
  "mysubreddits",
  "read",
  "report",
  "save",
  "submit",
  "subscribe",
  "vote",
];

const getAuthenticationURL = (state: string) =>
  `${BASE_URL}authorize?${stringify({
    client_id: CLIENT_ID,
    response_type: "code",
    state,
    redirect_uri: EXPECTED_REDIRECT_URI,
    duration: "permanent",
    scope: REQUESTED_SCOPES.join(" "),
  })}`;

const sendResponse = (
  res: http.ServerResponse,
  templateName: string,
  statusCode: number = 200,
  data?: Record<string, string>
) => {
  res.writeHead(statusCode, { "Content-Type": "text/html; charset=utf-8" });
  res.end(
    template(
      fs
        .readFileSync(
          path.join(
            __dirname,
            "..",
            "..",
            "html",
            `oauth-${templateName}.html`
          )
        )
        .toString("utf-8")
    )(data)
  );
};

export const createAuthenticationServer = (
  onStart: (authenticationURL: string) => void,
  onReject: (authenticationURL: string) => void,
  onError: () => void
) =>
  new Promise<[string, string]>((resolve, reject) => {
    const state = randomBytes(16).toString("base64");
    const authenticationURL = getAuthenticationURL(state);
    let server: http.Server | undefined;
    const onAccept = (accessToken: string, refreshToken: string) => {
      if (server != null) {
        server.close();
        server = undefined;
      }
      resolve([accessToken, refreshToken]);
    };

    server = http.createServer((req, res) => {
      const { query } = url.parse(req.url ?? "", true);

      if (query.state !== state) {
        sendResponse(res, "error", 401);
        onError();
      } else if (query.code) {
        request.post(
          {
            baseUrl: BASE_URL,
            uri: "access_token",
            json: true,
            auth: {
              user: CLIENT_ID,
              pass: "",
            },
            form: {
              grant_type: "authorization_code",
              code: query.code,
              redirect_uri: EXPECTED_REDIRECT_URI,
            },
          },
          (error, response) => {
            if (error) {
              sendResponse(res, "error", 400);
              onError();
              return;
            }

            const accessToken = response.body.access_token;
            const refreshToken = response.body.refresh_token;

            sendResponse(res, "accept", 200, { accessToken, refreshToken });
            onAccept(accessToken, refreshToken);
          }
        );
      } else if (query.error === "access_denied") {
        sendResponse(res, "reject", 401, { authenticationURL });
        onReject(authenticationURL);
      } else {
        sendResponse(res, "error", 400);
        onError();
      }
    });
    server.listen(PORT, (error: Error) => {
      if (error) {
        reject(
          new CLIError(`Unable to open local port ${PORT} for listening.`)
        );
      } else {
        onStart(authenticationURL);
      }
    });
  });
