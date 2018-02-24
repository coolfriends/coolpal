# CoolPal 

A cool pal ready to hang out in your Discord server

[![Build Status](https://travis-ci.org/coolfriends/coolpal.svg?branch=master)](https://travis-ci.org/coolfriends/coolpal)
[![Coverage Status](https://coveralls.io/repos/github/coolfriends/coolpal/badge.svg?branch=master)](https://coveralls.io/github/coolfriends/coolpal?branch=master)
 [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Inline docs](http://inch-ci.org/github/coolfriends/coolpal.svg?branch=master)](http://inch-ci.org/github/coolfriends/coolpal)
## Download repo and install dependencies

### Requirements
* node v8.0.0 or greater
* npm dependencies

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

### Run coolpal on local machine
Run bundle steps
```bash
npm run bundle
```

Run bot
```bash
npm start
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

Create docs
```bash
npm run docs
```

## Development

### Create a new plugin
In src/plugins, create hello_world.js
```js
class HelloWorldPlugin {
}

module.exports = HelloWorldPlugin;
```

Add a constructor that specifies the types of discord events this plugin will handle.
```js
class HelloWorldPlugin {
  constructor() {
    this.supported_event_types = ['message'];
  }
}
...
```

Then create a handle_event function. This function will return true if the
plugin is supposed to handle the event. It serves as an entry point to functions
that do work.
```js
class HelloWorldPlugin {
  ...
  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }
}
...
```

Finally, implement the handle_message function that takes the event and a
configuration file (passed in from `CoolPal.receive_event`).
```js
class HelloWorldPlugin {
  ...
  handle_message(message, config) {
    // Make sure author of the message is not the bot
    if (message.author != config.client.user.username) {
      if (message.content.startsWith(config.prefix + 'helloworld')) {
        message.reply("Hello, world!");
        return true;
      }
    }
    // Make sure to return false if this plugin is not designed to handle the
    // message passed in.
    return false;
  }
}
...
```

### Use the `HelloWorldPlugin`
```js
const HelloWorldPlugin = require('../src/plugins/hello_world.js');
const CoolPal = require('../src/coolpal.js');

let plugins = [
  new HelloWorldPlugin
];

let token = process.env.DISCORD_TOKEN;
let bot = new CoolPal(token, plugins);
bot.start();
```



### Use a different prefix
```js
const YourPlugin = require('../plugins/your_plugin.js');
const CoolPal = require('../src/coolpal.js');
let token = 'your-token';
let bot = new CoolPal(token, plugins, {
  prefix: '$'
})
bot.start();
```

## Run the tests
Make sure to run `npm install` to get the mocha dev dependency. 
Then run the tests like so:
```bash
npm test
```
