#Payment API Micro-service

## Installation

First, you have to install [Yarn](https://yarnpkg.com/lang/en/docs/install/). Then:

```bash
# This will install all dependencies from package.json
$ yarn install

# We use foreman to load the environment variables from `.env` file.
# This is important to prevent accidental commit of sensitive data to github
$ yarn global add foreman
```

## Environment

* Store all the environment variable in the `.env` file. This will be included in `.gitignore` so that it will not be commited to github.
Make sure you create the `.env` file or the service will not run.

The `.env` should contain the following:
```bash
DB_USER=<DB_USER>
DB_PASS=<DB_PASS>
DB_NAME=<DB_NAME>
DB_HOST=<DB_HOST>
DB_PORT=<DB_POST>

```
## Start

```bash
$ nf start
```
