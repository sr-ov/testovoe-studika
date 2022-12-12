import { navData, regionsData } from './alpine-data'

console.log('main.js')

document.addEventListener('alpine:init', () => {
	window.Alpine.data('regionsData', regionsData)
	window.Alpine.data('navData', navData)

	window.Alpine.directive('scale', (el) => {
		el.style.cssText = `
			transform: scale(0.9);
			transition: transform 0.1s;
		`
		window.Alpine.nextTick(() => {
			el.style.cssText += `
				transform: scale(1);
			`
		})
	})
})
