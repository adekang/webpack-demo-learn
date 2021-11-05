// 公共配置
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 入口文件
  entry: './src/index',
  // 输出文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/[name]_[hash][ext]',
    clean: true,
  },
	resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  // 模块
  module: {
    rules: [
			//  处理es6+
			{
				test: /\.(js|mjs)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			//  ts配置
			{
				test: /\.(jsx|ts|tsx)$/,
				use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                noEmit: false,
              },
            },
          },
        ],
				exclude: /node_modules/
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
			// svg文件最小化
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
  // 插件
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html'
    })
  ]
};