/* global __dirname */

var path = require('path');

var webpack = require('webpack');

var dir_js = path.resolve(__dirname, 'lib');
var dir_build = path.resolve(__dirname, 'dist');

module.exports = [{
    entry: path.resolve(dir_js, 'rextract.js'),
    output: {
        path: dir_build,
        filename: 'rextract.js'
    },
    devServer: {
        contentBase: dir_build,
    },
    module: {
        loaders: [
          {
            loader: "babel-loader",
            include: [
              path.resolve(__dirname, "lib"),
            ],
            test: /\.js?$/,
            query: {
              presets: ['es2015'],
            }
          }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        colors: true
    }
}, {
entry: path.resolve(dir_js, 'rextract.js'),
output: {
    path: dir_build,
    filename: 'rextract-module.js',
    library : 'Rextract',
    libraryTarget : 'commonjs2'
},
module: {
    loaders: [
      {
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "lib"),
        ],
        test: /\.js?$/,
        query: {
          presets: ['es2015'],
        }
      }
    ]
},
plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new webpack.NoErrorsPlugin()
]
}];
