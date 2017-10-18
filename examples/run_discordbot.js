const TodoPlugin = require('../src/plugins/todo.js');
const WeatherPlugin = require('../src/plugins/weather.js');
const DiscordBot = require('../src/discordbot.js');

// TODO: Implement a host variable for todo plugin for local dynamodb. Also
// add optional variables to access key and secret key
let plugins = [
  new TodoPlugin({
    'aws_region': 'us-west-2'
  }),
  new WeatherPlugin
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
