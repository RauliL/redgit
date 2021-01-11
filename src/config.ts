import Configstore from "configstore";

export const getConfiguration = () =>
  new Configstore("redgit", {}, { globalConfigPath: true });
