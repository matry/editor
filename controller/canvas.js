
export const canvasIframe = document.querySelector('#canvas')

export function canvasDocument() {
  return canvasIframe.contentDocument || canvasIframe.contentWindow.document
}

export function canvasWindow() {
  return canvasIframe.contentWindow
}
