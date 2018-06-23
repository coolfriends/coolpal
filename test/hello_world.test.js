import HelloWorldPlugin from "../lib/plugins/hello_world/plugin";

describe("HelloWorldPlugin", () => {
  let bot_user_name = "abot";
  let pal = {
    prefix: "!",
    client: {
      user: {
        username: bot_user_name
      }
    }
  };

  let plugin = new HelloWorldPlugin(pal);

  describe("#handle_event()", () => {
    it("should return true if event_type is message and message is not from bot", () => {
      let message_fixture = {
        author: {
          username: "notthebotusername"
        },
        content: "!helloworld",
        reply: () => {}
      };
      expect(plugin.handle_event("message", message_fixture)).toBeTruthy();
    });
    it("should return false if event_type is not message", () => {
      expect(
        plugin.handle_event("not_a_supported_message", {}, {})
      ).toBeFalsy();
    });
  });
  describe("#handle_message()", () => {
    it("should return true if the message provided is properly formatted", () => {
      let recorded_message = "";
      let message_fixture = {
        author: {
          username: "notthebotusername"
        },
        content: "!helloworld,",
        reply: () => {}
      };
      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it("should send a greeting to the user", () => {
      let recorded_message = "";
      let message_fixture = {
        author: {
          username: "notthebotusername"
        },
        content: "!helloworld,",
        reply: message => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      expect(recorded_message).toEqual("Hello, world!");
    });
    it("should return false if the message command is not called", () => {
      let message_fixture = {
        content: "notthecommand"
      };
      expect(plugin.handle_message(message_fixture)).toBeFalsy();
    });
    it("should return true if the message is from the bot", () => {
      let message_fixture = {
        content: "!helloworld",
        author: {
          username: bot_user_name
        }
      };
      expect(plugin.handle_message(message_fixture)).toBeTruthy();
    });
    it("should not reply to the message if the message is from the bot", () => {
      let recorded_message = "";
      let message_fixture = {
        content: "!helloworld",
        author: {
          username: bot_user_name
        },
        reply: message => {
          recorded_message = message;
        }
      };
      plugin.handle_message(message_fixture);
      expect("").toBe(recorded_message);
    });
  });
});
