import { readFileAsync } from "../util";
import CoolPal from "../coolpal";

export default class StartCommand {
  constructor(obj) {
    this.config_filename = obj.config_filename || "coolpal.config.json";
  }

  async run() {
    let data = await readFileAsync(this.config_filename);
    let configuration = JSON.parse(data);
    let pal = new CoolPal(configuration);
    pal.start();
  }
}
