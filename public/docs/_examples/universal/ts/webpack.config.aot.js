const ngtools = require('@ngtools/webpack');

module.exports = {
	devtool: 'source-map',
	entry: {
		main: './src/main-aot.ts'
	},
	resolve: {
      extensions: ['.ts', '.js']
    },
	target: 'node',
	output: {
		path: 'aot/dist',
		filename: 'build.js'
	},
	plugins: [
		new ngtools.AotPlugin({
			tsConfigPath: './tsconfig-aot.json'
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
