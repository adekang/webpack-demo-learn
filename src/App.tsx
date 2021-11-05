import React from 'react'
// import Header from '@/components/header'
const aSvg = require('./assets/images/sea.Svg')
import './assets/styles/global.scss'

function App() {
	return (
		<div>
			{/* <Header /> */}
			<img src={aSvg} alt='' />
			<h1>hello</h1>
		</div>
	)
}

export default App
