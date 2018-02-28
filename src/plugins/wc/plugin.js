const querystring = require('querystring');
const axios = require('axios');
const utils = require('../utils.js');
const Plugin = require('../plugin.js');

class WCPlugin extends Plugin {
  constructor(pal, config={}) {
    super(pal, config);
    this.command = 'wc';
    this.supported_event_types = ['message'];
    this.base_url = config.base_url || process.env.WC_URL;
    this.wc_secret_key = config.wc_secret_key || process.env.WC_SECRET_KEY;
  }

  handle_message(message) {
    let command_args = utils.split_message(message);
    if (command_args[0] != this.prefixed_command) {
      return false;
    }

    // Message was created by the bot
    if (message.author.username == this.pal.client.user.username) {
      return true;
    }

    let text = command_args.slice(1).join(' ');
    this.call_wc(message, text);
    return true;
  }

  call_wc(message, text, config={}) {
    // Build the route
    let url = this.base_url + 'wc';
    let params = querystring.stringify({
      wc_secret_key: this.wc_secret_key,
      text: text
    });
    axios.post(url, params).then(response => {
      let data = response.data;
      if (data.most_common.count == 1) {
        let end_string = " occurence.";
      } else {
        let end_string = " occurences.";
      }

      let reply = "The word count for the text you provided is: " +
                  data.word_count + '\n' +
                  "The most commonly found word is \'" +
                  data.most_common.word + "\' with " +
                  data.most_common.count + " occurences.";
      message.reply(reply);
    }).catch(error => {
      // TODO: Handle this error
      console.log();
    });
  }
}

module.exports = WCPlugin;
