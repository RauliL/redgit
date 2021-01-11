import { Command, flags } from "@oclif/command";
import Configstore from "configstore";
import { forEach, isEmpty } from "lodash";

import { getConfiguration } from "../config";
import { openEditor } from "../editor";

export default class ConfigCommand extends Command {
  static description = "manage RedGit configuration";

  static args = [
    {
      description: "name of the variable to get/set",
      name: "key",
      required: false,
    },
    {
      description: "new value of the variable",
      name: "value",
      required: false,
    },
  ];

  static flags = {
    edit: flags.boolean({
      char: "e",
      description: "opens the configuration file in text editor",
      required: false,
      exclusive: ["get", "get-regexp", "list", "unset"],
    }),
    get: flags.string({
      description: "get value: name",
      required: false,
      exclusive: ["edit", "get-regexp", "list", "unset"],
    }),
    "get-regexp": flags.string({
      description: "get values for regexp: name-regex",
      required: false,
      exclusive: ["edit", "get", "list", "unset"],
    }),
    list: flags.boolean({
      char: "l",
      description: "list all",
      required: false,
      exclusive: ["edit", "get", "get-regexp", "unset"],
    }),
    unset: flags.string({
      description: "remove a variable: name",
      required: false,
      exclusive: ["edit", "get", "get-regexp", "list"],
    }),
  };

  run() {
    const config = getConfiguration();
    const { args, flags } = this.parse(ConfigCommand);

    if (flags.edit) {
      return this.runEdit(config);
    } else if (flags.list) {
      this.runList(config);
    } else if (!isEmpty(flags.get)) {
      this.runGet(config, flags.get as string);
    } else if (!isEmpty(flags["get-regexp"])) {
      this.runGetRegexp(config, flags["get-regexp"] as string);
    } else if (!isEmpty(flags.unset)) {
      this.runUnset(config, flags.unset as string);
    } else if (!isEmpty(args.key) && !isEmpty(args.value)) {
      this.runAdd(config, args.key, args.value);
    } else if (!isEmpty(args.key)) {
      this.runGet(config, args.key as string);
    }

    return Promise.resolve();
  }

  private runAdd(config: Configstore, key: string, value: string) {
    config.set(key, value);
  }

  private runEdit(config: Configstore) {
    return openEditor(config.path);
  }

  private runGet(config: Configstore, key: string) {
    const value = config.get(key);

    if (value !== undefined) {
      process.stdout.write(`${value}\n`);
    }
  }

  private runGetRegexp(config: Configstore, keyPattern: string) {
    const pattern = new RegExp(keyPattern, "i");

    Object.keys(config.all)
      .filter((key) => pattern.test(key))
      .forEach((key) => process.stdout.write(`${key} ${config.get(key)}\n`));
  }

  private runList(config: Configstore) {
    forEach(config.all, (value, key) =>
      process.stdout.write(`${key}=${value}\n`)
    );
  }

  private runUnset(config: Configstore, key: string) {
    config.delete(key);
  }
}
