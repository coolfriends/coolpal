import * as utils from "../lib/plugins/utils.js";

describe("utils", () => {
  describe("#split_message()", () => {
    it("should split the content of a message into an array", () => {
      let expected = ["hello", "my", "darling"];
      let message_fixture = {
        content: "hello my darling"
      };
      expect(expected).toEqual(utils.split_message(message_fixture));
    });
    it("should return an array with an empty string with empty message", () => {
      let expected = [""];
      let message_fixture = {
        content: ""
      };
      expect(expected).toEqual(utils.split_message(message_fixture));
    });
  });
  describe("#capitalize()", () => {
    it("should return the capitalized version of a word", () => {
      expect(utils.capitalize("aword")).toEqual("Aword");
      expect(utils.capitalize("Anotherword")).toEqual("Anotherword");
    });
  });
  describe("#color()", () => {
    it("can make text green", () => {
      expect(utils.color("a test string", "green")).toEqual(
        "```css\na test string\n```"
      );
    });
    it("can make text yellow", () => {
      expect(utils.color("a test string", "yellow")).toEqual(
        "```fix\na test string\n```"
      );
    });
    it("returns the original string if color doesn't exist", () => {
      expect(utils.color("a test string", "adumbcolor")).toEqual(
        "a test string"
      );
    });
  });
});
