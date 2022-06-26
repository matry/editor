
export const randomId = (prefix = 'id', postfix = '', length = 8) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

  if (! length) {
    length = Math.floor(Math.random() * chars.length)
  }

  let str = ''
  for (var i = 0; i < length; i++) {
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

export const randomPercent = (mi = 0) => {
  return `${randomNumber(100, min)}%`
}

export const randomImage = () => {
  const height = Math.floor(randomNumber(400, 100))
  const width = Math.floor(height * 1.5)

  return {
    url: `https://picsum.photos/${width}/${height}`,
    width,
    height,
  }
}

export const randomColor = () => {
  const hexChars = [7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']
  const hexArr = [0, 0, 0, 0, 0, 0]

  const resultHexArr = hexArr.map((char) => {
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
