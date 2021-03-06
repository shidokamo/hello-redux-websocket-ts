const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { version: REDUX_WEBSOCKET_VERSION } = require('@giantmachines/redux-websocket/package.json');

const { NODE_ENV: env = 'development' } = process.env;

module.exports = {
  entry: {
    app: ['./src/app/Index.tsx'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: env === 'development' ? 'js/[name].bundle.js' : 'js/[name]-[contenthash].bundle.js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    contentBase: "./dist-dev", // Content not from webpack is served from
    publicPath: "/", // webpack output is served from here
    hot: true,
    host: '0.0.0.0',
    port: 3000,
    disableHostCheck: true,
//    hotOnly: true // This doesn't work for now.
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
        REDUX_WEBSOCKET_VERSION: JSON.stringify(REDUX_WEBSOCKET_VERSION),
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'app', 'index.html'),
      env,
    }),
  ],
};
