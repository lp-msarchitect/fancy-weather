const webpack = require('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const isProduction = options.mode === 'production';

  const config = {
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? 'none' : 'source-map',
    watch: !isProduction,
    entry: ['./src/js/index.js', './src/styles/style.scss'],
    output: {
      path: path.join(__dirname, '/dist'),
      filename: 'script.js',
    },

    module: {
      rules: [
        {
          test: /\.(png|svg|jpe?g|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './images/',
                name: '[name].[ext]',
                exclude: [
                  path.join(__dirname, '/src/assets/fonts'),
                  path.join(__dirname, '/src/assets/icons'),
                ],
              },
            },
          ],
        },
        {
          test: /\.(ttf)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './fonts/',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: './icons/',
                name: '[name].[ext]',
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            { loader: MiniCssExtractPlugin.loader },
            { loader: 'css-loader' },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new CopyWebpackPlugin([
        {
          from: './src/assets/images',
          to: './images',
        },
        {
          from: './src/assets/fonts',
          to: './fonts',
        },
        {
          from: './src/assets/icons',
          to: './icons',
        },
      ]),
    ],
  };

  return config;
};
