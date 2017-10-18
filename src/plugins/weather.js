const http = require('http');

class WeatherPlugin {
  constructor() {
    this.dentonWeatherOptions = {
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?id=4685907&units=Imperial&APPID=' + process.env.OPENWEATHER_API_KEY
    };
    this.seattleWeatherOptions = {
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?id=5809844&units=Imperial&APPID=' + process.env.OPENWEATHER_API_KEY
    };
  }

  handle_message(message) {
    if (message != 'dentonweather' || message != 'seattleweather') {
      console.log('message not intended for weather');
    } else {
      let callback = (response) => {
        let str = '';

        response.on('data', (chunk) => {
          str += chunk;
        });

        response.on('end', () => {
          let responseJSON = JSON.parse(str);
          message.reply("\nTemp: " + responseJSON.main.temp + " **|** Weather: " + responseJSON.weather[0].description + " **|** Wind: " + responseJSON.wind.speed);
        });
      };

      if (message == 'dentonweather') {
        http.request(this.dentonWeatherOptions, callback).end();
      } else if (message == 'seattleweather') {
        http.request(this.seattleWeatherOptions, callback).end();
      }
    }
  }
};


module.exports = WeatherPlugin;
