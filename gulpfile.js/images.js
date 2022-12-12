const gulp = require('gulp')
const imagemin = require('gulp-imagemin')
const newer = require('gulp-newer')

const { PATHS } = require('./paths.js')
const { browserSync } = require('./devServer.js')

/*============== CONVERT-IMAGES ======================================*/
const webp = require('gulp-webp')
const avif = require('gulp-avif')
/*============== /CONVERT-IMAGES ======================================*/

/*============== SVG-SPRITE ======================================*/
const svgSprite = require('gulp-svg-sprite')
const svgmin = require('gulp-svgmin')
/*============== /SVG-SPRITE ======================================*/

function imagesDev() {
	return gulp
		.src(PATHS.src.images)
		.pipe(newer(PATHS.dist.images))
		.pipe(gulp.dest(PATHS.dist.images))
		.pipe(browserSync.stream())
}

function imagesMin() {
	return gulp
		.src(PATHS.src.images)
		.pipe(newer(PATHS.src.images))
		.pipe(imagemin({ verbose: true }))
		.pipe(gulp.dest(PATHS.dist.images))
}

function webpImages() {
	return gulp
		.src(PATHS.src.convertImages)
		.pipe(webp())
		.pipe(gulp.dest(PATHS.dist.images))
}

function avifImages() {
	return gulp
		.src(PATHS.src.convertImages)
		.pipe(avif())
		.pipe(gulp.dest(PATHS.dist.images))
}

function generateSvgSprite() {
	return gulp
		.src(PATHS.src.toSprite)
		.pipe(svgmin({ js2svg: { pretty: true } }))
		.pipe(
			svgSprite({
				mode: { symbol: { sprite: '../sprite.svg' } },
			})
		)
		.pipe(gulp.dest(PATHS.dist.images))
		.pipe(browserSync.stream())
}

module.exports.imagesDev = imagesDev
module.exports.imagesBuild = gulp.series(
	imagesMin,
	webpImages,
	avifImages,
	generateSvgSprite
)
module.exports.generateSvgSprite = generateSvgSprite
