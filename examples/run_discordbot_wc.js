const WCPlugin = require('../src/plugins/wc.js');
const DiscordBot = require('../src/discordbot.js');

let plugins = [
  new WCPlugin({
    base_url: process.env.WC_URL,
    wc_secret_key: process.env.WC_SECRET_KEY
  })
];

let token = process.env.DISCORD_TOKEN;
let bot = new DiscordBot(token, plugins);
bot.start();
