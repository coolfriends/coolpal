const HelloWorldPlugin = require('../src/plugins/hello_world.js');
const WeatherPlugin = require('../src/plugins/weather.js');
const DiscordBot = require('../src/discordbot.js');

let plugins = [
  new HelloWorldPlugin,
  // User can now give Weather an api 
  new WeatherPlugin({
    openweather_api_key: process.env.OPENWEATHER_API_KEY
  })
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
