import utils from '../utils';
import Plugin from '../plugin';

/**
 * This plugin allows users to make feature requests and check on their status.
 **/
class FeatureRequestPlugin extends Plugin {
  /**
   * @constructs FeatureRequestPlugin
   * Overloaded from {@link Plugin#constructor}
   * @todo Add an e-mail list for the feature requests
   */
  constructor(pal, config={}) {
    super(pal, config);

    /**
     * Overloaded from {@link Plugin#command}
     */
    this.command = 'feature-request';

    /**
     * Overloaded from {@link Plugin#supported_event_types}
     */
    this.supported_event_types = ['message'];

    /**
     * @member {string[]} FeatureRequestPlugin#_feature_requests - Feature requests by user.
     *
     * @private
     */
    this._feature_requests = {};
  }

  /**
   * @param {string} username - A Discord username
   * @returns {string[]} An array of feature requests
   */
  requests_for_user(username) {
    if (this._feature_requests[username] === undefined) {
      this._feature_requests[username] = [];
    }
    return this._feature_requests[username];
  }

  /**
   * @param {string} request - A new feature request
   * @param {string} username - A Discord username
   * @returns {string[]} An array of feature requests
   */
  store_request_for_user(request, username) {
    if (this._feature_requests[username] === undefined) {
      this._feature_requests[username] = [];
    }
    this._feature_requests[username].push(request);
  }

  /**
   * @returns {string} A help message
   */
  get help() {
    return 'This plugin will allow you to make new plugin requests\n\n' +
           this.prefixed_command + ' help\n' +
           'Displays this message again.\n\n' +
           this.prefixed_command + ' new this is where you type a request\n' +
           'Adds a new request\n\n' +
           this.prefixed_command + ' list\n' +
           'List the requests you have made\n';
  }

  /**
   * Handles the message event for this plugin.
   *
   * @param {Object} message - A Discord message event
   * @returns {bool} true if this plugin handled the event, or fales
   */
  handle_message(message) {
    let split_command = utils.split_message(message);
    if (split_command[0] != this.prefixed_command) {
      return false;
    }

    if (message.author.username === this.pal.client.user.username) {
      return true;
    }

    if (split_command[1] === 'new') {
      let feature_request = split_command.slice(2).join(' ');
      this.store_request_for_user(feature_request, message.author.username);
      message.reply(
        "Added the following to your feature requests:\n" + feature_request
      );
    } else if (split_command[1] === 'list') {
      let reply_message = 'Here are your feature requests:\n';
      for (let request of this.requests_for_user(message.author.username)) {
        reply_message += request + '\n';
      }
      message.reply(reply_message);
    } else {
      message.reply(this.help);
    }

    return true;
  }

}

module.exports = FeatureRequestPlugin;
