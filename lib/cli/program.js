import program from "commander";
import StartCommand from "./startCommand";

program.version("0.0.1", "v", "--version");

program
  .command("start")
  .description("start coolpal")
  .option("-c", "--config", "configuration file name")
  .action(async cmd => {
    let config_filename = cmd.config ? cmd.config : "coolpal.config.json";
    const command = new StartCommand({
      config_filename: config_filename
    });
    await command.run();
  });

export default program;
