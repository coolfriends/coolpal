let name_to_class = {
  spam: require('./spam/plugin.js'),
  helloworld: require('./hello_world/plugin.js'),
  weather: require('./weather/plugin.js')
};

module.exports = {
  name_to_class
}
