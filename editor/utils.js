import { saveAs } from 'file-saver'
import { canvasDocument } from './canvas'
import { getBox } from 'css-box-model'

export function randomId(prefix = 'id', postfix = '', length = 8) {
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

export function randomNumber(max, min = 100) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function randomPercent(min = 0) {
  return `${randomNumber(100, min)}%`
}

export function randomImage(w, h) {
  const height = Math.floor(h || randomNumber(400, 100))
  const width = Math.floor(w || (height * 1.5))

  return {
    url: `https://picsum.photos/${width}/${height}`, // `https://via.placeholder.com/${width}x${height}.png`, // `https://via.placeholder.com/${width}x${height}.png`, // `https://picsum.photos/${width}/${height}`,
    width,
    height,
  }
}

export function randomColor(preferPastel = true) {
  const h = randomNumber(360, 0)
  const s = preferPastel ? randomNumber(100, 70) : randomNumber(60, 20)
  const l = preferPastel ? randomNumber(100, 70) : randomNumber(30, 10)

  return `hsl(${h}deg, ${s}%, ${l}%)`
}

export function getKeyboardCommand(e) {
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

export function getSelectionTypes(selections) {
  const types = {
    shape: false,
    text: false,
    image: false,
  }

  selections.forEach((selection) => {
    const type = selection.getAttribute('data-type')

    if (types.hasOwnProperty(type)) {
      types[type] = true
    }
  })

  return Object.keys(types).filter((type) => types[type])
}

export function downloadJSONFile(data = {}, fileName = 'file') {
  const json = JSON.stringify(data)

  const file = new Blob([json], {
    type: 'application/json',
  })

  saveAs(file, `${fileName}.json`)
}

export function downloadHTMLFile(data = '', fileName = 'file') {
  const file = new Blob([data], {
    type: 'application/html',
  })

  saveAs(file, `${fileName}.html`)
}

export function openJSONFile() {
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

export function clearStorage() {
  window.localStorage.clear()
}

export function readBlobs(blobs) {
  const blobsArray = Array.isArray(blobs) ? blobs : Array.from(blobs)
  const count = blobsArray.length
  const results = []

  const reader = new FileReader()

  return new Promise((resolve) => {
    reader.onload = (event) => {
      results.push(event.target.result)

      if (results.length === count) {
        resolve(results)
      }
    }

    blobsArray.forEach((blob) => {
      reader.readAsDataURL(blob)
    })
  })
}

export function renderBoxModel({ showBoxModel, selections }) {
  const doc = canvasDocument()

  if (!showBoxModel) {
    const dataSelections = doc.querySelectorAll('[data-selection]')
    dataSelections.forEach((dataSelection) => {
      dataSelection.remove()
    })

    return
  }

  selections.forEach((selection) => {
    const box = getBox(selection)

    const highlighter = doc.createElement('div')
    highlighter.setAttribute('data-selection', selection.id)
    highlighter.style.opacity = 0.75
    highlighter.style.pointerEvents = 'none'

    const marginBox = doc.createElement('div')
    marginBox.style.position = 'fixed'
    marginBox.style.top = box.marginBox.top
    marginBox.style.right = box.marginBox.right
    marginBox.style.bottom = box.marginBox.bottom
    marginBox.style.left = box.marginBox.left
    marginBox.style.width = box.marginBox.width
    marginBox.style.height = box.marginBox.height
    marginBox.style.backgroundColor = '#fdb68d' // red

    const borderBox = doc.createElement('div')
    borderBox.style.position = 'fixed'
    borderBox.style.top = box.borderBox.top
    borderBox.style.right = box.borderBox.right
    borderBox.style.bottom = box.borderBox.bottom
    borderBox.style.left = box.borderBox.left
    borderBox.style.width = box.borderBox.width
    borderBox.style.height = box.borderBox.height
    borderBox.style.backgroundColor = '#F8CB9C' // orange

    const paddingBox = doc.createElement('div')
    paddingBox.style.position = 'fixed'
    paddingBox.style.top = box.paddingBox.top
    paddingBox.style.right = box.paddingBox.right
    paddingBox.style.bottom = box.paddingBox.bottom
    paddingBox.style.left = box.paddingBox.left
    paddingBox.style.width = box.paddingBox.width
    paddingBox.style.height = box.paddingBox.height
    paddingBox.style.backgroundColor = '#C2DDB6' // green

    const contentBox = doc.createElement('div')
    contentBox.style.position = 'fixed'
    contentBox.style.top = box.contentBox.top
    contentBox.style.right = box.contentBox.right
    contentBox.style.bottom = box.contentBox.bottom
    contentBox.style.left = box.contentBox.left
    contentBox.style.width = box.contentBox.width
    contentBox.style.height = box.contentBox.height
    contentBox.style.backgroundColor = '#9FC4E7' // blue

    highlighter.appendChild(marginBox)
    highlighter.appendChild(borderBox)
    highlighter.appendChild(paddingBox)
    highlighter.appendChild(contentBox)

    const existingHighlighter = doc.querySelector(`[data-selection="${selection.id}"]`)

    if (existingHighlighter) {
      existingHighlighter.remove()
    }

    doc.body.appendChild(highlighter)

    selection.setAttribute('data-selected', 'on')
  })
}

export function selectionGuard(selections) {
  const existingIds = []

  const result = selections.filter((selection) => {
    if (!selection) {
      return false
    }

    if (existingIds.includes(selection.id)) {
      return false
    } else {
      existingIds.push(selection.id)
    }

    if (!selection) {
      return false
    }

    if (typeof selection.hasAttribute === 'function' && selection.hasAttribute('data-type')) {
      return true
    }

    return false
  })

  if (result.length === 0) {
    return [canvasDocument().body]
  }

  return result
}
