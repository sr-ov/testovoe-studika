const del = require('del')

const { DIST } = require('./paths.js')

module.exports = function cleanDist() {
	return del([DIST])
}
