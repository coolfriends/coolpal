import weather from 'weather-js';
import utils from '../utils.js';
import Plugin from '../plugin.js';

class WeatherPlugin extends Plugin {
  constructor(pal, config = {}) {
    super(pal, config);

    /**
     * The name for this command
     */
    this.command = 'weather';

    /**
     * The weather API client.
     *
     * This is an instance variable so a mock can easily be injected for testing.
     **/
    this.weather_client = config.weather_client || weather;

    /**
     * The event types this plugin supports
     * @type {string[]}
     */
    this.supported_event_types = ['message'];
  }

  /**
   * @returns {string} A help message
   */
  get help() {
    return '\nCheck the current weather\n\n' +
      this.prefixed_command + ' help\n' +
      'Displays this message again.\n' +
      this.prefixed_command + ' Denton\n' +
      'Replies with the weather conditions for Denton\n' +
      this.prefixed_command + ' Denton, TX\n' +
      'Replies with the weather conditions for Denton, TX\n' +
      this.prefixed_command + ' 98121\n' +
      'Replies with the weather conditions for the Zipcode 98121\n';
  }

  async handle_message(message, config) {
    let command_args = utils.split_message(message);
    if (command_args[0] != this.prefixed_command) {
      return false;
    }
    // End run if the bot is the creator of the message
    if (message.author.username == this.pal.client.user.username) {
      return true;
    }
    let city = command_args[1];
    if (command_args[2]) {
      city = city + command_args[2];
    }

    let weather_result = await this.call_weather_js(city);
    message.reply(this.build_message(weather_result));

    return true;
  }

  call_weather_js(city) {
    return new Promise((resolve, reject) => {
      this.weather_client.find({
        search: city,
        degreeType: 'F'
      }, function(err, result) {
        if (err) reject(err);
        resolve(result);
      });
    });
  }

  build_message(result) {
    return ("Current forecast for: " + result[0].location.name + "\n" +
            "Date: " + result[0].current.date + "\n" +
            "Observation Time: " + result[0].current.observationtime + "\n" +
            "Temperature (in F): " + result[0].current.temperature + "\n" +
            "Feels like (in F): " + result[0].current.feelslike + "\n" +
            "Conditions: " + result[0].current.skytext + "\n" +
            "Humidity: " + result[0].current.humidity + "\n" +
            "Wind: " + result[0].current.winddisplay + "\n"
           );
  }
};

module.exports = WeatherPlugin;
