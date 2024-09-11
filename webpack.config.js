const path = require('path');

module.exports = {
  entry: './index.js', // Your main entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output file
  },
  mode: 'development',  // Set to 'development' to disable minification
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};
