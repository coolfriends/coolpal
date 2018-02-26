const axios = require('axios');
const utils = require('../utils.js');
const Plugin = require('../plugin.js');

/**
 * This plugin allows users to check the current Bitcoin price from CoinBase.
 **/
class BitcoinPlugin extends Plugin {
  /**
   * @constructs BitcoinPlugin
   * Overloaded from {@link Plugin#constructor}
   */
  constructor(pal, config={}) {
    super(pal, config);

    /**
     * Overloaded from {@link Plugin#command}
     */
    this.command = 'bitcoin';

    /**
     * Overloaded from {@link Plugin#supported_event_types}
     */
    this.supported_event_types = ['message'];

    /**
     * @member {string} BitcoinPlugin#url - Coinbase BTC url.
     */
    this.url = config.url || 'https://api.coinbase.com/v2/prices/BTC-USD/buy';

    /**
     * @member {Object} BitcoinPlugin#axois - An axios client.
     */
    this.axios = config.axios || axios.create();
  }

  /**
   * Sends the user a message about the current Bitcoin price.
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or fales
   */
  handle_message(message) {
    let command_args = utils.split_message(message);

    if (command_args[0] != this.prefixed_command) {
      return false;
    }

    if (message.author.username == this.pal.client.user.username) {
      return true;
    }

    return this.call_bitcoin_api(message);
  }

  /**
   * Sends the user a message about the current Bitcoin price.
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or fales
   */
  call_bitcoin_api(message) {
    this.axios({
      method: 'get',
      url: this.url
    }).then(response => {
      message.reply("\nFrom Coinbase | Current Bitcoin price in USD: $" +
        response.data.data.amount);
      return true;
    }).catch(error => {
      console.log();
      return true;
    });
  }
};

module.exports = BitcoinPlugin;
