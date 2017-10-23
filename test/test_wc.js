const assert = require('assert');
const WCPlugin = require('../src/plugins/wc/plugin.js');

describe('WCPlugin', function() {
  // TODO: Add test to make sure that axios logs when the url it was given
  // doesnt work (bad env setup, etc) but don't send that to discord!
  let base_url = 'http://this_is_the_example.com/';
  let secret_key = 'this-is-a-very-secret-key';
  let plugin = new WCPlugin({
    base_url: base_url,
    wc_secret_key: secret_key
  });
  let bot_user_name = 'abot';
  let config_fixture = {
    prefix: '!',
    client: {
      user: {
        username: bot_user_name
      }
    }
  };

  describe('#constructor()', function() {
    describe('support_event_types', function() {
      it('should only support the message event type', function() {
        assert.deepEqual(plugin.supported_event_types, ['message']);
      });
    });
    describe('base_url', function() {
      it('should use a base url provided config first', function() {
        // Temporarily set WC_URL
        process.env.WC_URL = 'this-is-a-test-url';
        let plugin = new WCPlugin({
          base_url: 'my-fancy-url.com/'
        });
        assert.equal(plugin.base_url, 'my-fancy-url.com/');
      });
      it ('should use a base url from the environment if one is not in config', function() {
        process.env.WC_URL = 'this-is-a-test-url';
        let plugin = new WCPlugin;
        assert.equal(plugin.base_url, 'this-is-a-test-url');
      });
      describe('wc_secret_key', function() {
        it('should use a secret keyg provided config first', function() {
          // Temporarily set WC_URL
          process.env.WC_SECRET_KEY = 'this-is-a-secret-key';
          let plugin = new WCPlugin({
            wc_secret_key: 'this-is-a-very-secret-key'
          });
          assert.equal(plugin.wc_secret_key, 'this-is-a-very-secret-key');
        });
        it ('should use a base url from the environment if one is not in config', function() {
          process.env.WC_URL = 'this-is-a-very-secret-key';
          let plugin = new WCPlugin;
          assert.equal(plugin.base_url, 'this-is-a-very-secret-key');
        });
      });
    });
  });
  describe('#handle_event()', function() {
    it('should return true if the message is well formatted', function() {
      let message_fixture = {
        content: '!wc This should be about as valid as it gets.',
        author: {
          username: 'not-from-a-bot'
        }
      };
      assert(plugin.handle_event('message', message_fixture, config_fixture));
    });
    it('should return false if the event type is not message', function() {
      assert(!plugin.handle_event('unsupported_event_type', {}, config_fixture));
    });
  });
  describe('#handle_message()', function() {
    it('should return true if the message is from bot', function() {
      let message_fixture = {
        content: '!wc This should be about as valid as it gets.',
        author: {
          username: 'abot'
        }
      };
      assert(plugin.handle_event('message', message_fixture, config_fixture));
    });
    it('should return false the message is not intended for wc', function() {
      let message_fixture = {
        content: '!notwc'
      };
      assert(!plugin.handle_event('message', message_fixture, config_fixture));
    });
    it('should true if the message for wc and not from bot', function() {
      let message_fixture = {
        content: '!wc This one is well-formatted.',
        author: {
          username: 'notabotuser'
        }
      };
      assert(plugin.handle_event('message', message_fixture, config_fixture));
    });
    it('should not reply to the message if the message is from bot', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!wc This one is well-formatted.',
        author: {
          username: 'abot'
        },
        reply: message => {
          recorded_message = message;
        }
      };
      plugin.handle_event('message', message_fixture, config_fixture);
      assert.equal(recorded_message, '');
    });
    // TODO: Finish implementing tests. Need to figure out how to mock axios
    // calls. Implement test to make sure message is properly formatted, and
    // that axios is called with wc_secret_key and text
  });
});
