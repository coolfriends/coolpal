import axios from "axios";
import * as utils from "../utils";
import Plugin from "../plugin";

/**
 * This plugin allows users to check the current currency values from CoinBase.
 **/
class CoinbasePlugin extends Plugin {
  /**
   * @constructs CoinbasePlugin
   * Overloaded from {@link Plugin#constructor}
   */
  constructor(pal, config = {}) {
    super(pal, config);

    /**
     * Overloaded from {@link Plugin#command}
     */
    this.command = "coinbase";

    /**
     * Overloaded from {@link Plugin#supported_event_types}
     */
    this.supported_event_types = ["message"];

    /**
     * @member {string} CoinbasePlugin#url - Coinbase url.
     */
    this.base_url =
      config.base_url || "https://api.coinbase.com/v2/prices/BTC-USD/buy";

    /**
     * @member {Object} CoinbasePlugin#axois - An axios client.
     */
    this.axios = config.axios || axios.create();

    /**
     * @member {Object} CoinbasePlugin#coin_command_to_url_string - Maps an
     * expected coin input to a string for the Coinbase API.
     */
    this.coin_command_to_url_string = {
      btc: "BTC-USD",
      eth: "ETH-USD"
    };
  }

  /**
   * @returns {string} A help message
   */
  get help() {
    return (
      "\n\nCheck Coinbase for current coin prices\n\n" +
      this.prefixed_command +
      " list\n" +
      "Displays the available coins\n\n" +
      this.prefixed_command +
      " eth\n" +
      "Prints the current ETH value\n\n" +
      this.prefixed_command +
      " btc\n" +
      "Print the current BTC value\n\n"
    );
  }

  /**
   * @param {string} coin - Either eth or btc
   * @returns {string} A url of the form
   * 'https://api.coinbase.com/v2/prices/BTC-USD/buy'
   */
  coin_price_url(coin) {
    return (
      this.base_url +
      "/prices/" +
      this.coin_command_to_url_string[coin] +
      "/buy"
    );
  }

  /**
   * @returns {bool} true if the coin is supported, or false
   */
  valid_coin(coin) {
    if (this.coin_command_to_url_string[coin]) {
      return true;
    }
    return false;
  }

  /**
   * Sends the user a message about a coin price from Coinbase.
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or false
   */
  handle_message(message) {
    let command_args = utils.split_message(message);

    if (command_args[0] != this.prefixed_command) {
      return false;
    }

    if (message.author.username === this.pal.client.user.username) {
      return true;
    }

    if (command_args[1] === undefined || command_args[1] === "help") {
      message.reply(this.help);
      return true;
    }

    if (command_args[1] === "list") {
      let reply_msg =
        "\nAvailable Coinbase coins\n\n" +
        "btc - BTC to USD\n" +
        "eth - ETH to USD\n";
      message.reply(reply_msg);
      return true;
    }

    // No coin provided in message
    if (!this.valid_coin(command_args[1])) {
      message.reply(this.help);
      return true;
    }
    return this.call_coinbase_api(message, command_args[1]);
  }

  /**
   * Sends the user a message about the current Coinbase price.
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or fales
   */
  call_coinbase_api(message, coin) {
    this.axios({
      method: "get",
      url: this.coin_price_url(coin)
    })
      .then(response => {
        let reply_msg = "\nFrom Coinbase | Current ";
        if (coin === "eth") {
          reply_msg += "ETH in USD: $";
        } else {
          reply_msg += "BTC in USD: $";
        }
        reply_msg += response.data.data.amount;
        message.reply(reply_msg);
        return true;
      })
      .catch(error => {
        console.log();
        return true;
      });
  }
}

module.exports = CoinbasePlugin;
