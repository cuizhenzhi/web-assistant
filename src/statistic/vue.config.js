const { defineConfig } = require('@vue/cli-service')
const path = require('path')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src')); // 设置 @ 为 src 目录
  },
  devServer: {
    port: 8080,
    open: true,
    hot: true,//自动保存
  }
})
