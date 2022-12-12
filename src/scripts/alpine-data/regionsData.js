import { withRequest, once } from '../utils'
import { API_URL } from '../constants'
import { setSimpleScrollbar } from '../setSimpleScrollbar'

export const regionsData = () => ({
	...withRequest(API_URL),

	/* data */
	open: false,
	search: '',
	currentRegions: '',
	selectedRegions: new Set(),
	regions: [],
	/* /data */

	init() {
		this.setCurrentRegions()
		document.addEventListener('click', (e) => this.toggle(e))
	},

	/* methods */
	selectRegion(region) {
		const method = this.selectedRegions.has(region) ? 'delete' : 'add'
		this.selectedRegions[method](region)
	},

	changeCurrentRegions() {
		const selectedRegions = [...this.selectedRegions]
		const newCurrentRegions = selectedRegions.join(', ')

		if (newCurrentRegions === this.currentRegions) {
			return
		}

		this.currentRegions = newCurrentRegions
		this.setCookiesRegions(newCurrentRegions)
	},

	setCurrentRegions() {
		const { cookiesRegions } = this
		if (!cookiesRegions) return

		this.currentRegions = cookiesRegions
		this.selectedRegions = new Set(cookiesRegions.split(', '))
	},

	setCookiesRegions(cookies) {
		window.Cookies.set('regions', cookies)
	},

	toggle({ target }) {
		const { regionSearch, chooseRegionBtn, burger } = this.$refs

		if (this.open) {
			if (regionSearch.contains(target)) {
				return
			}
			if (!this.$refs.regionSearch.contains(target)) {
				this.open = false
			}
		} else {
			if (chooseRegionBtn.contains(target) || burger.contains(target)) {
				this.open = true
				this.fetchRegions()
			}
		}
	},

	isSearchedRegions(regionName) {
		if (!this.search) {
			return true
		}

		return (
			this.search &&
			regionName.toLowerCase().startsWith(this.search.toLowerCase())
		)
	},

	fetchRegions: once(function () {
		if (!this.open) return

		this.$_post().then((data) => {
			const normalizedRegions = []

			for (const region of data) {
				normalizedRegions.push(region)
				if (region.type === 'area') {
					const cities = region.cities.map((reg) => ({
						...reg,
						areaName: region.name,
					}))
					normalizedRegions.push(...cities)
				}
			}

			const timerId = setInterval(() => {
				const regionsChunk = normalizedRegions.splice(0, 50)
				if (!regionsChunk.length) {
					clearInterval(timerId)
				}
				this.regions.push(...regionsChunk)
				setSimpleScrollbar()
			}, 10)
		})
	}),
	/* /methods */

	/* getters */
	get cookiesRegions() {
		return window.Cookies.get('regions')
	},
	/* /getters */
})
