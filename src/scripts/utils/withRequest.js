export const withRequest = (url) => {
	function request(opts) {
		this.isLoading = true

		return fetch(opts?.url ?? url, {
			headers: { 'Content-Type': 'application/json' },
			...opts,
		})
			.then((res) => {
				if (!res.ok) {
					if (res.status === 404) throw new Error('Not found')
					else throw new Error('Unexpected error')
				}
				return res.json()
			})
			.then((_data) => {
				this.data = _data
				return _data
			})
			.catch((error) => {
				console.error(error)
				this.isError = true
			})
			.finally(() => {
				this.isLoading = false
			})
	}

	return {
		isLoading: false,
		isError: false,
		data: null,
		$_get() {
			return request.call(this)
		},
		$_post(opts) {
			return request.call(this, {
				method: 'POST',
				body: JSON.stringify(opts?.body),
				...opts,
			})
		},
	}
}
