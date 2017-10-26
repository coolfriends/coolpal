const SpamPlugin = require('../src/plugins/spam/plugin.js');
const DiscordBot = require('../src/discordbot.js');

let plugins = [
  new SpamPlugin,
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
