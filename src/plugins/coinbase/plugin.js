const axios = require('axios');
const utils = require('../utils.js');
const Plugin = require('../plugin.js');

/**
 * This plugin allows users to check the current currency values from CoinBase.
 **/
class CoinbasePlugin extends Plugin {
  /**
   * @constructs CoinbasePlugin
   * Overloaded from {@link Plugin#constructor}
   */
  constructor(pal, config={}) {
    super(pal, config);

    /**
     * Overloaded from {@link Plugin#command}
     */
    this.command = 'coinbase';

    /**
     * Overloaded from {@link Plugin#supported_event_types}
     */
    this.supported_event_types = ['message'];

    /**
     * @member {string} CoinbasePlugin#url - Coinbase url.
     */
    this.base_url = config.base_url || 'https://api.coinbase.com/v2/prices/BTC-USD/buy';

    /**
     * @member {Object} CoinbasePlugin#axois - An axios client.
     */
    this.axios = config.axios || axios.create();

    /**
     * @member {Object} CoinbasePlugin#coin_command_to_url_string - Maps an
     * expected coin input to a string for the Coinbase API.
     */
    this.coin_command_to_url_string = {
      btc: 'BTC-USD',
      eth: 'ETH-USD'
    };
  }

  get help() {
    return '\nCheck Coinbase coin prices\n\n' +
      '!coinbase list\n' +
      'Displays the available coins\n' +
      '!coinbase etc\n' +
      'Prints the current ETC value\n\n' +
      '!coinbase btc\n' +
      'Print the current BTC value\n';
  }

  /*
   * @param {string} coin - Either eth or btc
   * @returns {string} A url of the form
   * 'https://api.coinbase.com/v2/prices/BTC-USD/buy'
   */
  coin_price_url(coin) {
    return this.base_url + "/prices/" +
           this.coin_command_to_url_string(coin) + "/buy";
  }

  /**
   * Sends the user a message about a coin price from Coinbase.
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or fales
   */
  handle_message(message) {
    let command_args = utils.split_message(message);

    if (command_args[0] != this.prefixed_command()) {
      return false;
    }

    if (message.author.username === this.pal.client.user.username) {
      return true;
    }

    if (command_args[1] === undefined || command_args[1] === 'help') {
      message.reply(this.help);
      return true;
    }

    if (command_args[1] === 'list') {
      let reply_msg = '\nAvailable Coinbase coins\n\n' +
                      'btc - BTC to USD\n' +
                      'eth - ETH to USD\n';
      message.reply(reply_msg);
      return true;
    }

    // No coin provided in message
    let coin = command_args[2];
    if (coin === undefined || !this.valid_coin(coin)) {
      message.reply(this.help);
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

module.exports = CoinbasePlugin;
