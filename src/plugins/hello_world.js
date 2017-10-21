const Plugin = require('../plugin.js');

class HelloWorldPlugin {
  constructor() {
    this.supported_event_types = ['message'];
  }

  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }

  handle_message(message, config) {
    // Make sure author of the message is not the bot
    if (message.author != config.client.user.username) {
      if (message.content.startsWith(config.prefix + 'helloworld')) {
        message.reply("Hello, world!");
      }
    }
    return true;
  }
}

module.exports = HelloWorldPlugin;
