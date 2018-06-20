import utils from "../utils";
import Plugin from "../plugin";

/**
 * This plugin presents a general help message, or a help message per plugin
 **/
class HelpPlugin extends Plugin {
  /**
   * @constructs HelpPlugin
   * Overloaded from {@link Plugin#constructor}
   */
  constructor(pal, config = {}) {
    super(pal, config);

    /**
     * Overloaded from {@link Plugin#command}
     */
    this.command = "help";

    /**
     * Overloaded from {@link Plugin#supported_event_types}
     */
    this.supported_event_types = ["message"];
  }

  /**
   * @returns {string} A help message
   */
  get help() {
    return (
      "\n\nRequest help for a plugin:\n\n" +
      "!help list\n" +
      "Lists plugins that you can request help for\n\n" +
      "!help help\n" +
      "Prints this message\n\n" +
      "!help <supported_plugin>\n" +
      "Prints the help for a supported plugin (see !help list)\n\n"
    );
  }

  /**
   * Sends the user a help message.
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
        "\nHere are commands with help available.\n" +
        "Call one with !help <command>\n";
      for (let plugin of this.pal.plugins) {
        if (plugin.help != undefined) {
          reply_msg += plugin.command + "\n";
        }
      }
      message.reply(reply_msg);
      return true;
    }

    for (let plugin of this.pal.plugins) {
      if (plugin.command === command_args[1]) {
        // Help message exists, so reply to message
        if (plugin.help != undefined) {
          message.reply(plugin.help);
          return true;
        }
        // Help is not implemented on plugin
        message.reply(plugin.command + " does not have a help message.\n");
        return true;
      }
    }
    // Plugin does not exist
    message.reply(command_args[1] + " is not a valid command.\n");
    return true;
  }
}

module.exports = HelpPlugin;
