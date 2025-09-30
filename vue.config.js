const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  publicPath: "./",
  configureWebpack: {
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public/manifest.json',
            to: 'manifest.json'
          }
        ]
      })
    ]
  }
};
