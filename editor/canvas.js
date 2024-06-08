export const canvasIframe = document.querySelector('#canvas-frame')

export function canvasDocument() {
  const iframe = document.getElementById('canvas-frame')

  if (!iframe.contentDocument) {
    throw new Error('Canvas Iframe not initialized')
  }

  return iframe.contentDocument
}

export function canvasWindow() {
  if (!canvasIframe.contentWindow) {
    throw new Error('Canvas Iframe not initialized')
  }

  return canvasIframe.contentWindow
}

export function canvasStyleSheet(layer = 'base') {
  const style = canvasDocument().querySelector(`[data-style-layer="${layer}"]`)

  if (!style) {
    return null
  }

  return style.sheet
}

export function populateCanvas(file) {
  const doc = canvasDocument()
  doc.write(file.content)
}
