const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    indexScript: './modules/releaseScripts/index_scripts'
  },
  output: {
    filename: '[name].js', // A.js, B.js に出力
    path: path.resolve(__dirname, '../atsuki-web-system/site/js')
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@compFW': path.resolve(__dirname, '../ayusui-devbase/modules/base'),
    }

  },
  plugins: [
    new CleanWebpackPlugin()
  ],
  mode: 'none'
};
