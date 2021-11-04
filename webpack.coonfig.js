const path = require('path'); // node.js 的路径模块

module.exports = {
  // entry: './src/index.js', // 入口文件（简写形式）
  entry: {
    main: './src/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包后的路径
    filename: 'bundle.js', // 打包后的文件名
  }
}