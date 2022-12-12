const gulp = require('gulp')
const webpack = require('webpack')
const gulpWebpack = require('webpack-stream')

const { PATHS } = require('./paths.js')
const { browserSync } = require('./devServer.js')

const isProd = process.env.NODE_ENV === 'prod'
const webpackConfig = {
	mode: isProd ? 'production' : 'development',
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							['@babel/plugin-proposal-function-bind'],
							[
								'@babel/plugin-proposal-pipeline-operator',
								{ proposal: 'fsharp' },
							],
						],
					},
				},
			},
		],
	},
}

module.exports = function scripts() {
	return gulp
		.src(PATHS.src.scripts)
		.pipe(gulpWebpack(webpackConfig, webpack))
		.pipe(gulp.dest(PATHS.dist.scripts))
		.pipe(browserSync.stream())
}
