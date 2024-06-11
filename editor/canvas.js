
export function canvasDocument(doc = null) {
  const iframe = (doc || document).getElementById('canvas-frame')

  if (!iframe.contentDocument) {
    throw new Error('Canvas Iframe not initialized')
  }

  return iframe.contentDocument
}

export function canvasWindow(doc = null) {
  const frame = (doc || document).getElementById('canvas-frame')

  if (!frame || !frame.contentWindow) {
    throw new Error('Canvas Iframe not initialized')
  }

  return frame.contentWindow
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

export function cloneCanvas(doc = null) {
  try {
    return (doc || document).getElementById('canvas-frame').contentDocument.querySelector('html').cloneNode(true)
  } catch (error) {
    // do nothing
    return null
  }
}
