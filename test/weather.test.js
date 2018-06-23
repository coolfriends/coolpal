import WeatherPlugin from "../lib/plugins/weather/plugin";

describe("WeatherPlugin", () => {
  let pal = {
    prefix: "!",
    client: {
      user: {
        username: "abot"
      }
    }
  };
  let plugin = new WeatherPlugin(pal);

  describe("#constructor()", () => {
    describe("supported_event_types", () => {
      it("should only support the message event type", () => {
        expect(plugin.supported_event_types).toEqual(["message"]);
      });
    });
  });
  describe("#handle_event()", () => {
    it("should return true if message if well formatted", () => {
      let message_fixture = {
        content: "!weather denton",
        author: {
          username: "notabot"
        },
        reply: () => {}
      };
      expect(plugin.handle_event("message", message_fixture)).toBeTruthy();
    });
    it("should return false if event type is not message", () => {
      expect(plugin.handle_event("not_a_message", {}, {})).toBeFalsy();
    });
  });
  describe("#handle_message()", () => {
    it("should return true if message is from the bot", () => {
      let message_fixture = {
        content: "!weather",
        author: {
          username: "abot"
        }
      };
      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it("should not reply if message is from the bot", () => {
      let recorded_message = "";
      let message_fixture = {
        content: "!weather",
        author: {
          username: "abot"
        },
        reply: message => {
          recorded_message = message;
        }
      };
      expect(recorded_message).toEqual("");
    });
    it("should return true if city is not supported", () => {
      let message_fixture = {
        content: "!weather not_a_supported_city",
        author: {
          username: "notabot"
        },
        reply: () => {}
      };

      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it("should return true if message is correct", () => {
      let message_fixture = {
        content: "!weather denton",
        author: {
          username: "notabot"
        },
        reply: () => {}
      };

      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });

    it("should reply with weather data when message is correct", () => {
      let plugin = new WeatherPlugin(pal, {
        weather_client: {
          find: (obj, cb) => {
            cb(null, [
              {
                location: {
                  name: "blah"
                },
                current: {
                  date: "blah",
                  observationtime: "blah",
                  temperature: "blah",
                  feelslike: "blah",
                  skytext: "blah",
                  humidity: "blah",
                  winddisplay: "blah"
                }
              }
            ]);
          }
        }
      });
      // Make sure that the string passed to message.reply is captured.
      let recorded_message = "";
      let message_fixture = {
        content: "!weather denton",
        author: {
          username: "notabot"
        },
        reply: message => {
          recorded_message = message;
        }
      };
      let expected =
        "Current forecast for: blah\n" +
        "Date: blah\n" +
        "Observation Time: blah\n" +
        "Temperature (in F): blah\n" +
        "Feels like (in F): blah\n" +
        "Conditions: blah\n" +
        "Humidity: blah\n" +
        "Wind: blah\n";

      plugin.handle_message(message_fixture);

      // wait 1 seconds to make sure the message gets recorded
      setTimeout(() => {
        expect(recorded_message).toEqual(expected);
      }, 1);
    });
  });
});
