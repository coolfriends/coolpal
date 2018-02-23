export default {
  input: 'src/coolpal.js',
  output: {
    format: 'cjs',
    file: 'bin/dev_bundle.js'
  },
  external: ['discord.js', 'http', 'aws-sdk']
};
