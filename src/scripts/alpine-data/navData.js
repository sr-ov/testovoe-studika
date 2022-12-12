const translateWidth = 200

export const navData = () => ({
	step: 0,
	end: -1,
	translateSteps: [],

	translateX(value) {
		this.$refs.navList.style.transform = `translateX(-${value}px)`
	},

	onNext() {
		const value = this.translateSteps[this.step]
		this.step += 1
		this.translateX(value)
	},

	onPrev() {
		this.step -= 1
		const value = this.translateSteps[this.step] - translateWidth
		this.translateX(value)
	},

	get isStart() {
		return this.step === 0
	},

	get isEnd() {
		return this.step === this.end
	},

	init() {
		const { scrollWidth } = this.$refs.navList
		const { offsetWidth } = this.$refs.navList.parentElement

		const diffWidth = scrollWidth - offsetWidth
		this.end = Math.ceil(diffWidth / translateWidth)

		for (let index = 1; index < this.end; index++) {
			this.translateSteps.push(translateWidth * index)
		}
		this.translateSteps.push(diffWidth)
	},
})
