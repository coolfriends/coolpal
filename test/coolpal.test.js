import fs from "fs";
import CoolPal from "../lib/coolpal.js";

describe("CoolPal", function() {
  it("can load plugins using an Object", function() {
    let bot = new CoolPal({
      token: "example-token",
      plugins: [
        {
          name: "helloworld",
          configuration: {}
        },
        {
          name: "spam",
          configuration: {}
        }
      ]
    });
    let commands = ["helloworld", "spam"];
    let found_commands = [];
    for (let plugin of bot._plugins) {
      found_commands.push(plugin.command);
    }
    expect(commands).toEqual(found_commands);
  });
});
