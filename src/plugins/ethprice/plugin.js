const axios = require('axios');
const utils = require('../utils.js');
const Plugin = require('../plugin.js');

class EthereumPlugin extends Plugin {
  constructor(config = {}) {
    super();
    this.command = 'ethereum';
    this.supported_event_types = ['message'];
    this.url = config.url || 'https://api.coinbase.com/v2/prices/ETH-USD/buy';
    this.axios = config.axios || axios.create();
  }

  handle_message(message, config) {
    let command_args = utils.split_message(message);

    if (command_args[0] != config.prefix + 'ethereum') {
      return false;
    }

    if (message.author.username == config.client.user.username) {
      return true;
    }

    let url = this.url;
    this.call_ethereum_api(message, url, config);

    return true;
  }

  call_ethereum_api(message, url, config = {}) {
    this.axios({
      method: 'get',
      url: url
    }).then(response => {
      message.reply("\nFrom Coinbase | Current Ether price in USD: $" +
        response.data.data.amount);
      return true;
    }).catch(error => {
      console.log();
      return true;
    });
  }
};


module.exports = EthereumPlugin;
