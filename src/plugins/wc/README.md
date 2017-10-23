# discordbot-wc

## Installation
First, get a local copy of wc running on your local machine by following
the instructions here:
https://github.com/coolfriends/wc#setup

## Run locally
Set the WC_URL and WC_SECRET_KEY environment variables
```bash
export WC_URL=http://localhost:5000/
export WC_SECRET_KEY=a_very_secret_key
```
Instructions for setting up environment for are also listed in the `wc` project
README.md.

Move to the wc directory and start the application
```bash
serverless wsgi serve
```


Create an example in the `examples` folder like so:
```js
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
```

## Run using remote WC deployment
All you need to do is make sure your environment variables are set correctly.
Your `WC_URL` will be the url to your deployment server, and the secret key
will be the one you had exported when you deployed with serverless.






