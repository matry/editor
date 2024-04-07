import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

document.addEventListener('DOMContentLoaded', () => {
  window.baseStyleSheet = new CSSStyleSheet()
  document.adoptedStyleSheets = [window.baseStyleSheet]

  channel.post({
    action: 'canvas_did_load',
    data: {},
  })
})
