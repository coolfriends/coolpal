const http = require('http');

class WeatherPlugin {
  constructor() {
    this.dentonWeatherOptions = {
      host: 'api.openweathermap.org',
      path: '/data/2.5/weather?id=4685907&units=Imperial&APPID=' + process.env.OPENWEATHER_API_KEY
    };
  }

  handle_message(message) {
    if (message != 'dentonweather') {
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
      http.request(this.dentonWeatherOptions, callback).end();
    }
  }
};


module.exports = WeatherPlugin;
