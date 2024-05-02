import { renderer } from './zoom-renderer'

export function initZoom() {
  const container = document.getElementById('zoom-container')!
  const instance = renderer({
    minScale: .1,
    maxScale: 30,
    element: container.children[0] as HTMLElement,
    scaleSensitivity: 50,
  })

  container.addEventListener('wheel', (e) => {
    if (!e.ctrlKey) {
      return
    }

    e.preventDefault()

    instance.zoom({
      deltaScale: Math.sign(e.deltaY) < 0 ? 1 : -1,
      x: e.pageX,
      y: e.pageY,
    })
  })

  container.addEventListener('dblclick', () => {
    instance.panTo({
      originX: 0,
      originY: 0,
      scale: 1,
    })
  })

  container.addEventListener('mousemove', (e) => {
    if (!e.shiftKey) {
      return
    }

    e.preventDefault()
    instance.panBy({
      originX: e.movementX,
      originY: e.movementY,
    })
  })
}
