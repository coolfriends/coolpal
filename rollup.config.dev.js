export default {
  entry: 'src/coolpal.js',
  format: 'cjs',
  dest: 'bin/dev_bundle.js',
  external: ['discord.js', 'http', 'aws-sdk']
};
