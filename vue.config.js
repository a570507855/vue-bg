'use strict'
const path = require('path')
const defaultSettings = require('./web/settings.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

const name = defaultSettings.title || '后台管理'
module.exports = {
  publicPath: './',
  outputDir: '../nodeAPI/web',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  filenameHashing: true,
  pages: {
    index: {
      entry: 'web/main.js',
      template: 'public/index.html'
    },
  },
  devServer: {
    port: 9999,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: name,
    watch: true,
    resolve: {
      alias: {
        '@': resolve('web')
      }
    },
    plugins: [
      new CopyWebpackPlugin([{
        from: 'web/apple-app-site-association'
      }])
    ]
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch-share')
    config.plugins.delete('preload-share')

    config.plugins.delete('prefetch-index')
    config.plugins.delete('preload-index')

    config.module.rule('vue').uses.delete('cache-loader');
    config.module.rule('js').uses.delete('cache-loader');
    config.module.rule('ts').uses.delete('cache-loader');
    config.module.rule('tsx').uses.delete('cache-loader');
    config.module
      .rule('svg')
      .exclude.add(resolve('web/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('web/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
    config.module
      .rule('html')
      .test(/\.html$/)
      .use('html-loader')
      .loader('html-loader')
      .end()
    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              inline: /runtime\..*\.js$/
            }])
            .end()
        }
      )
  }
}