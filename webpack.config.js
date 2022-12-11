require('dotenv').config();
const path = require('path');

const MODE = process.env.WEBPACK_MODE;

module.exports = {
  entry: './src/memetris.js',
  output: {
    filename: 'memetris.js',
    path: path.resolve(__dirname, 'public/js'),
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }],
  },
  mode: MODE,
};
