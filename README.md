# CoolPal

A cool pal ready to hang out in your Discord server

[![Build Status](https://travis-ci.org/coolfriends/coolpal.svg?branch=master)](https://travis-ci.org/coolfriends/coolpal)
[![Coverage Status](https://coveralls.io/repos/github/coolfriends/coolpal/badge.svg?branch=master)](https://coveralls.io/github/coolfriends/coolpal?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Inline docs](http://inch-ci.org/github/coolfriends/coolpal.svg?branch=master)](http://inch-ci.org/github/coolfriends/coolpal)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

## Download repo and install dependencies

### Requirements

- node v8.0.0 or greater
- npm dependencies

### Install node v8.0.0 or greater

Install globally with your package manager, or use nvm:
https://github.com/creationix/nvm

### Download project & change directories

```bash
git clone https://github.com/coolfriends/coolpal.git
cd coolpal
```

### Download dependencies

```bash
npm install
```

Link the local executable to your /usr/bin path

```bash
npm link
```

```bash
coolpal --help
```

### Run coolpal on local machine

Run bundle steps

```bash
npm run bundle
```

Run bot

```bash
npm start
```

Run bot as daemon with Forever from source directory

```bash
forever start --minUptime 100000000 ./dist/bin.bundle.js
```


## Configuration

When looking for a configuration file, the following are checked in order:

1.  CLI argument
2.  Default configuration file name


To start the bot without putting a token in the configuration file, export the
following environment variable:

```bash
export COOLPAL_DISCORD_TOKEN="your-token"
```


### Build docker image and run coolpal in container

Make sure you have docker installed: https://docs.docker.com/engine/installation/

Build image from Dockerfile

```bash
docker build --no-cache -t coolpal .
```

Run container in detached mode

```bash
docker run -d coolpal
```

Run container and enter shell

```bash
docker run -it coolpal
```

## Run the tests

Make sure to run `npm install` to get the mocha dev dependency.
Then run the tests like so:

````bash
npm test


## Create docs

```bash
npm run docs
````

## Format code

```bash
npm run format
```

```
## Pre-commit

The `precommit` script in `package.json` runs on any add. This will enforce
good style. Make sure to have the latest dev-deps installed with `npm install`
```
