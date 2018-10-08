const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
require('dotenv').config({ path: `${__dirname}/.env` });

// process.env.SERVER_URL
module.exports = {
  mode: 'development',
  entry: './public/Index.jsx',
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s?css$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      },
      {
        test: /\.(svg|png|jpeg|jpg)$/,
        loader: 'url-loader',
        options: {
          limit: 8000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: './index.html',
    }),
    new webpack.DefinePlugin({
      'process': {
        'env': {
          'SERVER_URL': JSON.stringify(process.env.SERVER_URL),
      }
     }
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
