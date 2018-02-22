const Discord = require('discord.js');
const plugin_name_to_class = require('./plugins/index.js').name_to_class;

/**
 * CoolPal is a bot for Discord with plugins.
 */
class CoolPal {
  /**
   * Create your pal.
   *
   * @todo Throw an error if no token is provided.
   *
   * @param {Object} config - The high level configuration object for CoolPal.
   * @param {string} config.token - A token for the Discord API.
   * @param {Object[]} config.plugins - Plugins to enable.
   * @param {string} plugins[].name - The name of a plugin.
   * @param {Object} plugins[].configuration - Configuration specific to the plugin.
   *
   */
  constructor(config={}) {
    this.config = config;
    this.client = new Discord.Client();
    this.discord_token = this.config.token;
    this._event_types = [];
    this._plugins = [];
    this.prefix = this.config.prefix || '!';
    this._configure_plugins(this.config.plugins);
  }

  /**
   * Return a list of plugins
   *
   * @return {Object[]} A list of plugin instances
   *
   * @example
   * var pal = CoolPal({});
   * var plugins = pal.plugins();
   */
  get plugins() {
    return this._plugins;
  }

  /**
   * Starts the event loop.
   *
   * @example
   * var pal = CoolPal({
   *   token: process.env.DISCORD_TOKEN;
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
   * @param {Object} plugin_config - The high level configuration object for a plugin
   * @param {string} plugin_config.name - The name of the plugin
   * @param {Object} plugin_config.configuration - An object that changes plugin functionality
   *
   * @returns An instance of the class corresponding to plugin_config.name
   * @private
   */
  _configure_plugin(plugin_config) {
    let plugin_class = plugin_name_to_class[plugin_config.name];
    return new plugin_class(plugin_config.configuration);
  }

  _configure_plugins(plugins_config) {
    for (let plugin of plugins_config) {
      this.register_plugin(this._configure_plugin(plugin));
    }
  }

  register_plugin(plugin) {
    this._plugins.push(plugin);

    for (let event_type of plugin.supported_event_types) {
      if (!this._event_types.includes(event_type)) {
        this._event_types.push(event_type);
      }
    }
  }

  _login() {
    this.client.login(this.discord_token);
  }

  // TODO: Allow user to set their ready message.
  _ready() {
    this.client.on('ready', () => {
      console.log('Just saying im ready');
    });
  }

  _generate_event_types() {
    let unique_event_types = [];
    for (let plugin of this._plugins) {
      for (let event_type of plugin.supported_event_types) {
        if (!unique_event_types.includes(event_type)) {
          unique_event_types.push(event_type);
        }
      }
    }
    this._event_types = unique_event_types;
  }

  // Minimum config to get plugins to work is client and prefix
  _receive_event(event_type) {
    this.client.on(event_type, event => {
      for (let plugin of this._plugins) {
        let handled_event = plugin.handle_event(event_type, event, {
          client: this.client,
          prefix: this.prefix
        });
      }
    });
  }

  _receive_events() {
    for (let event_type of this._event_types) {
      console.log(event_type);
      this._receive_event(event_type);
    }
  }
};

module.exports = CoolPal;
