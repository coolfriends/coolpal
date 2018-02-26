const assert = require('assert');
const Plugin = require('../src/plugins/plugin.js');

const HelpPlugin = require('../src/plugins/help/plugin.js');

// Implements the .help() method
class MockPlugin extends Plugin {
  constructor(pal, config={}) {
    super(pal, config);
    this.command = 'mock';
    this.supported_event_types = ['message'];
  }

  get help() {
    return "A help message\n";
  }
}

class NoHelpMockPlugin extends Plugin {
  constructor(pal, config={}) {
    super(pal, config);
    this.command = 'no-help-mock';
    this.supported_event_types = ['message'];
  }
}

describe('HelpPlugin', function() {
  let pal = {
    prefix: '!',
    client: {
      user: {
        username: 'abot'
      }
    }
  };
  let plugin = new HelpPlugin(pal);
  let mock_plugin = new MockPlugin(pal);
  let no_help_mock_plugin = new NoHelpMockPlugin(pal);

  pal.plugins = [
    plugin,
    mock_plugin,
    no_help_mock_plugin
  ];

  describe('#constructor()', function() {
    describe('supported_event_types', function() {
      it('should only support the message event type', function() {
        assert.deepEqual(plugin.supported_event_types, ['message']);
      });
    });
  });
  describe('#handle_message()', function() {
    it('should return false if the first argument is not a match', function() {
      let message_fixture = {
        content: '!nothelp'
      };
      assert(!plugin.handle_message(message_fixture));
    });
    it('should return true if message is from the bot', function() {
      let message_fixture = {
        content: '!help',
        author: {
          username: 'abot'
        }
      };
      assert(plugin.handle_message(message_fixture));
    });
    it('should not reply if message is from the bot', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!help',
        author: {
          username: 'abot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      assert.equal(recorded_message, '');
    });
    it('should return true first arg is missing', function() {
      let message_fixture = {
        content: '!help',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };
      assert(plugin.handle_message(message_fixture));
    });
    it('should send help message in reply if first arg is missing', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!help',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      let expected = '\nRequest help for a plugin prices\n\n' +
                     '!help list\n' +
                     'Lists plugins that you can request help for\n' +
                     '!help help\n' +
                     'Prints this message\n' +
                     '!help <supported_plugin>\n' +
                     'Prints the help for a supported plugin (see !help list)\n';

      plugin.handle_message(message_fixture);
      assert.equal(recorded_message, expected);
    });
    it('should send help message in reply if first arg is help', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!help help',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      let expected = '\nRequest help for a plugin prices\n\n' +
                     '!help list\n' +
                     'Lists plugins that you can request help for\n' +
                     '!help help\n' +
                     'Prints this message\n' +
                     '!help <supported_plugin>\n' +
                     'Prints the help for a supported plugin (see !help list)\n';

      plugin.handle_message(message_fixture);
      assert.equal(recorded_message, expected);
    });
    it('should send help message for valid plugin', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!help mock',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = 'A help message\n';
      assert.equal(recorded_message, expected);
    });
    it('should send help does not exist message for plugin with no help', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!help no-help-mock',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = 'The command no-help-mock does not have a help message.';
      assert.equal(recorded_message, expected);
    });
    it('should list available help commands', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!help list',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = '\nHere are commands with help available.\n' +
                     'Call one with !help <command>\n' +
                     'help\n' +
                     'mock\n';
      assert.equal(recorded_message, expected);
    });
    it('should return bad command message if plugin with command does not exist', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!help this-command-is-not-implemented',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = 'The plugin this-command-is-not-implemented is not a valid command.\n';
      assert.equal(recorded_message, expected);
    });
  });
});
