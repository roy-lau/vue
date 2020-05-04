module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    // ? '/'
    ? 'web_list/jdjr/'
    : '/',

  outputDir: 'dist',

  assetsDir: 'static'
}
