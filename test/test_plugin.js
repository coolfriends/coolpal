const assert = require('assert');
const Plugin = require('../src/plugins/plugin.js');

class PluginMock extends Plugin {
  constructor() {
    super();
    this.command = 'testcommand';
    this.supported_event_types = [];
  }

  handle_message(message, config, err) {
    return true;
  }
}

describe('Plugin', function() {

  let plugin = new Plugin();
  let plugin_mock = new PluginMock();
  let config_fixture = {
    prefix: '!'
  };

  describe('#constructor()', function() {
    describe('support_event_types', function() {

      it('should have an empty array as supported event types', function() {
        assert.deepEqual(plugin.supported_event_types, []);
      });

    });
  });

  describe('#handle_event()', function() {

    it('should return true if plugin successfully extends Plugin', function() {
      assert(plugin_mock.handle_event('message', {}, {}));
    });

    it('should return false if event_type is not message', function() {
      assert(!plugin.handle_event('not_a_supported_message', {}, {}));
    });

  });

  describe('#handle_message()', function() {

    it('should throw error indicating plugins undefined', function() {
      assert.throws(plugin.handle_message, Error, "Error thrown");
    });

  });

  describe('#prefixed_command', function() {

    it('should return a given command with prefix', function() {
      let expected = "!testcommand";
      assert.equal(plugin_mock.prefixed_command(config_fixture), expected);
    });

  });

});