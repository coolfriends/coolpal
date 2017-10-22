const assert = require('assert');
// To mock axios requests
const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

const WeatherPlugin = require('../src/plugins/weather.js');

describe('WeatherPlugin', function() {
  let plugin = new WeatherPlugin({
    openweather_api_key: 'not-a-real-api-key'
  });
  let config_fixture = {
    prefix: '!',
    client: {
      user: {
        username: 'abot'
      }
    }
  };
  // Temporarily override api key
  process.env.OPENWEATHER_API_KEY = 'also-not-a-real-api-key';

  describe('#constructor()', function() {
    describe('supported_event_types', function() {
      it('should only support the message event type', function() {
        assert.deepEqual(plugin.supported_event_types, ['message']);
      });
    });
    describe('openweather_api_key', function() {
      it('should use the config variable to pass in openweather api key', function() {
        assert.equal(plugin.openweather_api_key, 'not-a-real-api-key');
      });
      it('should use the env variable OPENWEATHER_API_KEY if none is provided', function() {
        let plugin = new WeatherPlugin;
        assert.equal(plugin.openweather_api_key, 'also-not-a-real-api-key');
      });
    });
    describe('base_url', function() {
      it('should be correct', function() {
        assert.equal(plugin.base_url, 'http://api.openweathermap.org');
      });
    });
    describe('units', function() {
      it('should be able to provide a unit type', function() {
        let plugin = new WeatherPlugin({
          units: 'Metric'
        });
        assert(plugin.units, 'Metric');
      });
    });
    describe('city_ids', function() {
      it('should have an id for denton', function() {
        assert(plugin.city_ids.denton);
      });
      it('should have an id for seattle', function() {
        assert(plugin.city_ids.seattle);
      });
    });
  });
  describe('#weather_url()', function() {
    it('should return a well formatted url if the city exists', function() {
      let plugin = new WeatherPlugin({
        openweather_api_key: 'not-a-real-api-key'
      });
      let example_city_id = '31432141324';
      plugin.city_ids = {
        example_city: example_city_id
      };

      let expected = 'http://api.openweathermap.org' +
                     '/data/2.5/weather?id=' +
                     example_city_id +
                     '&units=Imperial&APPID=' +
                     'not-a-real-api-key';
      assert.equal(expected, plugin.weather_url('example_city'));
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
      assert(plugin.handle_event('message', message_fixture, config_fixture));
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
      assert(plugin.handle_message(message_fixture, config_fixture));
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
    it('should return true if a city is not provided', function() {
      let message_fixture = {
        content: '!weather',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };
      assert(plugin.handle_message(message_fixture, config_fixture));
    });
    it('should reply with informative message if no city is provided', function() {
      let plugin = new WeatherPlugin;
      plugin.city_ids = {
        example_city: 'some_fake_id'
      };

      let recorded_message = '';
      let message_fixture = {
        content: '!weather',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      let expected = 'No city provided. Try one of the following:\n' +
                     '!weather example_city\n';

      plugin.handle_message(message_fixture, config_fixture);
      assert.equal(recorded_message, expected);
    });
    it('should return true if city is not supported', function() {
      let message_fixture = {
        content: '!weather not_a_supported_city',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };

      assert(plugin.handle_message(message_fixture, config_fixture));
    });
    it('should reply with an informative message when unsupported city provided', function() {
      let plugin = new WeatherPlugin;
      plugin.city_ids = {
        example_city: 'some_fake_id'
      };

      let recorded_message = '';
      let message_fixture = {
        content: '!weather this_city_is_not_supported',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      let expected = 'City: This_city_is_not_supported is not supported at this time. Try:\n' +
                     '!weather example_city\n';

      plugin.handle_message(message_fixture, config_fixture);
      assert.equal(recorded_message, expected);
    });
    it('should return true if message is correct', function() {
      let message_fixture = {
        content: '!weather denton',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };

      assert(plugin.handle_message(message_fixture, config_fixture));
    });
    // TODO: Finish implementing this test
    it('should reply with weather data when message is correct', function() {
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
    });
  });
});
