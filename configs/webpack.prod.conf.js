const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const TargetFileOfCompile = path.resolve(__dirname, '..', 'src/index.ts');
const OutputOfDistFolder = path.resolve(__dirname, '..', 'dist');

const TargetFileOfOutput = 'omega.min.js';
const LibraryName = 'Omega';

module.exports = {
  mode: 'production',

  devtool: 'source-map',

  entry: TargetFileOfCompile,

  output: {
    filename: TargetFileOfOutput,
    path: OutputOfDistFolder,
    libraryTarget: 'umd',
    globalObject: 'window',
    library: LibraryName
  },

  optimization: {
    minimizer: [new TerserPlugin()]
  },

  resolve: {
    extensions: ['.ts', '.js']
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },

  plugins: [new CleanWebpackPlugin()]
};
