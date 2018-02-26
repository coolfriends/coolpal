let name_to_class = {
  'spam': require('./spam/plugin.js'),
  'helloworld': require('./hello_world/plugin.js'),
  'weather': require('./weather/plugin.js'),
  'coinbase': require('./coinbase/plugin.js'),
  'ethereum': require('./ethprice/plugin.js'),
  'feature-request': require('./feature-request/plugin.js'),
  'google-news': require('./google-news/plugin.js')
};

module.exports = {
  name_to_class
};
