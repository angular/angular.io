const ngtools = require('@ngtools/webpack');

module.exports = {
	devtool: 'source-map',
	entry: {
		main: ['./src/uni/app.server.ts', './src/uni/main.server-aot.ts']
	},
	resolve: {
      extensions: ['.ts', '.js']
    },
	target: 'node',
	output: {
		path: 'universal',
		filename: 'server.js'
	},
	plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig-uni.json'
		})
	],
	module: {
		rules: [
    		{ test: /\.css$/, loader: 'raw-loader' },
      		{ test: /\.html$/, loader: 'raw-loader' },
      		{ test: /\.ts$/, loader: '@ngtools/webpack' }
		]
	}
}
