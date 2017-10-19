const PollPlugin = require('../src/plugins/poll.js');
const DiscordBot = require('../src/discordbot.js');

// TODO: Implement a host variable for todo plugin for local dynamodb. Also
// add optional variables to access key and secret key
let plugins = [
  new PollPlugin
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
