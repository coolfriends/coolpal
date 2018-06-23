import fs from "fs";
import CoolPal from "../lib/index";

/**
 * This program will respect your configuration file first and fall back on the
 * COOLPAL_DISCORD_TOKEN env variable.
 *
 **/
fs.readFile("examples/plugin_configuration.json", (err, data) => {
  if (err) {
    throw err;
  }
  let configuration = JSON.parse(data);
  const token = configuration.token;
  if (token === undefined || token === "")
    configuration.token = process.env.COOLPAL_DISCORD_TOKEN;
  let pal = new CoolPal(configuration);
  pal.start();
});
