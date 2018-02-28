const assert = require('assert');
const FeatureRequestPlugin = require('../src/plugins/feature-request/plugin.js');

describe('FeatureRequestPlugin', function() {
  let bot_user_name = 'abot';
  let pal = {
    prefix: '!',
    client: {
      user: {
        username: bot_user_name
      }
    }
  };
  let plugin = new FeatureRequestPlugin(pal);

  describe('#constructor()', function() {
    describe('support_event_types', function() {
      it('should only have message for its supported event types', function() {
        assert.deepEqual(plugin.supported_event_types, ['message']);
      });
    });
  });

  describe('#handle_message()', function() {
    it('should return false if the message command is not correct', function() {
      let recorded_message = '';
      let message_fixture = {
        author: {
          username: 'notthebotusername'
        },
        content: '!not-feature-request',
        reply: () => {}
      };
      assert(!plugin.handle_message(message_fixture));
    });
    it('should return true if the message is sent from the bot and the command matches', function() {
      let recorded_message = '';
      let message_fixture = {
        author: {
          username: 'abot'
        },
        content: '!feature-request',
        reply: () => {}
      };
      assert(plugin.handle_message(message_fixture));
    });
    it('should not send a message if the message is sent from the bot', function() {
      let recorded_message = '';
      let message_fixture = {
        author: {
          username: 'abot'
        },
        content: '!feature-request',
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      assert(recorded_message == '');
    });
    it('should add a feature request', function() {
      let message_fixture = {
        author: {
          username: 'notabot'
        },
        content: '!feature-request new this is my interesting request',
        reply: () => {}
      };
      plugin.handle_message(message_fixture);
      let expected = ['this is my interesting request'];
      let actual = plugin.requests_for_user('notabot');
      assert.deepEqual(actual, expected);
    });
    it('should provide confirmation that a request has been added', function() {
      let recorded_message = '';
      let message_fixture = {
        author: {
          username: 'notabot'
        },
        content: '!feature-request new this is my interesting request',
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = 'Added the following to your feature requests:\n' +
                     'this is my interesting request';
      assert(recorded_message === expected);
    });
    it('should list feature requests if a user has feature requests', function() {
      let recorded_message = '';
      let message_fixture = {
        author: {
          username: 'notabot'
        },
        content: '!feature-request list',
        reply: (message) => {
          recorded_message = message;
        }
      };

      // Seed feature requests with data
      plugin._feature_requests['notabot'] = [
        'this is an interesting request',
        'this is another interesting request'
      ];

      plugin.handle_message(message_fixture);
      let expected = 'Here are your feature requests:\n' +
                     'this is an interesting request\n' +
                     'this is another interesting request\n';

      assert.equal(recorded_message, expected);
    });
    it('should print a help message for unhandled messages', function() {
      let recorded_message = '';
      let message_fixture = {
        author: {
          username: 'notabot'
        },
        content: '!feature-request not a command',
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = 'This plugin will allow you to make new plugin requests\n\n' +
            '!feature-request help\n' +
            'Displays this message again.\n\n' +
            '!feature-request new this is where you type a request\n' +
            'Adds a new request\n\n' +
            '!feature-request list\n' +
            'List the requests you have made\n';

      assert.equal(recorded_message, expected);
    });
  });
});
