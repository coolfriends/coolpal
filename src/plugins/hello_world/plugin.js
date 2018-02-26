const Plugin = require('../plugin.js');

class HelloWorldPlugin extends Plugin {
  constructor(pal, config={}) {
    super(pal, config);
    this.command = 'helloworld';
    this.supported_event_types = ['message'];
  }

  handle_message(message, config) {
    // Make sure author of the message is not the bot
    if (message.content.startsWith(this.prefixed_command())) {
      if (message.author.username != this.pal.client.user.username) {
        message.reply("Hello, world!");
      }
      return true;
    }
    return false;
  }
}

module.exports = HelloWorldPlugin;
