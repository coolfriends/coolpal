const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: {
    lib: "./lib/index.js",
    bin: "./bin/coolpal"
  },
  output: {
    path: __dirname + "/dist",
    filename: "[name].bundle.js"
  },
  mode: "development",
  target: "node",
  // Generate sourcemaps for proper error messages
  devtool: "source-map",
  // Since 'aws-sdk' is not compatible with webpack,
  // we exclude all node dependencies
  externals: [nodeExternals()],
  optimization: {
    minimize: true
  },
  performance: {
    // Turn off size warnings for entry points
    hints: false
  },
  // Run babel on all .js files and skip those in node_modules
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: __dirname,
        exclude: /node_modules/
      }
    ]
  }
};
