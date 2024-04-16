
export const canvasIframe = document.querySelector('#canvas-frame')

window.canvasIframe = canvasIframe

export function canvasDocument() {
  const iframe = document.querySelector('#canvas-frame')

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
