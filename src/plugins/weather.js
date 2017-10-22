const axios = require('axios');
const utils = require('./utils.js');

class WeatherPlugin {
  // User can provide an api key in config, or use the default env variable
  // OPENWEATHER_API_KEY
  constructor(config={}) {
    this.supported_event_types = ['message'];
    this.openweather_api_key = config.openweather_api_key || process.env.OPENWEATHER_API_KEY;
    this.api_version = config.api_version || '2.5';
    this.units = config.units || 'Imperial';
    this.base_url = 'http://api.openweathermap.org';
    this.city_ids = {
      denton: '4685907',
      seattle: '5809844'
    };
  }

  weather_url(city) {
    if (this.city_ids[city]) {
      return this.base_url + '/data/2.5/weather?id=' +
             this.city_ids[city] + '&units=' + this.units +
             '&APPID=' + this.openweather_api_key;
    }
    return '';
  }

  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }

  handle_message(message, config) {
    let command_args = utils.split_message(message);
    if (command_args[0] != config.prefix + 'weather') {
      return false;
    }

    // End run if the bot is the creator of the message
    if (message.author.username == config.client.user.username) {
      return true;
    }

    let city = command_args[1];
    if (!city) {
      let choice_string = this.city_choice_string(config);
      message.reply(
        'No city provided. Try one of the following:\n' +
        choice_string
      );
      return true;
    }

    let url = this.weather_url(city);
    if (!url) {
      let choice_string = this.city_choice_string(config);
      message.reply(
        'City: ' + utils.capitalize(city) +
        ' is not supported at this time. Try:\n' +
        choice_string
      );
      return true;
    }
    this.call_weather_api(message, url);
    return true;
  }

  call_weather_api(message, url, config={}) {
    axios({
      method: 'get',
      url: url
    }).then(response => {
      if (response.data.cod == 200) {
        message.reply("\nTemp: " +
                      response.data.main.temp +
                      " **|** Weather: " +
                      response.data.weather[0].description +
                      " **|** Wind: " +
                      response.data.wind.speed);
      }
    }).catch(error => {
      console.log("Error with weather api");
    });
  }

  city_choice_string(config) {
    let city_choice_string = '';
    for (let key of Object.keys(this.city_ids)) {
      city_choice_string += config.prefix + 'weather ' + key + '\n';
    }
    return city_choice_string;
  }
};


module.exports = WeatherPlugin;
