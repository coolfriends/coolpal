/**
 * Plugin is an abstract class providing an interface for consuming Discord events.
 */
class Plugin {
  /**
   * @constructs Plugin
   * @param {Object} [config={}] - The optional configuration for a plugin.
   */
  constructor(config={}) {
    /**
     * @member {string} Plugin#command - The base command a user types to access
     * this plugin.
     */
    this.command = '';

    /**
     * @member {string[]} Plugin#supported_event_types - A list of events
     * implemented. The only supported event type right now is message.
     */
    this.supported_event_types = [];
  }

  /**
   * Maps an event type to a handler for the plugin. The only supported event
   *
   * @param {string} event_type - A Discord API supported event type.
   * @param {Object} event - An event from the Discord API.
   * @param {Object} config - Configuration from a CoolPal instance.
   * @param {string} config.prefix - The prefix for a command. Default is '!'.
   * @param {Object} config.client - A Discord client instance.
   *
   * @todo Implement more event types
   *
   * @todo Deprecate passing in a config for a member variable called 'pal' that
   * offers the same functionality
   */
  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }

  /**
   *
   */
  prefixed_command(config) {
    return config.prefix + this.command;
  }

  /**
   * Abstract method for handling the message event. The plugin extending this
   * class is responsible for returning true if the message was handled, and
   * false otherwise.
   *
   * @param {Object} event - An event from the Discord API.
   * @param {Object} config - Configuration from a CoolPal instance.
   * @param {string} config.prefix - The prefix for a command. Default is '!'.
   * @param {Object} config.client - A Discord client instance.
   *
   * @returns {bool} false
   *
   * @todo Deprecate passing in a config for a member variable called 'pal' that
   * offers the same functionality
   */
  handle_message(message, config) {
    return false;
  }
}

module.exports = Plugin;
