import Plugin from "../lib/plugins/plugin";
import HelpPlugin from "../lib/plugins/help/plugin";

// Implements the .help() method
class MockPlugin extends Plugin {
  constructor(pal, config = {}) {
    super(pal, config);
    this.command = "mock";
    this.supported_event_types = ["message"];
  }

  get help() {
    return "A help message\n";
  }
}

class NoHelpMockPlugin extends Plugin {
  constructor(pal, config = {}) {
    super(pal, config);
    this.command = "no-help-mock";
    this.supported_event_types = ["message"];
  }
}

describe("HelpPlugin", function() {
  let pal = {
    prefix: "!",
    client: {
      user: {
        username: "abot"
      }
    }
  };
  let plugin = new HelpPlugin(pal);
  let mock_plugin = new MockPlugin(pal);
  let no_help_mock_plugin = new NoHelpMockPlugin(pal);

  pal.plugins = [plugin, mock_plugin, no_help_mock_plugin];

  describe("#handle_message()", function() {
    it("should return false if the first argument is not a match", function() {
      let message_fixture = {
        content: "!nothelp"
      };
      expect(plugin.handle_message(message_fixture)).toBeFalsy();
    });
    it("should return true if message is from the bot", function() {
      let message_fixture = {
        content: "!help",
        author: {
          username: "abot"
        }
      };
      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it("should not reply if message is from the bot", function() {
      let recorded_message = "";
      let message_fixture = {
        content: "!help",
        author: {
          username: "abot"
        },
        reply: message => {
          recorded_message = message;
        }
      };
      expect(recorded_message).toEqual("");
    });
    it("should return true if first arg is missing", function() {
      let message_fixture = {
        content: "!help",
        author: {
          username: "notabot"
        },
        channel: {
          send: () => {}
        }
      };
      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it("should send help message in reply if first arg is missing", function() {
      let recorded_message = "";
      let message_fixture = {
        content: "!help",
        author: {
          username: "notabot"
        },
        channel: {
          send: message => {
            recorded_message = message;
          }
        }
      };
      let expected =
        "\n\nRequest help for a plugin:\n\n" +
        "!help list\n" +
        "Lists plugins that you can request help for\n\n" +
        "!help help\n" +
        "Prints this message\n\n" +
        "!help <supported_plugin>\n" +
        "Prints the help for a supported plugin (see !help list)\n\n";

      plugin.handle_message(message_fixture);
      expect(recorded_message).toContain(expected);
    });
    it("should send help message in reply if first arg is help", function() {
      let recorded_message = "";
      let message_fixture = {
        content: "!help help",
        author: {
          username: "notabot"
        },
        channel: {
          send: message => {
            recorded_message = message;
          }
        }
      };
      let expected =
        "\n\nRequest help for a plugin:\n\n" +
        "!help list\n" +
        "Lists plugins that you can request help for\n\n" +
        "!help help\n" +
        "Prints this message\n\n" +
        "!help <supported_plugin>\n" +
        "Prints the help for a supported plugin (see !help list)\n\n";

      plugin.handle_message(message_fixture);
      expect(recorded_message).toContain(expected);
    });
    it("should send help message for valid plugin", function() {
      let recorded_message = "";
      let message_fixture = {
        content: "!help mock",
        author: {
          username: "notabot"
        },
        channel: {
          send: message => {
            recorded_message = message;
          }
        }
      };
      plugin.handle_message(message_fixture);
      let expected = "A help message\n";
      expect(recorded_message).toContain(expected);
    });
    it("should list available help commands", function() {
      let recorded_message = "";
      let message_fixture = {
        content: "!help list",
        author: {
          username: "notabot"
        },
        channel: {
          send: message => {
            recorded_message = message;
          }
        }
      };
      plugin.handle_message(message_fixture);
      let expected =
        "\nHere are commands with help available.\n" +
        "Call one with !help <command>\n" +
        "help\n" +
        "mock\n";
      expect(recorded_message).toContain(expected);
    });
    it("should return command DNE message if no matching plugin", function() {
      let recorded_message = "";
      let message_fixture = {
        content: "!help no-help-mock",
        author: {
          username: "notabot"
        },
        reply: message => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = "no-help-mock does not have a help message.\n";
      expect(recorded_message).toEqual(expected);
    });
    it("should return bad command message if plugin with command does not exist", function() {
      let recorded_message = "";
      let message_fixture = {
        content: "!help this-command-is-not-implemented",
        author: {
          username: "notabot"
        },
        reply: message => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected =
        "this-command-is-not-implemented is not a valid command.\n";
      expect(recorded_message).toEqual(expected);
    });
  });
});
