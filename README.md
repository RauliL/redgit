redgit
======

Git like interface for Reddit.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/redgit.svg)](https://npmjs.org/package/redgit)
[![Downloads/week](https://img.shields.io/npm/dw/redgit.svg)](https://npmjs.org/package/redgit)
[![License](https://img.shields.io/npm/l/redgit.svg)](https://github.com/RauliL/redgit/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
```sh-session
$ npm install -g redgit
$ redgit init
$ redgit log --ordering=new --limit 5 aww
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`redgit config [KEY] [VALUE]`](#redgit-config-key-value)
* [`redgit downvote ID`](#redgit-downvote-id)
* [`redgit help [COMMAND]`](#redgit-help-command)
* [`redgit init`](#redgit-init)
* [`redgit log [SUBREDDIT]`](#redgit-log-subreddit)
* [`redgit open ID`](#redgit-open-id)
* [`redgit show ID`](#redgit-show-id)
* [`redgit subscribe SUBREDDIT`](#redgit-subscribe-subreddit)
* [`redgit unsubscribe SUBREDDIT`](#redgit-unsubscribe-subreddit)
* [`redgit upvote ID`](#redgit-upvote-id)

## `redgit config [KEY] [VALUE]`

manage RedGit configuration

```
USAGE
  $ redgit config [KEY] [VALUE]

ARGUMENTS
  KEY    name of the variable to get/set
  VALUE  new value of the variable

OPTIONS
  -e, --edit               opens the configuration file in text editor
  -l, --list               list all
  --get=get                get value: name
  --get-regexp=get-regexp  get values for regexp: name-regex
  --unset=unset            remove a variable: name
```

_See code: [src/commands/config.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/config.ts)_

## `redgit downvote ID`

downvotes an submission

```
USAGE
  $ redgit downvote ID

ARGUMENTS
  ID  id of the submission to downvote
```

_See code: [src/commands/downvote.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/downvote.ts)_

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

## `redgit init`

initializes RedGit with Reddit authentication tokens

```
USAGE
  $ redgit init
```

_See code: [src/commands/init.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/init.ts)_

## `redgit log [SUBREDDIT]`

list submissions

```
USAGE
  $ redgit log [SUBREDDIT]

ARGUMENTS
  SUBREDDIT  subreddit to list submissions from

OPTIONS
  -l, --limit=limit                                limit the number of listed submissions
  -o, --ordering=controversial|hot|new|rising|top  [default: hot] ordering of submissions
  -t, --time=all|hour|day|month|week|year
```

_See code: [src/commands/log.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/log.ts)_

## `redgit open ID`

opens URL of an submission in browser

```
USAGE
  $ redgit open ID

ARGUMENTS
  ID  id of the submission to open
```

_See code: [src/commands/open.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/open.ts)_

## `redgit show ID`

display single submission

```
USAGE
  $ redgit show ID

ARGUMENTS
  ID  id of the submission to display
```

_See code: [src/commands/show.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/show.ts)_

## `redgit subscribe SUBREDDIT`

subscribes to an subreddit

```
USAGE
  $ redgit subscribe SUBREDDIT

ARGUMENTS
  SUBREDDIT  name of the subreddit (without the /r/ prefix)
```

_See code: [src/commands/subscribe.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/subscribe.ts)_

## `redgit unsubscribe SUBREDDIT`

removes subscription of an subreddit

```
USAGE
  $ redgit unsubscribe SUBREDDIT

ARGUMENTS
  SUBREDDIT  name of the subreddit (without the /r/ prefix)
```

_See code: [src/commands/unsubscribe.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/unsubscribe.ts)_

## `redgit upvote ID`

upvotes an submission

```
USAGE
  $ redgit upvote ID

ARGUMENTS
  ID  id of the submission to upvote
```

_See code: [src/commands/upvote.ts](https://github.com/RauliL/redgit/blob/v0.2.0/src/commands/upvote.ts)_
<!-- commandsstop -->
