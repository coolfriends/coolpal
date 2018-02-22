const axios = require('axios');
const utils = require('../utils.js');

class WeatherPlugin {
  constructor(config = {}) {
    /**
     * The name for this command
     */
    this.command = 'weather';

    /**
     * The event types this plugin supports
     * @type {string[]}
     */
    this.supported_event_types = ['message'];

    /**
     * The api key used to access the OpenWeather API
     * @see http://openweathermap.org/appid
     * @type {string}
     */
    this.openweather_api_key = config.openweather_api_key || process.env.OPENWEATHER_API_KEY;

    /**
     * The version number for the OpenWeather API. There does not seem to be a
     * list of available version numbers
     * @see http://openweathermap.org/appid
     * @type {string}
     */
    this.api_version = config.api_version || '2.5';

    /**
     * The units for fields on the OpenWeather API.
     * @type {string}
     */
    this.units = config.units || 'imperial';

    /**
     * The api url for OpenWeather API
     * @type {string}
     */
    this.base_url = 'http://api.openweathermap.org';

    /**
     * A configured axios client for making HTTP requests. This is also used
     * in tests to mock axios HTTP requests.
     * @type {axios}
     */
    this.axios = config.axios || axios.create();
  }

  weather_url(city) {
    return this.base_url + '/data/2.5/weather?q=' + city + '&units=' + this.units + '&APPID=' + this.openweather_api_key;
  }

  call_weather_api(message, url, config = {}) {
    this.axios({
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
      return true;
    }).catch(error => {
      // TODO: Handle this error
      console.log();
      return true;
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
