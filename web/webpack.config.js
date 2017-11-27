let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let pkg = require('./package.json');

let srcPath = path.join(__dirname, 'src');
let wwwPath = path.join(__dirname, 'www');

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'production';
}

if (!process.env.API_URL) {
  process.env.API_URL = 'http://0.0.0.0:3000';
}

if (!process.env.DEBUG) {
  process.env.DEBUG = false;
}

console.log("NODE_ENV: " + process.env.NODE_ENV);
console.log("API_URL: " + process.env.API_URL);
console.log("DEBUG: " + process.env.DEBUG);

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: path.join(srcPath, 'app.jsx'),
  output: {
    path: path.join(wwwPath),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle.js',
    publicPath: '/'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  devServer: {
    inline: true,
    compress: true,
    host: "0.0.0.0",
    port: process.env.PORT,
    historyApiFallback: true
  },
  module: {
    loaders: [
      {
        test: /.(jsx|js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [
            'es2015', 'react'
          ],
          plugins: ['transform-object-rest-spread']
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader?name=img/[name].[ext]'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        loader: "style-loader!css-loader!sass-loader"
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        loader: 'file-loader?name=fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: pkg,
      template: path.join(srcPath, 'index.html'),
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyCSS: true,
        minifyJS: true
      },
      inject: 'body'
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(srcPath, 'assets/robots.txt'),
        to: 'robots.txt'
      }, {
        from: path.join(srcPath, 'assets/favicon.ico'),
        to: 'favicon.ico'
      }, {
        from: path.join(srcPath, 'assets/html/404.html'),
        to: '404.html'
      }
    ]),
    new webpack.ProvidePlugin({$: 'jquery', jQuery: 'jquery'}),
    new webpack.EnvironmentPlugin(['NODE_ENV', 'API_URL', 'DEBUG']),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        API_URL: JSON.stringify(process.env.API_URL),
        DEBUG: JSON.stringify(process.env.DEBUG)
      }
    }),
  ],
  devtool: 'source-map'
};
