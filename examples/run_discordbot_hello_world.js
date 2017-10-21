const HelloWorldPlugin = require('../src/plugins/hello_world.js');
const DiscordBot = require('../src/discordbot.js');

// TODO: Implement a host variable for todo plugin for local dynamodb. Also
// add optional variables to access key and secret key
let plugins = [
  new HelloWorldPlugin
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
