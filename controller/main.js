import { Channel } from '../utils/broadcast-channel'
import { canvasIframe } from './canvas'
import { initializeApp } from './init'
import './store'
import './index.css'

const channel = new Channel('matry')

channel.listen((e) => {
  if (e.data.action === 'canvas_did_load') {
    initializeApp()
  }
})

// this is done so that we can guarantee to receive the onload event. If the src is defined in the html, it introduces a race condition.
canvasIframe.setAttribute('src', 'canvas/index.html')
