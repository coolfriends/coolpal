const axios = require('axios');
const utils = require('../utils.js');

class BitcoinPlugin {
  constructor(config = {}) {
    this.command = 'bitcoin';
    this.supported_event_types = ['message'];
    this.url = 'https://api.coinbase.com/v2/prices/BTC-USD/buy';
    this.axios = config.axios || axios.create();
  }

  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }

  handle_message(message, config) {
    let command_args = utils.split_message(message);
    if (command_args[0] != config.prefix + 'bitcoin') {
      return false;
    }
    if (message.author.username == config.client.user.username) {
      return true;
    }
    let url = this.url;
    this.call_bitcoin_api(message, url, config);
    return true;
  }

  call_bitcoin_api(message, url, config = {}) {
    this.axios({
      method: 'get',
      url: url
    }).then(response => {
      message.reply("\nFrom Coinbase | " +
        "Current Bitcoin price in USD: $" +
        response.data.data.amount);
      return true;
    }).catch(error => {
      console.log();
      return true;
    });
  }
};


module.exports = BitcoinPlugin;
