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
      './app/app.tsx',
    ],
  },
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].min.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        resolve: {
          extensions: ['.ts', '.tsx'],
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.m\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'dts-css-modules-loader',
            options: {
              namedExport: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]_[hash:base64]',
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    // Writes styles.css to disk.
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new ForceCaseSensitivityPlugin(), // because macOS dev
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
        pathRewrite: { '^/api': '' }, // rewrite /api to /
        context: [
          '/api/**',
        ],
      },
    ],
  },
}
