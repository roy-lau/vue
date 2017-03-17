var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
/*
 * 以下为webpack的配置项
 */
module.exports = {
  entry: {			// 打包的入口文件
    app: './src/main.js'
  },
  output: {			// 配置打包的结果
    path: config.build.assetsRoot,	// 定义输出路径
    filename: '[name].js',		// 定义输出文件名
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  /*
   * 影响模块的解析
   */
  resolve: {
    extensions: ['.js', '.vue', '.json'],	// 自动补全后缀名
    alias: {
      '@': resolve('src'),
    }
  },
  /* 
   * 定义模块处理逻辑
   */
  module: {
    rules: [
      {
        test: /\.vue$/,		// 正则表达式用于匹配到的文件
        loader: 'vue-loader',	// 模块加载器
        options: vueLoaderConfig // 调用vue-loader.conf.js文件
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')] // 读取某个文件夹下的文件
      },
      {		// 处理图片文件
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {		// 处理字体文件
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
