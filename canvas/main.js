import { Channel } from '../utils/broadcast-channel'

console.log('RUN CANVAS MAIN')

const channel = new Channel('matry')

document.addEventListener('DOMContentLoaded', () => {
  console.log('DID RECEIVE DOMCONTENTLOADED')
  window.baseStyleSheet = new CSSStyleSheet()
  document.adoptedStyleSheets = [window.baseStyleSheet]

  console.log('POSTING MESSAGE')
  channel.post({
    action: 'canvas_did_load',
    data: {},
  })
})
