import { canvasDocument } from "../editor/canvas"
import { Channel } from "../utils/broadcast-channel"

const channel = new Channel('matry')

document.body.addEventListener('click', (e) => {
  const parent = window.parent

  if (!parent) {
    return
  }

  const canvasDoc = canvasDocument(parent.document)
  const element = canvasDoc.elementFromPoint(e.clientX, e.clientY)

  if (element && element.id && !['html', 'body'].includes(element.dataset.type)) {
    channel.post({ action: 'set_selections', data: [element.id] })
  }
  window.parent.focus()
})

// TODO: figure out how on earth we're going to make this play nicely with other features
// const canvasDoc = canvasDocument(window.parent.document)
// document.body.addEventListener('wheel', (e) => {
//   canvasDoc.body.scrollTop += e.deltaY
//   window.parent.focus()
// })
