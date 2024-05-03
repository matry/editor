import { renderer } from './zoom-renderer'

export function initZoom() {
  const container = document.getElementById('zoom-container')!
  const instance = renderer({
    minScale: .1,
    maxScale: 30,
    element: container.children[0] as HTMLElement,
    scaleSensitivity: 50,
  })

  function onWheel(e: WheelEvent) {
    if (!e.ctrlKey) {
      return
    }

    e.preventDefault()

    instance.zoom({
      deltaScale: Math.sign(e.deltaY) < 0 ? 1 : -1,
      x: e.pageX,
      y: e.pageY,
    })
  }

  function onDblClick() {
    instance.panTo({
      originX: 0,
      originY: 0,
      scale: 1,
    })
  }

  function onMouseMove(e: MouseEvent) {
    if (!e.shiftKey) {
      return
    }

    e.preventDefault()
    instance.panBy({
      originX: e.movementX,
      originY: e.movementY,
    })
  }

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      container.removeEventListener('wheel', onWheel)
      container.removeEventListener('dblclick', onDblClick)
      container.removeEventListener('mousemove', onMouseMove)
    } else {
      container.addEventListener('wheel', onWheel)
      container.addEventListener('dblclick', onDblClick)
      container.addEventListener('mousemove', onMouseMove)
    }
  })
}
