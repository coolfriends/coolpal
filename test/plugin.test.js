import assert from 'assert';
import Plugin from '../lib/plugins/plugin.js';

class PluginMock extends Plugin {
  constructor(pal, config={}) {
    super(pal, config);
    this.command = 'testcommand';
    this.supported_event_types = [];
  }

  handle_message(message, config, err) {
    return true;
  }
}

describe('Plugin', function() {

  let pal = {
    prefix: '!'
  };
  let plugin = new Plugin(pal, {});
  let plugin_mock = new PluginMock(pal);

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

    it('should return false', function() {
      assert(!plugin.handle_message({}, {}));
    });

  });

  describe('#prefixed_command', function() {

    it('should return a given command with prefix', function() {
      let expected = "!testcommand";
      assert.equal(plugin_mock.prefixed_command, expected);
    });

  });

});
