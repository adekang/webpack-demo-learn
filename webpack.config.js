const commonConfig = require('./build/webpack.common.config.js')
const productionConfig = require('./build/webpack.prod.config.js')
const developmentConfig = require('./build/webpack.dev.config.js')
const { merge } = require('webpack-merge');


module.exports = (env) => {
  const isProduction = env && env.production
  const config = isProduction ? productionConfig : developmentConfig
  return merge(commonConfig, config)
}