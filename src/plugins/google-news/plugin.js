const Plugin = require('../plugin.js');
const utils = require('../utils.js');
const googleNewsRss = require('google-news-rss');

class GoogleNewsPlugin extends Plugin {
  constructor(config = {}) {
    super();
    this.command = 'news';
    this.supported_event_types = ['message'];
    this.googleNews = new googleNewsRss();
  }

  handle_message(message, config) {
    let command_args = utils.split_message(message);
    if (command_args[0] != config.prefix + 'news') {
      return false;
    }
    if (message.author.username == config.client.user.username) {
      return true;
    }
    // Query Google News for the top story related to message
    this.call_google_news_rss(message);
    return true;
  }

  call_google_news_rss(message) {
    // Parse message and format for compatability with google-news-rss plugin
    // resp contains multiple search results accessible via resp[n]
    let search_query = utils.split_message(message).slice(1).join(' ');
    this.googleNews
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
        console.log("Failed to get results for" + message);
        return true;
      });
  }
};

module.exports = GoogleNewsPlugin;
