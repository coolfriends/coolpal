export default {
  entry: 'examples/run_discordbot_hello_world_and_weather',
  format: 'cjs',
  dest: 'bin/prod_bundle.js',
  external: ['discord.js', 'http', 'aws-sdk']
};
