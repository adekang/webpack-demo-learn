import React from 'react'
import Header from '@/components/header'
const aSvg = require('@/assets/images/sea.Svg')
import '@/assets/styles/global.scss'

function App() {
  return (
    <div>
      <Header />
      <hr />
      <img src={aSvg} alt='' />
      <hr />
      <h1>App</h1>
    </div>
  )
}

export default App
