const path = require('path');
module.exports = {
  entry: {
    app: './src/main.js',
  },
  output: {
    filename: 'util.js',
    path: path.resolve(__dirname, 'dist')
  }
};