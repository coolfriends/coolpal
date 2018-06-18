const assert = require('assert');
const axios = require('axios');

const WeatherPlugin = require('../src/plugins/weather/plugin.js');

describe('WeatherPlugin', function() {
  // Override opeanweather api key
  process.env.OPENWEATHER_API_KEY = 'also-not-a-real-api-key';

  let pal = {
    prefix: '!',
    client: {
      user: {
        username: 'abot'
      }
    }
  };
  let plugin = new WeatherPlugin(pal, {
    openweather_api_key: 'not-a-real-api-key'
  });

  // Returns a function that acts like axios and can be called.
  // The response is the response you'd like to be resolved.
  // If error is provided, the function will reject the error.
  let build_axios_mock = (response, error) => {
    return () => {
      return new Promise((resolve, reject) => {
        if (error) {
          reject(error);
        }
        resolve(response);
      });
    };
  };

  describe('#constructor()', function() {
    describe('supported_event_types', function() {
      it('should only support the message event type', function() {
        assert.deepEqual(plugin.supported_event_types, ['message']);
      });
    });
  });
  describe('#handle_event()', function() {
    it('should return true if message if well formatted', function() {
      let message_fixture = {
        content: '!weather denton',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };
      assert(plugin.handle_event('message', message_fixture));
    });
    it('should return false if event type is not message', function() {
      assert(!plugin.handle_event('not_a_message', {}, {}));
    });
  });
  describe('#handle_message()', function() {
    it('should return false if the first argument is not a match', function() {
      let message_fixture = {
        content: '!notweather'
      };
      assert(!plugin.handle_message(message_fixture, {}));
    });
    it('should return true if message is from the bot', function() {
      let message_fixture = {
        content: '!weather',
        author: {
          username: 'abot'
        }
      };
      assert(plugin.handle_message(message_fixture));
    });
    it('should not reply if message is from the bot', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!weather',
        author: {
          username: 'abot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      assert.equal(recorded_message, '');
    });
    it('should return true if city is not supported', function() {
      let message_fixture = {
        content: '!weather not_a_supported_city',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };

      assert(plugin.handle_message(message_fixture));
    });
    it('should return true if message is correct', function() {
      let message_fixture = {
        content: '!weather denton',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };

      assert(plugin.handle_message(message_fixture));
    });

    it('should reply with weather data when message is correct', function() {
      let plugin = new WeatherPlugin(pal, {
        weather_client: {
          find: (obj, cb) => {
            cb(null, [
              {
                location: {
                  name: 'blah'
                },
                current: {
                  date: 'blah',
                  observationtime: 'blah',
                  temperature: 'blah',
                  feelslike: 'blah',
                  skytext: 'blah',
                  humidity: 'blah',
                  winddisplay: 'blah'
                }
              }
            ]);
          }
        }
      });
      // Make sure that the string passed to message.reply is captured.
      let recorded_message = '';
      let message_fixture = {
        content: '!weather denton',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      let expected = 'Current forecast for: blah\n' +
            'Date: blah\n' +
            'Observation Time: blah\n' +
            'Temperature (in F): blah\n' +
            'Feels like (in F): blah\n' +
            'Conditions: blah\n' +
            'Humidity: blah\n' +
            'Wind: blah\n';

      plugin.handle_message(message_fixture);

      // wait 1 seconds to make sure the message gets recorded
      setTimeout(() => {
        assert.equal(recorded_message, expected);
      }, 1);
    });
  });
});
