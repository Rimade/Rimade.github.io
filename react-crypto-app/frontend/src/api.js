import { cryptoAssets, cryptoData } from './data'

export function fakeFetchCrypto() {
	return new Promise((resolve) => {
		resolve(cryptoData)
	})
}

export function fetchAssets() {
	return new Promise((resolve) => {
		resolve(cryptoAssets)
	})
}
