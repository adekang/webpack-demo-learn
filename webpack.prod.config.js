const { merge } = require('webpack-merge'); // 插件引入
const commonConfig = require('./webpack.common.config'); // 引入共用配置
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const prodConfig = {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader','postcss-loader' // postcss-loader 可选
        ],
      },
    ],
  },
};

module.exports = merge(commonConfig, prodConfig); // 共用配置与生产配置合并
