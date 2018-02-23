class Plugin {
  constructor() {
    this.command = '';
    this.supported_event_types = [];
  }

  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }

  prefixed_command(config) {
    return config.prefix + this.command;
  }

  handle_message(message, config, err) {
    let e = new Error("Plugin(s) not defined");
    throw e;
  }
}

module.exports = Plugin;
