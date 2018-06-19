import GoogleNewsPlugin from '../lib/plugins/google-news/plugin.js';

describe('GoogleNewsPlugin', () => {
  let pal = {
    prefix: '!',
    client: {
      user: {
        username: 'abot'
      }
    }
  };
  let plugin = new GoogleNewsPlugin(pal);

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

  describe('#handle_message()', () => {
    it('should return false if the first argument is not a match', () => {
      let message_fixture = {
        content: '!not-google-news'
      };
      expect(plugin.handle_message(message_fixture)).toBeFalsy();
    });
    it('should return true if message is from the bot', () => {
      let message_fixture = {
        content: '!news',
        author: {
          username: 'abot'
        }
      };
      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it('should not reply if message is from the bot', () => {
      let recorded_message = '';
      let message_fixture = {
        content: '!news',
        author: {
          username: 'abot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      expect(recorded_message).toEqual('');
    });
    it('should return true first arg is missing', () => {
      let message_fixture = {
        content: '!news',
        author: {
          username: 'notabot'
        },
        reply: () => {}
      };
      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it('should send help message in reply if first arg is missing', () => {
      let recorded_message = '';
      let message_fixture = {
        content: '!news',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected = '\nFetch news from Google\n\n' +
                     '!news help\n' +
                     'Displays this message\n' +
                     '!news any topics\n' +
                     'Replies with a search result from Google\n';
      expect(recorded_message).toEqual(expected);
    });
    it('should send help message in reply if first arg is help', () => {
      let recorded_message = '';
      let message_fixture = {
        content: '!news help',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      let expected =  '\nFetch news from Google\n\n' +
                      '!news help\n' +
                      'Displays this message\n' +
                      '!news any topics\n' +
                      'Replies with a search result from Google\n';
      expect(recorded_message).toEqual(expected);
    });
    it('should reply with search results if message is good', () => {
      let google_news_mock = {
        search: () => {
          return new Promise((resolve, reject) => {
            resolve([{
              title: 'a title',
              link: 'a link'
            }]);
          });
        }
      };

      let plugin = new GoogleNewsPlugin(pal, {
        google_news: google_news_mock
      });

      let recorded_message = '';
      let message_fixture = {
        content: '!news goodquery',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };

      plugin.handle_message(message_fixture);
      let expected = "\nThe Top Result from Google News. . .\n\n" +
                     "------------------------------------\n" +
                     "Query: goodquery\n" +
                     "------------------------------------\n\n" +
                     "a title\n\n" +
                     "a link\n";

      // wait 1 seconds to make sure the message gets recorded
      setTimeout(() => {
        expect(recorded_message).toEqual(expected);
      }, 1);
    });
    it('should send failed to get message if query was bad', () => {
      let google_news_mock = {
        search: () => {
          return new Promise((resolve, reject) => {
            reject("Error");
          });
        }
      };
      let plugin = new GoogleNewsPlugin(pal, {
        google_news: google_news_mock
      });

      let recorded_message = '';
      let message_fixture = {
        content: '!news abadquery',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };

      plugin.handle_message(message_fixture);
      let expected = "Failed to get results for abadquery\n";
      // wait 1 seconds to make sure the message gets recorded
      setTimeout(() => {
        assert.equal(recorded_message, expected);
      }, 1);
    });
  });
  describe('#call_google_news_rss()', () => {
    it('should return true if google news search fails', () => {
      let google_news_mock = {
        search: () => {
          return new Promise((resolve, reject) => {
            reject("Error");
          });
        }
      };
      let plugin = new GoogleNewsPlugin(pal, {
        google_news: google_news_mock
      });

      let recorded_message = '';
      let message_fixture = {
        content: '!news abadquery',
        author: {
          username: 'notabot'
        },
        reply: (message) => {
          recorded_message = message;
        }
      };

      setTimeout(() => {
        assert(plugin.call_google_news_rss(message_fixture));
      }, 1);
    });
  });
});
