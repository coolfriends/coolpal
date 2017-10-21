const http = require('http');

class WeatherPlugin {
  // User can provide an api key in config, or use the default env variable
  // OPENWEATHER_API_KEY
  constructor(config={}) {
    this.supported_event_types = ['message'];
    this.openweather_api_key = config.openweather_api_key || process.env.OPENWEATHER_API_KEY;
    this.denton_weather_options = {
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?id=4685907&units=Imperial&APPID=' +
            this.openweather_api_key
    };
    this.seattle_weather_options = {
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?id=5809844&units=Imperial&APPID=' +
            this.openweather_api_key
    };
  }

  handle_event(event_type, event, config) {
    if (event_type == 'message') {
      return this.handle_message(event, config);
    }
    return false;
  }

  handle_message(message, config) {
    let weather_options = {};
    if (message.content.startsWith(config.prefix + 'dentonweather')) {
      weather_options = this.denton_weather_options;
    } else if (message.content.startsWith(config.prefix + 'seattleweather')) {
      weather_options = this.seattle_weather_options;
    } else {
      // Message not intended for this plugin
      return false;
    }
    let weather_callback = (response) => {
      let str = '';

      response.on('data', (chunk) => {
        str += chunk;
      });

      response.on('end', () => {
        let responseJSON = JSON.parse(str);
        if (responseJSON.cod == 200) {
          message.reply("\nTemp: " +
                        responseJSON.main.temp +
                        " **|** Weather: " +
                        responseJSON.weather[0].description +
                        " **|** Wind: " +
                        responseJSON.wind.speed);
        } else if (responseJSON.cod == 401) {
        }
      });
    };

    http.request(weather_options, weather_callback).end();
    return true;
  }
};


module.exports = WeatherPlugin;
