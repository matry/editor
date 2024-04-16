
export const canvasIframe = document.querySelector('#canvas-frame')

window.canvasIframe = canvasIframe

export function canvasDocument() {
  if (!canvasIframe.contentDocument) {
    throw new Error('Canvas Iframe not initialized')
  }

  return canvasIframe.contentDocument
}

export function canvasWindow() {
  if (!canvasIframe.contentWindow) {
    throw new Error('Canvas Iframe not initialized')
  }

  return canvasIframe.contentWindow
}
