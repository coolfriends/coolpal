const assert = require('assert');
const utils = require('../src/plugins/utils.js');

describe('utils', function() {
  describe('#split_message()', function() {
    it('should split the content of a message into an array', function() {
      let expected = ['hello', 'my', 'darling'];
      let message_fixture = {
        content: 'hello my darling'
      };
      assert.deepEqual(expected, utils.split_message(message_fixture));
    });
    it('should return an array with an empty string with empty message', function() {
      let expected = [''];
      let message_fixture = {
        content: ''
      };
      assert.deepEqual(expected, utils.split_message(message_fixture));
    });
  });
  describe('#capitalize()', function() {
    it('should return the capitalized version of a word', function() {
      assert.equal(utils.capitalize('aword'), 'Aword');
      assert.equal(utils.capitalize('Anotherword'), 'Anotherword');
    });
  });
});
