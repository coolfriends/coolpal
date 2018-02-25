const fs = require('fs');
const CoolPal = require('../src/coolpal.js');

fs.readFile('examples/plugin_configuration.json', (err, data) => {
  if (err) {
    throw err;
  }

  let configuration = JSON.parse(data);

  let pal = new CoolPal(configuration);
  pal.start();
});
