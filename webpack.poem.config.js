var path = require('path')
var NODE_MODULES = path.resolve(__dirname, 'node_modules')

var config = {
  entry: {
    create: path.join(__dirname, 'poem/static/poem/src/create.jsx'),
  },
  output: {
    path: path.join(__dirname, 'poem/static/poem/dist/'),
    filename: '[name]-bundle.js'
  },
  resolve: {
    extensions: ['.', '.js', '.jsx'],

  },
  module: {
    rules: [
       {
        test: /\.jsx?$/,
        use: 'babel-loader',
       },
      {
        test: /.css$/,
        use: [{
          loader: 'style-loader'
        },{
          loader: 'css-loader',
          options: {modules:true}
        }]
      },

    ]
  }
  }

module.exports = config
