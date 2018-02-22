const fs = require('fs');
const CoolPal = require('../src/coolpal.js');

fs.readFile('examples/plugin_configuration.json', (err, data) => {
  if (err) throw err;
  let configuration = JSON.parse(data);
  let token = configuration.token;
  let bot = new CoolPal(configuration);
  bot.start();
});
