export const isBlank = (input?: string): boolean =>
  input == null || /^\s*$/.test(input);

export const splitLines = (input: string): string[] => input.split(/\r?\n/);

export const stripSubredditPrefix = (input?: string): string | undefined =>
  input == null ? undefined : input.replace(/^\/?r\//i, "");
