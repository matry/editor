import { canvasIframe } from './canvas'
import { initializeApp } from './init'

canvasIframe.onload = () => {
  initializeApp()
}

canvasIframe.setAttribute('src', 'canvas/index.html')
