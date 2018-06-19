const Discord = require('discord.js');
const plugin_name_to_class = require('./plugins/index.js').name_to_class;

/**
 * CoolPal is a bot for Discord with plugins.
 *
 * @example
 * // Copy the plugin configuration file from examples and fill in API keys
 * // and the Discord API token
 * fs.readFile('path/to/your/configuration/file.json', (err, data) => {
 *   if (err) {
 *     throw err;
 *   }
 *
 *   let configuration = JSON.parse(data);
 *
 *   let pal = new CoolPal(configuration);
 *   pal.start();
 * });
 */
class CoolPal {
  /**
   * Create your pal.
   *
   * @constructs CoolPal
   *
   * @param {string} config.token - A token for the Discord API.
   * @param {Object[]} config.plugins - Plugins to enable.
   * @param {string} config.plugins[].name - The name of a plugin.
   * @param {Object} config.plugins[].configuration - Configuration specific to the plugin.
   *
   * @todo Throw an error if no token is provided.
   */
  constructor(config) {
    /**
     * @member {Object} CoolPal#client - A Discord API client.
     */
    this.client = new Discord.Client();

    /**
     * @member {Object} CoolPal#discord_token - A Discord bot API token.
     */
    this.discord_token = config.token;

    /**
     * @member {Object[]} CoolPal#prefix - The prefix for all plugin commands.
     */
    this.prefix = config.prefix || '!';

    /**
     * @member {Object[]} CoolPal#_event_types - A list of unique event types.
     * @private
     */
    this._event_types = [];

    /**
     * @member {Object[]} CoolPal#_plugins - A list of configured plugin instances.
     * @private
     */
    this._plugins = [];

    /**
     * @member {Object} CoolPal#_pal_config - The high level configuration object for CoolPal.
     * It is the original configuration passed in during initialization.
     */
    this._pal_config = config;


    // End of member variables
    this._configure_plugins(config.plugins);
  }

  /**
   * Return a list of plugins
   *
   * @return {Object[]} A list of plugin for this instance.
   *
   * @example
   * // Iterate over the plugins
   * for (let plugin of pal.plugins) {
   *   console.log(plugin.command)
   * }
   *
   */
  get plugins() {
    return this._plugins;
  }

  /**
   * Starts the event loop.
   *
   * @example
   * let pal = CoolPal({
   *   token: process.env.DISCORD_TOKEN,
   *   plugins: []
   * });
   * pal.start();
   */
  start() {
    this._login();
    this._ready();
    this._receive_events();
  }

  /**
   * Creates an instance of a plugin using a plugin config
   *
   * @param {Object} plugin_config - The configuration object for a plugin
   * @param {string} plugin_config.name - The name of the plugin
   * @param {Object} plugin_config.configuration - An object that changes plugin functionality
   *
   * @returns An instance of the class corresponding to plugin_config.name
   * @private
   */
  _configure_plugin(plugin_config) {
    let plugin_class = plugin_name_to_class[plugin_config.name];
    return new plugin_class(this, plugin_config.configuration);
  }

  /**
   * Instantiates multiple plugins based on a configuration file.
   *
   * @param {Object[]} plugins_config - Highest level configuration object for multiple plugins.
   *
   * @private
   */
  _configure_plugins(plugins_config) {
    for (let plugin_config of plugins_config) {
      this._register_plugin(this._configure_plugin(plugin_config));
    }
  }

  /**
   * Adds a plugin to the instance and configured event types to handle new events.
   *
   * @param {Object} plugin - A single configured plugin that extends Plugin.
   * @private
   */
  _register_plugin(plugin) {
    this._plugins.push(plugin);

    for (let event_type of plugin.supported_event_types) {
      if (!this._event_types.includes(event_type)) {
        this._event_types.push(event_type);
      }
    }
  }

  /**
   * Logs in to the Discord API.
   *
   * @private
   */
  _login() {
    this.client.login(this.discord_token);
  }

  /**
   * Logs in to the Discord API.
   *
   * @private
   *
   * @todo Allow user to set their ready message
   */
  _ready() {
    this.client.on('ready', () => {
      console.log('Just saying im ready');
    });
  }

  /**
   * Register an event type to be received by all plugins.
   *
   * @private
   *
   * @todo Allow user to set their ready message
   */
  _receive_event(event_type) {
    this.client.on(event_type, event => {
      for (let plugin of this._plugins) {
        plugin.handle_event(event_type, event);
      }
    });
  }

  /**
   * Registers all event types to be receives by all plugins.
   *
   * @private
   */
  _receive_events() {
    for (let event_type of this._event_types) {
      this._receive_event(event_type);
    }
  }
};

module.exports = CoolPal;
