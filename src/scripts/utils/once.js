export const once = (fn) =>
	function (...args) {
		if (!fn) return
		fn.apply(this, args)
		fn = null
	}
