const Plugin = require('../plugin.js');

class HelloWorldPlugin extends Plugin {
  constructor() {
    super();
    this.command = 'helloworld';
    this.supported_event_types = ['message'];
  }

  handle_message(message, config) {
    // Make sure author of the message is not the bot
    if (message.content.startsWith(this.prefixed_command(config))) {
      if (message.author.username != config.client.user.username) {
        message.reply("Hello, world!");
      }
      return true;
    }
    return false;
  }
}

module.exports = HelloWorldPlugin;
