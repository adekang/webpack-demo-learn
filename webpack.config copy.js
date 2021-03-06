const path = require('path') // node.js 的路径模块
const miniSVGDataURI = require('mini-svg-data-uri') // 最小化svg
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	mode: 'development', // 'development' | 'production'
	devtool: 'eval-cheap-module-source-map', // development
	// entry: './src/index.js', // 入口文件（简写形式）
	entry: {
		main: './src/index.js',
	},
	// Tree Shaking
	optimization: {
    usedExports: true,
  },	
	// dev 服务
	devServer: {
 		static: {
      directory: path.join(__dirname, 'dist'),// 指定被访问html页面所在目录的路径
    },
		client: {
      progress: true, // 在浏览器中以百分比显示编译进度。
    },
    open: true, // 开启服务器时，自动打开页面
    compress: true, // 开启 gzip 压缩
    port: 8888, // 自定义端口号
  },
	output: {
		clean: true,// Clean the output directory before emit.
		path: path.resolve(__dirname, 'dist'), // 打包后的路径
		filename: 'bundle.js', // 打包后的文件名
		// 静态文件打包后的路径及文件名（默认是走全局的，如果有独立的设置就按照自己独立的设置来。）
		assetModuleFilename: 'assets/[name]_[hash][ext]',
	},
	// *** 模块选项中匹配的文件会通过 loaders 来转换！
	module: {
		rules: [
			//  处理es6+
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			// 图片文件
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				type: 'asset', // 一般会转换为 "asset/resource"
				generator: {
					filename: 'images/[name]_[hash][ext]', // 独立的配置
				},
				parser: {
					dataUrlCondition: {
						maxSize: 8 * 1024, // 8kb （低于8kb都会压缩成 base64）
					},
				},
			},
			// 字体文件
			{
				test: /\.(otf|eot|woff2?|ttf|svg)$/i,
				type: 'asset', // 一般会转换为 "asset/inline"
				generator: {
					filename: 'fonts/[name]_[hash][ext]',
				},
			},
			// 数据文件
			{
				test: /\.(txt|xml)$/i,
				type: 'asset/source', // 一般会转换成 "asset/source"
			},
			// svg文件
			{
				test: /\.svg$/i,
				type: 'asset',
				generator: {
					dataUrl(content) {
						content = content.toString()
						return miniSVGDataURI(content)
					},
				},
				parser: {
					dataUrlCondition: {
						maxSize: 2 * 1024, // 2kb （低于2kb都会压缩）
					},
				},
			},
			// css配置
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				sideEffects: true // 这些文件不要 Tree Shaking。
			},
			// scss配置
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					'style-loader',
					// Translates CSS into CommonJS
					{
						loader: 'css-loader',
						options: {
							importLoaders: 2,
							// 0 => no loaders (default);
							// 1 => postcss-loader;
							// 2 => postcss-loader, sass-loader
							modules: true, // 默认是 false ***
						},
					},
					// Compiles Sass to CSS
					'sass-loader',
					'postcss-loader',
				],
			},
		],
	},
	plugins: [
		// new CleanWebpackPlugin(), // 在打包之前，清除输入目录下的文件
		new HtmlWebpackPlugin({
			template: './src/index.html', // 这里设置自己模板文件
		}),
	],

}
