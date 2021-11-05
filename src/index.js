console.log('ok')
const boat = require('./assets/images/boat.png')
const sea = require('./assets/images/sea.svg')

const root = document.getElementById('root')

import './assets/styles/reset.scss'
import './assets/styles/global.scss'
// 插入一张图片
const img = new Image()
img.src = boat // 图片模块 dog1 作为 img 变量的 src 属性值
img.width = 200
root.append(img)

const get = () => {
	console.log('get')
}

get()

const a = 'adekang '

const b = `sdbhgcyh${a}`
console.log(b)

import { add } from './components/header'
console.log(add(1, 2))
