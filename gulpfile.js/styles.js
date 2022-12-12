const gulp = require('gulp')
const scss = require('gulp-sass')(require('sass'))
const autoprefixer = require('gulp-autoprefixer')
const groupCssMediaQueries = require('gulp-group-css-media-queries')
const _if = require('gulp-if')
const cleanCSS = require('gulp-clean-css')

const { PATHS } = require('./paths.js')
const { browserSync } = require('./devServer.js')

const isProd = process.env.NODE_ENV === 'prod'
module.exports = function styles() {
	return gulp
		.src(PATHS.src.styles, { sourcemaps: !isProd })
		.pipe(scss({ indentWidth: 2, outputStyle: 'expanded' }))
		.pipe(autoprefixer({ cascade: false }))
		.pipe(_if(isProd, groupCssMediaQueries()))
		.pipe(_if(isProd, cleanCSS()))
		.pipe(gulp.dest(PATHS.dist.styles, { sourcemaps: !isProd }))
		.pipe(browserSync.stream())
}
