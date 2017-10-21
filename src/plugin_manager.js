class PluginManager {
  constructor(plugins) {
    this._plugins = plugins;
    this.event_types = this.unique_event_types();
  }

  get plugins() {
    return this._plugins;
  }

  set plugins(new_plugins) {
    this._plugins = new_plugins;
    this.event_types = this.unique_event_types();
  }

  // TODO: Might need to use async
  unique_event_types() {
    let unique_event_types = [];
    for (let plugin of this.plugins) {
      for (let event_type of plugin.supported_event_types) {
        if (!unique_event_types.includes(event_type)) {
          unique_event_types.push(event_type);
        }
      }
    }
    return unique_event_types;
  }

  register_plugin(plugin) {
    this._plugins.push(plugin);
    this.event_types = this.unique_event_types();
  }

  handle_event(event_type, event, client) {
    for (let plugin of this.plugins) {
      plugin.handle_event(event_type, event, client);
    }
  }
}

module.exports = PluginManager;
