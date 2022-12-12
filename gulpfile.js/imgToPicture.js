const Vinyl = require('vinyl')
const PluginError = Vinyl.PluginError
const through = require('through2')

const pluginName = 'gulp-webp-html-nosvg'

module.exports = function () {
	return through.obj(function (file, enc, cb) {
		if (file.isNull()) {
			cb(null, file)
			return
		}
		if (file.isStream()) {
			cb(new PluginError(pluginName, 'Streaming not supported'))
			return
		}
		try {
			function pictureRender(url, imgTag) {
				return /* html */ `
				<picture>
					<source srcset="${url}.avif" type="image/avif">
					<source srcset="${url}.webp" type="image/webp">
					${imgTag}
				</picture>`
			}

			let inPicture = false
			const data = file.contents
				.toString()
				.split('\n')
				.map((line) => {
					// Вне <picture/>?
					if (line.includes('<picture')) {
						inPicture = true
					}
					if (line.includes('</picture')) {
						inPicture = false
					}

					// Проверяем есть ли <img/>
					if (line.includes('<img') && !inPicture) {
						// Новый урл с .webp
						const reImg = /<img([^>]*)src=\"(\S+)\"([^>]*)>/gi
						const reArr = reImg.exec(line)

						if (!reArr) return line

						const [imgTag, , imgSrc] = reArr
						// Если в урле есть .webp или .svg, пропускаем
						const isDisallowedExt = /\.webp$|\.avif$|\.svg$|\.gif$/gim.test(imgSrc)
						if (isDisallowedExt) {
							return line
						}
						// Компилим <picture/>
						const imgSrcWithoutExt = imgSrc.replace(/\.(jpe?g|png)$/i, '')
						const newHTML = pictureRender(imgSrcWithoutExt, imgTag)
						return line.replace(imgTag, newHTML)
					}

					return line
				})
				.join('\n')
			file.contents = new Buffer.from(data)
			this.push(file)
		} catch (err) {
			this.emit('error', new PluginError(pluginName, err))
		}
		cb()
	})
}
