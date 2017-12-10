let name_to_class = {
  spam: require('./spam/plugin.js'),
  helloworld: require('./hello_world/plugin.js'),
  weather: require('./weather/plugin.js'),
  bitcoin: require('./btcprice/plugin.js'),
  ethereum: require('./ethprice/plugin.js')
};

module.exports = {
  name_to_class
};
