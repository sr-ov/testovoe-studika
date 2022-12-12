const SRC = './src'
const DIST = './dist'

const PATHS = {
	src: {
		templates: SRC + '/templates/pages/*.{html,pug}',
		styles: SRC + '/styles/*.scss',
		scripts: SRC + '/scripts/main.js',
		images: SRC + '/images/**/*.{jpg,jpeg,png,svg,webp,avif}',
		convertImages: SRC + '/images/**/*.{jpg,jpeg,png}',
		toSprite: SRC + '/images/svg/*.svg',
		fonts: SRC + '/fonts/**/*.woff2',
	},
	dist: {
		templates: DIST,
		styles: DIST + '/css',
		scripts: DIST + '/js',
		images: DIST + '/images',
		fonts: DIST + '/fonts',
	},
	watch: {
		templates: SRC + '/templates/**/*.{html,pug}',
		styles: SRC + '/styles/**/*.scss',
		scripts: SRC + '/scripts/**/*.js',
		images: SRC + '/images/**/*.{jpg,jpeg,png,svg}',
		convertImages: SRC + '/images/**/*.{jpg,jpeg,png}',
		toSprite: SRC + '/images/svg/*.svg',
		fonts: SRC + '/fonts/**/*.woff2',
	},
}

module.exports = { PATHS, DIST, SRC }
