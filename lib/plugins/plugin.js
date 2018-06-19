/**
 * Plugin is an abstract class providing an interface for consuming Discord events.
 */
class Plugin {
  /**
   * @constructs Plugin
   * @param {Object} pal - A {@link CoolPal} instance.
   * @param {Object} [config={}] - The optional configuration for a plugin.
   */
  constructor(pal, config = {}) {
    /**
     * @member {Object} pal - A reference to the calling {@link CoolPal} instance.
     */
    this.pal = pal;

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

    /**
     * @member {char} Plugin#prefix - A char to prefix commands for the bot to execute
     */
    this.prefix = '!';
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
  handle_event(event_type, event) {
    if (event_type == 'message') {
      return this.handle_message(event);
    }
    return false;
  }

  /**
   * Generate the prefixed command for this plugin. Used to match against when
   * checking user input.
   * @returns {string} A prefix appended to the command name defined for the plugin.
   */
  get prefixed_command() {
    return this.prefix + this.command;
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
  handle_message(message) {
    return false;
  }
}

module.exports = Plugin;
