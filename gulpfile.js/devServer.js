const browserSync = require('browser-sync').create()

const { DIST } = require('./paths.js')

function devServer() {
	browserSync.init({
		server: { baseDir: DIST },
		ui: false,
		open: false,
	})
}

module.exports = { devServer, browserSync }
