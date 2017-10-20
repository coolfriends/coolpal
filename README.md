# Discordbot
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

### Download dependancies
```bash
npm install
```

## Usage
Run the example
```bash
node examples/run_discordbot.js
```

Demonstrate displaying polls in a tabular format
```bash
node examples/run_print_poll_list.js
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
  

