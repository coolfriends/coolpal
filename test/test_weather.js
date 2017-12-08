const assert = require('assert');
const axios = require('axios');

const WeatherPlugin = require('../src/plugins/weather/plugin.js');

describe('WeatherPlugin', function() {
  // Override opeanweather api key
  process.env.OPENWEATHER_API_KEY = 'also-not-a-real-api-key';

  let plugin = new WeatherPlugin({
    openweather_api_key: 'not-a-real-api-key'
  });

  let config_fixture = {
    prefix: '!',
    client: {
      user: {
        username: 'abot'
      }
    },
    axios: {}
  };

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

it('should reply with weather data when message is correct', function() {
  let response = {
    data: {
      cod: 200,
      main: {
        temp: '70'
      },
      weather: [{
        description: 'sunny'
      }],
      wind: {
        speed: '10'
      }
    }
  };

  let axios_mock = build_axios_mock(response);
  let plugin = new WeatherPlugin({
    openweather_api_key: 'not-a-real-api-key',
    axios: axios_mock
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

  let expected = "\nTemp: " +
    response.data.main.temp +
    " **|** Weather: " +
    response.data.weather[0].description +
    " **|** Wind: " +
    response.data.wind.speed;

  plugin.handle_message(message_fixture, config_fixture);

  // wait 1 seconds to make sure the message gets recorded
  setTimeout(() => {
    assert.equal(recorded_message, expected);
  }, 1);
});
});
});
