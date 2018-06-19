import assert from 'assert';
import axios from 'axios';

import CoinbasePlugin from '../lib/plugins/coinbase/plugin.js';

describe('CoinbasePlugin', function() {
  let pal = {
    prefix: '!',
    client: {
      user: {
        username: 'abot'
      }
    }
  };
  let plugin = new CoinbasePlugin(pal);

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
  describe('#handle_message()', function() {
    it('should return false if the first argument is not a match', function() {
      let message_fixture = {
        content: '!notcoinbase'
      };
      assert(!plugin.handle_message(message_fixture));
    });
    it('should return true if message is from the bot', function() {
      let message_fixture = {
        content: '!coinbase',
        author: {
          username: 'abot'
        }
      };
      assert(plugin.handle_message(message_fixture));
    });
    it('should not reply if message is from the bot', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!coinbase',
        author: {
          username: 'abot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      assert.equal(recorded_message, '');
    });
    it('should return true first arg is missing', function() {
      let message_fixture = {
        content: '!coinbase',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };
      assert(plugin.handle_message(message_fixture));
    });
    it('should send help message in reply if first arg is missing', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!coinbase',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = '\n\nCheck Coinbase for current coin prices\n\n' +
            '!coinbase list\n' +
            'Displays the available coins\n\n' +
            '!coinbase eth\n' +
            'Prints the current ETH value\n\n' +
            '!coinbase btc\n' +
            'Print the current BTC value\n\n';
      assert.equal(recorded_message, expected);
    });
    it('should send help message in reply if first arg is help', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!coinbase help',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = '\n\nCheck Coinbase for current coin prices\n\n' +
                     '!coinbase list\n' +
                     'Displays the available coins\n\n' +
                     '!coinbase eth\n' +
                     'Prints the current ETH value\n\n' +
                     '!coinbase btc\n' +
                     'Print the current BTC value\n\n';
      assert.equal(recorded_message, expected);
    });
    it('should send message about available coins when list is first arg', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!coinbase list',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = '\nAvailable Coinbase coins\n\n' +
                     'btc - BTC to USD\n' +
                     'eth - ETH to USD\n';
      assert.equal(recorded_message, expected);
    });
    it('should send message with btc price when btc is first arg', function() {
      let response = {
        data: {
          data: {
            amount: '1000.00'
          }
        }
      };
      let axios_mock = build_axios_mock(response);

      let plugin = new CoinbasePlugin(pal, {
        axios: axios_mock
      });

      let recorded_message = '';
      let message_fixture = {
        content: '!coinbase btc',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };

      plugin.handle_message(message_fixture);
      let expected = '\nFrom Coinbase | Current BTC in USD: $1000.00';

      setTimeout(() => {
        assert.equal(recorded_message, expected);
      }, 1);
    });
    it('should send message with eth price when eth is first arg', function() {
      let response = {
        data: {
          data: {
            amount: '1000.00'
          }
        }
      };
      let axios_mock = build_axios_mock(response);

      let plugin = new CoinbasePlugin(pal, {
        axios: axios_mock
      });

      let recorded_message = '';
      let message_fixture = {
        content: '!coinbase eth',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        },
      };

      plugin.handle_message(message_fixture);
      let expected = '\nFrom Coinbase | Current ETH in USD: $1000.00';
      setTimeout(() => {
        assert.equal(recorded_message, expected);
      }, 1);
    });
    it('should send help message with bad first arg', function() {
      let recorded_message = '';
      let message_fixture = {
        content: '!coinbase notacoin',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        },
      };
      plugin.handle_message(message_fixture);
      assert.equal(recorded_message, plugin.help);
    });
  });
});
