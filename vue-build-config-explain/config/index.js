// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

// config文件夹下最主要的文件就是index.js了，在这里面描述了开发和构建两种环境下的配置，
// 前面的build文件夹下也有不少文件引用了index.js里面的配置。下面是代码注释：
module.exports = {
    // 构建产品时使用的配置
  build: {
    // webpack 的编译环境
    env: require('./prod.env'),
    // 编译输入的index.html文件
    index: path.resolve(__dirname, '../dist/index.html'),
    // webpack输出的目标文件夹路径
    assetsRoot: path.resolve(__dirname, '../dist'),
    // webpack编译输出文件的二级文件夹
    assetsSubDirectory: 'static',
    // webpack 编译输出的发布路径
    assetsPublicPath: '/',
    // 使用SourceMap
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    // 默认不打开格gzip模式
    productionGzip: false,
    // gzip 模式需要压缩的文件的扩展名
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  // 开发过程中使用到的配置
  dev: {
    // webpack 的编译环境
    env: require('./dev.env'),
    // dev-server监听的端口
    port: 8080,
    // 启动dev-server之后自动打开浏览器
    autoOpenBrowser: true,
    // webpack编译输出的二级文件夹
    assetsSubDirectory: 'static',
    // webpack编译输出的发布路径
    assetsPublicPath: '/',
    // 请求代理表，在这里可以配置特定的请求代理到对应的API接口
    // 例如'/api/xxx'代理到'www.example.com/api/xxx'
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    // 是否开启cssSourceMap
    cssSourceMap: false
  }
}

// config/dev.env.js
// config/prod.env.js
// config/test.env.js

// 这三个文件就简单设置了环境变量而已，没什么特别的。