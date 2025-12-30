const tscon = require('./tsconfig.json');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: {
    index: './build-module/index_scripts.ts'
  },
  output: {
    filename: '[name].js', // A.js, B.js に出力
    path: path.resolve(__dirname, tscon.compilerOptions.outDir)
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
