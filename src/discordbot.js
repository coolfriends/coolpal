const Discord = require('discord.js');

// TODO:
// Create parent plugin class
// Add more locations for weather
// Add more functionality for todo list
class DiscordBot {
  constructor(token, plugins) {
    this.client = new Discord.Client();
    this.discord_token = token;
    this.plugins = plugins;
  }

  start() {
    this.login();
    this.ready();
    this.receive_message();
  }

  login() {
    this.client.login(this.discord_token);
  }

  ready() {
    this.client.on('ready', () => {
      console.log('I am ready!');
    });
  }

  receive_message() {
    this.client.on('message', message => {
      let count = 0;

      if (message.author.username != 'discordbot') {
        for (let plugin of this.plugins) {
          count++;
          console.log(count);
          if (plugin.handle_message(message) == true) {
            break;
          }
        }
      }
    });
  }
};

module.exports = DiscordBot;
