module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
        }
      })
  },
  devServer: {
    host: '0.0.0.0',
    // public: '0.0.0.0:8080',
    liveReload: true,
    // disableHostCheck: true,
    proxy: {
      '/app': {
        target: 'http://localhost:8081',
        changeOrigin: true,
        ws: true,
      },
    },
  },
}
