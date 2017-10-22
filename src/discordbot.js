const Discord = require('discord.js');
const PluginManager = require('./plugin_manager.js');

// TODO:
// Create parent plugin class
// Add more locations for weather
// Add more functionality for todo list
class DiscordBot {
  constructor(token, plugins, options={}) {
    this.client = new Discord.Client();
    this.discord_token = token || options.token;
    this._plugins = plugins || options.plugins;
    this._event_types = [];
    this.prefix = options.prefix || '!';

    this._generate_event_types();
  }

  start() {
    this._login();
    this._ready();
    this._receive_events();
  }

  register_plugin(plugin) {
    this._plugins.push(plugin);
    this._generate_event_types();
  }

  register_plugins(plugins) {
    for (let plugin of plugins) {
      this.register_plugin(plugin);
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

  _generate_event_types(plugins) {
    let unique_event_types = [];
    for (let plugin of plugins) {
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
      for (let plugin of this.plugins) {
        let handled_event = plugin.handle_event(event_type, event, {
          client: this.client,
          prefix: this.prefix
        });
      }
    });
  }

  _receive_events() {
    for (let event_type of this.event_types) {
      console.log(event_type);
      this._receive_event(event_type);
    }
  }
};

module.exports = DiscordBot;
