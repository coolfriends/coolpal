import fs from 'fs';
import CoolPal from '../lib/index';

fs.readFile('examples/plugin_configuration.json', (err, data) => {
  if (err) {
    throw err;
  }
  let configuration = JSON.parse(data);
  let pal = new CoolPal(configuration);
  pal.start();
});
