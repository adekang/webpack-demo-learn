// webpack.dev.config.js
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge'); // 插件引入
const commonConfig = require('./webpack.common.config'); // 引入共用配置

const devConfig = {
  // 模式
  mode: 'development',
  // 性能优化 (tree shaking)
  optimization: {
    usedExports: true
  },
  resolve: {
		alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  // source-map
  devtool: 'eval-cheap-module-source-map',
  // 开发服务器
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),// 指定被访问html页面所在目录的路径
    },
    compress: true,
    port: 8888,
    open: true,
    hot: true // 代码变化后，自动刷新页面
  },
  // 插件
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig); // 共用配置与开发配置合并