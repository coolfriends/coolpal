const Plugin = require('../plugin.js');
const utils = require('../utils.js');
const googleNewsRss = require('google-news-rss');

/**
 * This plugin allows users to obtain a search result based on a search query.
 **/
class GoogleNewsPlugin extends Plugin {
  /**
   * @constructs CoinbasePlugin
   * Overloaded from {@link Plugin#constructor}
   */
  constructor(pal, config = {}) {
    super(pal, config);

    /**
     * Overloaded from {@link Plugin#command}
     */
    this.command = 'news';

    /**
     * Overloaded from {@link Plugin#supported_event_types}
     */
    this.supported_event_types = ['message'];

    /**
     * @member {Object} google_news - A client for accessing the Google News RSS API
     */
    this.google_news = config.google_news || new googleNewsRss();
  }

  /**
   * @returns {string} A help message
   */
  get help() {
    return '\nFetch news from Google\n\n' +
      '!news help\n' +
      'Displays this message\n' +
      '!news any topics\n' +
      'Replies with a search result from Google\n';
  }

  /**
   *
   * Replies to a user's message with a search result from Google
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
    if (command_args[1] === undefined || command_args[1] === 'help') {
      message.reply(this.help);
      return true;
    }
    // Query Google News for the top story related to message
    return this.call_google_news_rss(message);
  }

  /**
   *
   * Parse message for search query, format, and reply to the message.
   * If the call succeeds, only the top result from google news given to the user.
   * If the call fails, the bot will reply to the user with a message and the
   * search query.
   *
   * resp contains multiple search results accessible via resp[n]
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or false
   */
  call_google_news_rss(message) {
    let search_query = utils.split_message(message).slice(1).join(' ');
    this.google_news
      .search(String(search_query))
      .then(resp => {
        message.reply("\nThe Top Result from Google News. . .\n\n" +
          "------------------------------------\n" +
          "Query: " + search_query + "\n" +
          "------------------------------------\n\n" +
          resp[0].title + "\n\n" +
          resp[0].link + "\n");
        return true;
      }).catch(error => {
        let msg = "Failed to get results for " + search_query + "\n";
        message.reply(msg);
        console.log(msg);
        return true;
      });
    return true;
  }
};

module.exports = GoogleNewsPlugin;
