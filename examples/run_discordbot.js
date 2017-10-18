const TodoPlugin = require('../src/plugins/todo.js');
const WeatherPlugin = require('../src/plugins/weather.js');
const DiscordBot = require('../src/discordbot.js');

let plugins = [
  new TodoPlugin({
    'aws_region': 'us-west-2'
  }),
  new WeatherPlugin
];

let bot = new DiscordBot(plugins);
bot.start();
