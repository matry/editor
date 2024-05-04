
export function getCanvasDOM() {
  if (!window.parent) {
    return null
  }

  return window.parent.canvasIframe.contentDocument.querySelector('html').cloneNode(true)

  // return window.parent.canvasIframe.contentDocument.body.cloneNode(true)
}
