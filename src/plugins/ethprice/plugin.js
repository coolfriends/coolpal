const axios = require('axios');
const utils = require('../utils.js');
const Plugin = require('../plugin.js');

/**
 * This plugin allows users to check the current Ethereum price from CoinBase.
 **/
class EthereumPlugin extends Plugin {
  /**
   * @constructs EthereumPlugin
   * Overloaded from {@link Plugin#constructor}
   */
  constructor(pal, config={}) {
    super(pal, config);

    /**
     * Overloaded from {@link Plugin#command}
     */
    this.command = 'ethereum';

    /**
     * Overloaded from {@link Plugin#supported_event_types}
     */
    this.supported_event_types = ['message'];

    /**
     * @member {string} EthereumPlugin#url - Coinbase Ethereum url.
     */
    this.url = config.url || 'https://api.coinbase.com/v2/prices/ETH-USD/buy';

    /**
     * @member {Object} EthereumPlugin#axois - An axios client.
     */
    this.axios = config.axios || axios.create();
  }

  handle_message(message) {
    let command_args = utils.split_message(message);

    if (command_args[0] != this.prefixed_command()) {
      return false;
    }

    if (message.author.username == this.pal.client.user.username) {
      return true;
    }

    return this.call_ethereum_api(message);
  }

  /**
   * Sends the user a message about the current Ethereum price.
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or fales
   */
  call_ethereum_api(message) {
    this.axios({
      method: 'get',
      url: this.url
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
