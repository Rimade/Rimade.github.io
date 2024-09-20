const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		'X-API-KEY': 'Ihn8JuJ5l6HqE5ztMEs1X5KM6Et9Q0tlzhB4XU9JtAw=',
	},
}

export const cryptoData = fetch(
	'https://openapiv1.coinstats.app/coins',
	options
)
	.then((response) => response.json())
	.then((response) => response)
	.catch((err) => console.warn(err))

export const cryptoAssets = []
