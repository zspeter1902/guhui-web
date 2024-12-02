'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')
function resolve(dir) {
  return path.join(__dirname, dir)
}
// const Timestamp = new Date().getTime()
const name = defaultSettings.title || '安徽省跨境电商创新服务中心公共服务平台' // page title

// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
const port = process.env.port || process.env.npm_config_port || 9528 // dev port
const envPath = ['production', 'development'].includes(process.env.NODE_ENV) ? '/' : '/'
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: envPath,
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // https: true,
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        // target: `http://localhost:88/api`,
        // target: `http://192.168.6.100:${port}`,
        target: `http://192.168.6.64:${port}`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      'baiduApi': {
        target: 'http://140.246.156.117:88/baiduApi',
        changeOrigin: true,
        pathRewrite: {
          '^baiduApi': ''
        }
      },
      'baiduOpenApi': {
        target: 'https://www.ahceisc.com/baiduOpenApi',
        changeOrigin: true,
        pathRewrite: {
          '^baiduOpenApi': ''
        }
      }
    }
  },
  // transpileDependencies: [
  //   'swiper', 'vue-awesome-swiper', 'swiper.esm.bundle', 'element-ui', 'vue-baidu-map', 'core-js'
  // ],
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    // output: {
    //   sourcePrefix: ' ',
    //   filename: `[name].${Timestamp}.js`,
    //   chunkFilename: `[name].${Timestamp}.js`
    // },
    resolve: {
      alias: {
        '@': resolve('src'),
        'img': resolve('src/assets/images')
      }
    }
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')
    // 图片压缩
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 75 },
        optipng: { enabled: true },
        pngquant: { quality: [0.75, 0.9], speed: 4 },
        gifsicle: { interlaced: false },
        disable: process.env.NODE_ENV === 'development'
      })
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // 开启压缩js代码
          config.optimization.minimize(true)
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
