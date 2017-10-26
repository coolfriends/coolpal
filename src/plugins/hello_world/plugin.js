class HelloWorldPlugin {
  constructor() {
    this.command = 'helloworld';
    this.supported_event_types = ['message'];
  }

  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }

  prefixed_command(config) {
    return config.prefix + this.command;
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
