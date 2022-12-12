const gulp = require('gulp')
const _if = require('gulp-if')
const fileinclude = require('gulp-file-include')
const htmlmin = require('gulp-htmlmin')

const { PATHS } = require('./paths.js')
const { browserSync } = require('./devServer.js')
const imgToPicture = require('./imgToPicture.js')

/*============== PUG ======================================*/
const pug = require('gulp-pug')
/*============== /PUG ======================================*/

function templatesGenerate(lang) {
	const templatesDir = './src/templates'
	const isPug = lang === 'pug'

	return isPug
		? pug({ basedir: templatesDir, pretty: true })
		: fileinclude({
				basepath: templatesDir,
				context: require('../src/data.json'),
		  })
}

const isProd = process.env.NODE_ENV === 'prod'
module.exports = function templates() {
	return gulp
		.src('./src/templates/pages/*.html')
		.pipe(templatesGenerate('html'))
		.pipe(
			_if(isProd, htmlmin({ collapseWhitespace: true, removeComments: true }))
		)
		.pipe(gulp.dest(PATHS.dist.templates))
		.pipe(browserSync.stream())
}
