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
