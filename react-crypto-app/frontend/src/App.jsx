import React, { useRef } from 'react'

import { CryptoContextProvider } from './context/crypto-context'
import AppLayout from './components/layout/AppLayout'

const App = () => {
	const input = useRef()
	return (
		<CryptoContextProvider>
			<AppLayout />
		</CryptoContextProvider>
	)
}

export default App
