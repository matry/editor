import { saveAs } from 'file-saver'

export const randomId = (prefix = 'id', postfix = '', length = 8) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

  if (!length) {
    length = Math.floor(Math.random() * chars.length)
  }

  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }

  const pre = prefix ? `${prefix}_` : ''
  const post = postfix ? `_${postfix}` : ''

  return `${pre}${str}${post}`
}

export const randomNumber = (max, min = 100) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export const randomPercent = (min = 0) => `${randomNumber(100, min)}%`

export const randomImage = () => {
  const height = Math.floor(randomNumber(400, 100))
  const width = Math.floor(height * 1.5)

  return {
    url: `https://picsum.photos/${width}/${height}`, // `https://via.placeholder.com/${width}x${height}.png`, // `https://via.placeholder.com/${width}x${height}.png`, // `https://picsum.photos/${width}/${height}`,
    width,
    height,
  }
}

export const randomColor = () => {
  const hexChars = [7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  const hexArr = [0, 0, 0, 0, 0, 0]

  const resultHexArr = hexArr.map(() => {
    const index = Math.floor(Math.random() * hexChars.length)
    return hexChars[index]
  })

  const result = `#${resultHexArr.join('')}`

  return result
}

export const getKeyboardCommand = (e) => {
  const modifiers = []

  if (e.metaKey && e.key !== 'Meta') {
    modifiers.push('cmd')
  }

  if (e.ctrlKey && e.key !== 'Control') {
    modifiers.push('ctrl')
  }

  if (e.altKey && e.key !== 'Alt') {
    modifiers.push('alt')
  }

  if (e.shiftKey && e.key !== 'Shift') {
    modifiers.push('shift')
  }

  modifiers.push(e.code)

  return modifiers.join(' ')
}

export const getSelectionTypes = (selections) => {
  const types = {
    shape: false,
    text: false,
    image: false,
    video: false,
  }

  selections.forEach((selection) => {
    const type = selection.getAttribute('data-type')

    if (types.hasOwnProperty(type)) {
      types[type] = true
    }
  })

  return Object.keys(types).filter((type) => types[type])
}

export const downloadJSONFile = (data = {}, fileName = 'file') => {
  const json = JSON.stringify(data)

  const file = new Blob([json], {
    type: 'application/json',
  })

  saveAs(file, `${fileName}.json`)
}

export const openJSONFile = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.setAttribute('accept', '.json')

  return new Promise((resolve, reject) => {
    input.onchange = () => {
      const [file] = Array.from(input.files)

      if (!file) {
        return
      }

      const reader = new FileReader()

      reader.addEventListener('load', (e) => {
        try {
          const loadedJson = JSON.parse(e.target.result)
          resolve(loadedJson)
        } catch (error) {
          reject(error)
        }
      })

      reader.readAsText(file)
    }

    input.click()
  })
}

export const storeJSONFile = (jsonData) => {
  window.localStorage.setItem('file', JSON.stringify(jsonData))
}

export const retrieveJSONFile = () => window.localStorage.getItem('file')
