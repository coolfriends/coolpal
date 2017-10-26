export default {
  entry: 'examples/run_discordbot',
  format: 'cjs',
  dest: 'bin/prod_bundle.js',
  external: ['discord.js', 'http', 'aws-sdk']
};
