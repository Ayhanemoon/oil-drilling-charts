const path = require('path');

module.exports = {
    entry: './index.js', // Client-side entry point
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
    },
    mode: 'development',  // or 'production' for production builds
    target: 'web',  // This is important, ensures that the build is for browsers, not Node.js
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
    externals: {
        ws: "commonjs ws"  // Do not bundle ws for client-side
    },        
};
  
