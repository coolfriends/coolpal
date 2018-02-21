const fs = require('fs');
const assert = require('assert');
const CoolPal = require('../src/coolpal.js');


describe('CoolPal', function() {
  it('can load plugins using an Object', function() {
    let bot = new CoolPal({
      token: 'example-token',
      plugins: [
        {
          name: 'helloworld',
          configuration: {}
        },
        {
          name: 'spam',
          configuration: {}
        }
      ]
    });
    let commands = ['helloworld', 'spam'];
    let found_commands = [];
    for (let plugin of bot._plugins) {
      found_commands.push(plugin.command);
    }
    assert.deepEqual(commands, found_commands);
  });
  it('can load plugins using a JSON object', function() {
    let commands = ['helloworld', 'spam'];
    let found_commands = [];
    fs.readFile('./plugin_configuration.json', (err, data) => {
      if (err) {
        throw err;
      }
      let configuration = JSON.parse(data);
      let bot = new CoolPal(configuration);
      for (let plugin of bot._plugins) {
        found_commands.push(plugin.command);
      }
      assert.deepEqual(commands, found_commands);
    });
  });
});

