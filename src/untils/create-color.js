const path = require('path')
const fs = require('fs')

const sassFilePath = path.join(__dirname, '../src/style/var.scss')
const colorsMap = {
  '$light-color-list': {
    'primary': '#2177b4',
    'text-stress': '#ffffff',
    'text-primary': '#333333',
    'text-second': '#666666',
    'text-assist': '#999999'
  },
  '$dark-color-list': {
    'primary': '#2177b4',
    'text-stress': '#ffffff',
    'text-primary': '#333333',
    'text-second': '#666666',
    'text-assist': '#999999'
  }
}

// $theme-key
const themesMap = [
  'light',
  'dark'
]

const globalSassVar = {
  '$header-h': '50px',
  '$footer-h': '200px'
}

let result = ''

const colorsMapArray = Object.entries(colorsMap)

colorsMapArray.forEach((colorObjKV, colorObjIndex) => {
  result += `${colorObjKV[0]}:(`
  const item = Object.entries(colorObjKV[1])
  item.forEach((colorKV, colorIndex) => {
    result += `${colorKV[0]}:${colorKV[1]}${colorIndex + 1 === item.length ? '' : ','}`
  })

  result += ');'
})

result += '$color-obj:('

colorsMapArray.forEach((colorObjKV, colorObjIndex) => {
  result += `${themesMap[colorObjIndex]}:${colorObjKV[0]}${colorObjIndex + 1 === colorsMapArray.length ? '' : ','}`
})

result += ');$theme-key:('

themesMap.forEach((themeKey, index) => {
  result += `${themeKey}${index +1 === themesMap.length ? '' : ','}`
})

result += ');'

Object.entries(globalSassVar).forEach((value, index) => {
  result += `${value[0]}:${value[1]};`
})

fs.writeFile(sassFilePath, result, (err) => {
  if (err) {
    console.log('\x1B[31m%s\x1B[39m', 'scss文件创建失败')
    console.log('\x1B[31m%s\x1B[39m', err.toString())
  } else {
    console.log('\x1B[32m%s\x1B[39m', `scss文件创建成功`)
    console.log('\x1B[32m%s\x1B[39m', sassFilePath)
  }
})
