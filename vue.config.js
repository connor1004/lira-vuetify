module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.module
      .rule('ico')
      .test(/\.ico$/)
      .use('file-loader')
        .loader('file-loader')
        .end()
  }
}