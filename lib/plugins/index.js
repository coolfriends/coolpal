import SpamPlugin from './spam/plugin';
import HelloWorldPlugin from './hello_world/plugin';
import WeatherPlugin from './weather/plugin';
import CoinbasePlugin from './coinbase/plugin';
import FeatureRequestPlugin from './feature-request/plugin.js';
import HelpPlugin from './help/plugin.js';
import GoogleNewsPlugin from './google-news/plugin.js';


let plugin_name_to_class = {
  'spam': SpamPlugin,
  'helloworld': HelloWorldPlugin,
  'weather': WeatherPlugin,
  'coinbase': CoinbasePlugin,
  'feature-request': FeatureRequestPlugin,
  'help': HelpPlugin,
  'google-news': GoogleNewsPlugin
};

export { plugin_name_to_class };
