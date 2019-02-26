/* eslint-env node */
'use strict'

const CleanWebpackPlugin = require('clean-webpack-plugin')
const ForceCaseSensitivityPlugin = require('force-case-sensitivity-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: process.env.BUILD_MODE || 'development',
  context: __dirname,
  entry: {
    main: [
      './app/app.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].min.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      { parser: { amd: false } },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [/app\/scripts/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              sourceMaps: true,
              cacheDirectory: true,
              presets: [
                'es2015',
              ],
              plugins: [
                'babel-plugin-rewire',
              ],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              quiet: true,
              failOnError: true,
              emitError: true,
            },
          },
        ],
      },
      {
        test: /\.html/,
        exclude: /index\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Writes styles.css to disk.
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin('[name].css'),
    new ForceCaseSensitivityPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      filename: 'index.html',
    }),
  ],
  resolve: {
    modules: [
      path.join('./app'),
      // This significantly speeds up build times.
      path.join('./node_modules'),
    ],
  },
  externals: {
  },
  // Webpack hosts the files here. Also serves as a reverse proxy to
  // localProxy/proxy.js.
  devServer: {
    host: '0.0.0.0',
    disableHostCheck: true,
    port: 9000,
    contentBase: path.join(__dirname, 'dist'),
    proxy: [
      {
        path: '/**',
        quiet: false,
        noInfo: false,
        logLevel: 'debug',
        changeOrigin: true,
        stats: { color: true },
        toProxy: true,
        target: 'http://localhost:8081',
        pathRewrite: { '^/api': '' },
        context: [
          '/api/**',
        ],
      },
    ],
  },
}