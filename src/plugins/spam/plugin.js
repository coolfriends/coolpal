const utils = require('../utils.js');
const Plugin = require('../plugin.js');

class SpamPlugin extends Plugin {
  constructor() {
    super();
    this.command = 'spam';
    this.supported_event_types = ['message'];
  }

  handle_message(message, config) {
    let command_args = utils.split_message(message);
    // Make sure author of the message is not the bot
    if (command_args[0] != config.prefix + 'spam') {
      return false;
    }

    let spam_times = Number(command_args[1]);
    if (!spam_times && spam_times != NaN) {
      message.reply("Usage: /spam [number of times]");
    }

    if (message.author.username != config.client.user.username) {
      let reply = '';
      for (let _i = 0; _i < spam_times; ++_i) {
        reply += 'SPAM!!! '.repeat(10) + 'SPAM!!!\n';
        if (_i % 22 == 0) {
          message.reply(reply);
          reply = '';
        }
      }
      message.reply(reply);
    }
    return true;
  }
}

module.exports = SpamPlugin;
