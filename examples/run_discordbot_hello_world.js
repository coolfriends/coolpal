const HelloWorldPlugin = require('../src/plugins/hello_world/plugin.js');
const DiscordBot = require('../src/discordbot.js');

let plugins = [
  new HelloWorldPlugin
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
