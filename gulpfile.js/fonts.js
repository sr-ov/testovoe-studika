const gulp = require('gulp')

const { PATHS } = require('./paths.js')

module.exports = function fonts() {
	return gulp.src(PATHS.src.fonts).pipe(gulp.dest(PATHS.dist.fonts))
}
