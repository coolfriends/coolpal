const assert = require('assert');
const HelloWorldPlugin = require('../src/plugins/hello_world.js');

describe('HelloWorldPlugin', function() {
  let plugin = new HelloWorldPlugin();
  let bot_user_name = 'abot';
  let config_fixture = {
    prefix: '!',
    client: {
      user: {
        username: bot_user_name
      }
    }
  };

  describe('support_event_types', function() {
    it('should only have message for its supported event types', function() {
      assert.deepEqual(plugin.supported_event_types, ['message']);
    });
  });
  describe('#handle_event()', function() {
    it('should return true if event_type is message and message is not from bot', function() {
      let message_fixture = {
        author: 'notthebotusername',
        content: '!helloworld',
        reply: () => {}
      };
      assert(plugin.handle_event('message', message_fixture, config_fixture));
    });
    it('should return false if event_type is not message', function() {
      assert(!plugin.handle_event('not_a_supported_message', {}, {}));
    });
  });
  describe('#handle_message()', function() {
    it('should return true if the message provided is properly formatted', function() {
      let recorded_message = '';
      let message_fixture = {
        author: 'notthebotusername',
        content: '!helloworld,',
        reply: () => {}
      };
      assert(plugin.handle_message(message_fixture, config_fixture));
    });
    it('should send a greeting to the user', function() {
      let recorded_message = '';
      let message_fixture = {
        author: 'notthebotusername',
        content: '!helloworld,',
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture, config_fixture);
      assert.equal(recorded_message, 'Hello, world!');
    });
    it('should return false if the message command is not called', function() {
      let message_fixture = {
        content: 'notthecommand'
      };
      assert(!plugin.handle_message(message_fixture, config_fixture));
    });
    it('should return true if the message is from the bot', function() {
      let message_fixture = {
        content: '!helloworld',
        author: bot_user_name
      };
      assert(plugin.handle_message(message_fixture, config_fixture));
    });
    it('should not reply to the message if the message is from the bot', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!helloworld',
        author: bot_user_name,
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture, config_fixture);
      assert.equal('', recorded_message);
    });
  });
});
