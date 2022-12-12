const mediaQuery = window.matchMedia('(min-width: 991px)')

export const setSimpleScrollbar = (sel = '#scroll-container') => {
	if (!mediaQuery.matches) {
		return
	}
	const scrollContainer = document.querySelector(sel)
	if (!(scrollContainer && window.SimpleScrollbar)) {
		return
	}
	window.SimpleScrollbar.initEl(scrollContainer)
}
