import { canvasIframe } from './canvas'
import { initializeApp } from './init'

canvasIframe.onload = () => {
  initializeApp()
}

// this is done so that we can guarantee to receive the onload event. If the src is defined in the html, it introduces a race condition.
canvasIframe.setAttribute('src', 'canvas/index.html')
