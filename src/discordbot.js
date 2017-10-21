const Discord = require('discord.js');
const PluginManager = require('./plugin_manager.js');

// TODO:
// Create parent plugin class
// Add more locations for weather
// Add more functionality for todo list
class DiscordBot {
  constructor(token, plugins, options={}) {
    this.client = new Discord.Client();
    this.discord_token = token;
    this.plugin_manager = new PluginManager(plugins);
    this.prefix = options.prefix || '!';
  }

  start() {
    this.login();
    this.ready();
    this.receive_events();
  }

  login() {
    this.client.login(this.discord_token);
  }

  // TODO: Allow user to set their ready message.
  ready() {
    this.client.on('ready', () => {
      console.log('Just saying im ready');
    });
  }

  get event_types() {
    return this.plugin_manager.event_types;
  }

  register_plugin(plugin) {
    this.plugin_manager.register_plugin(plugin);
  }

  register_plugins(plugins) {
    for (let plugin of plugins) {
      this.register_plugin(plugin);
    }
  }

  // The minimum config that must be passed to plugin manager for plugins
  // to work is a Discord client. Some plugins require a prefix, so we will
  // pass that along too.
  receive_event(event_type) {
    this.client.on(event_type, event => {
      this.plugin_manager.handle_event(event_type, event, {
        client: this.client,
        prefix: this.prefix
      });
    });
  }

  receive_events() {
    for (let event_type of this.event_types) {
      console.log(event_type);
      this.receive_event(event_type);
    }
  }
};

module.exports = DiscordBot;
