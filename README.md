redgit
======

Git like interface for Reddit

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/redgit.svg)](https://npmjs.org/package/redgit)
[![Downloads/week](https://img.shields.io/npm/dw/redgit.svg)](https://npmjs.org/package/redgit)
[![License](https://img.shields.io/npm/l/redgit.svg)](https://github.com/RauliL/redgit/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g redgit
$ redgit COMMAND
running command...
$ redgit (-v|--version|version)
redgit/0.1.0 linux-x64 node-v12.16.1
$ redgit --help [COMMAND]
USAGE
  $ redgit COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`redgit help [COMMAND]`](#redgit-help-command)
* [`redgit log [SUBREDDIT]`](#redgit-log-subreddit)
* [`redgit show ID`](#redgit-show-id)

## `redgit help [COMMAND]`

display help for redgit

```
USAGE
  $ redgit help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.1/src/commands/help.ts)_

## `redgit log [SUBREDDIT]`

list submissions

```
USAGE
  $ redgit log [SUBREDDIT]

ARGUMENTS
  SUBREDDIT  subreddit to list submissions from

OPTIONS
  -o, --ordering=controversial|hot|new|rising|top  [default: hot] ordering of submissions
```

_See code: [src/commands/log.ts](https://github.com/RauliL/redgit/blob/v0.1.0/src/commands/log.ts)_

## `redgit show ID`

display single submission

```
USAGE
  $ redgit show ID

ARGUMENTS
  ID  id of the submission to display
```

_See code: [src/commands/show.ts](https://github.com/RauliL/redgit/blob/v0.1.0/src/commands/show.ts)_
<!-- commandsstop -->
