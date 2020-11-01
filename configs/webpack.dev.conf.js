const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const TargetFileOfCompile = path.resolve(__dirname, '..', 'src/index.ts');
const OutputOfDistFolder = path.resolve(__dirname, '..', 'dist');
const TargetHtmlTemplate = path.resolve(__dirname, '..', 'template/index.html');

const TargetFileOfOutput = 'omega.js';
const LibraryName = 'Omega';

const HtmlTemplateConfig = Object.assign(
  {},
  // 查询 inject 字段
  { inject: 'head', template: TargetHtmlTemplate },
);

module.exports = {
  mode: 'development',

  devtool: 'inline-source-map',

  entry: TargetFileOfCompile,

  output: {
    filename: TargetFileOfOutput,
    path: OutputOfDistFolder,
    libraryTarget: 'umd',
    // globalObject: 'window',
    library: LibraryName,
  },

  resolve: {
    extensions: ['.ts', '.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin(HtmlTemplateConfig),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
