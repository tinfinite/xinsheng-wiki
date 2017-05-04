var path = require('path')
var fs = require('fs')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var _exitsDir = function (p) {
  return fs.statSync(p).isDirectory()
}

var _getPageName = function (p) {
  var page_path = path.resolve(__dirname, p),
    dirs = fs.readdirSync(page_path),
    result = [];

  for (var i = 0, len = dirs.length; i < len; i++) {
    if (_exitsDir(page_path + '/' + dirs[i])) {
      result.push(dirs[i]);
    }
  }
  return result
}

var getEntry = function () {
  var result = [],
    pages = _getPageName('../src/pages')

  for (var i = 0, len = pages.length; i < len; i++) {
    result.push('./src/pages/' + pages[i] + '/main.js')
  }
  return result
}

module.exports = {
  entry: {
    app: getEntry()
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name]/index.js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src'), resolve('test')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.less$/,
        loader: 'style!css!less'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
