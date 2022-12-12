const gulp = require('gulp')
const cleanDist = require('./cleanDist.js')
const templates = require('./templates.js')
const styles = require('./styles.js')
const scripts = require('./scripts.js')
const { imagesDev, generateSvgSprite, imagesBuild } = require('./images.js')
const fonts = require('./fonts.js')
const { devServer } = require('./devServer.js')

const { PATHS } = require('./paths.js')

function watchFiles() {
	gulp.watch(PATHS.watch.templates, templates)
	gulp.watch(PATHS.watch.styles, styles)
	gulp.watch(PATHS.watch.scripts, scripts)
	gulp.watch(PATHS.watch.images, imagesDev)
	gulp.watch(PATHS.watch.toSprite, generateSvgSprite)
}

module.exports.default = gulp.series(
	cleanDist,
	gulp.parallel(templates, styles, scripts, imagesDev, generateSvgSprite, fonts),
	gulp.parallel(watchFiles, devServer)
)

module.exports.build = gulp.series(
	cleanDist,
	gulp.parallel(templates, styles, scripts, imagesBuild, fonts)
)
