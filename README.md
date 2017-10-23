# Discordbot
[![Build Status](https://travis-ci.org/coolfriends/discordbot.svg?branch=update-readme)](https://travis-ci.org/coolfriends/discordbot)
Discord bot equipped with a simple plugin architecture.

## Installation

### Requirements
* node v8.0.0 or greater
* npm dependancies

### Download project

```bash
git clone https://github.com/kbougy/discordbot.git
```

### Install node v8.0.0 or greater
Install globally with your package manager, or use nvm:
https://github.com/creationix/nvm

### Download dependencies
```bash
npm install
```

## Usage
Run bundle steps
```bash
npm run bundle
```
Run bot
```bash
npm start
```

Demonstrate displaying polls in a tabular format
```bash
node examples/run_print_poll_list.js
```

## Development

### Create a new plugin
In src/plugins, create hello_world.js
```js
class HelloWorldPlugin {
}

module.exports = HelloWorldPlugin;
```

Add a constructor that specifies the types of Discord events this plugin will handle.
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
configuration file (passed in from `DiscordBot.receive_event`).
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
const DiscordBot = require('../src/discordbot.js');

let plugins = [
  new HelloWorldPlugin
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
```



### Use a different prefix
```js
const YourPlugin = require('../plugins/your_plugin.js');
const DiscordBot = require('../src/discordbot.js');
let token = 'your-token';
let bot = new DiscordBot(token, plugins, {
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

## TODO
* Create tests
* Change DynamoDB script to use version of dynamo (change host)
* Improve weather plugin to work for any area
* Use env variables where appropriate
* Google maps plugin to report traffic between common destinations
* Persistent TODO plugin for all users
* Reminder plugin
* Add waiter to DB creation script
* Spruce up weather report with em0jis
* Abstract displaying in a tabular format for easier use (make display_polls generic somehow)
  from `examples/run_print_poll_list.js`
* Change plugin interface where DiscordBot splits the incoming message into a command and args,
  and passes to plugins accordingly (by command name)
* Add prefix support
  

