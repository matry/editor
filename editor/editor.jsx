import React from 'react'
import ReactDOM from 'react-dom/client'
import { Channel } from '../utils/broadcast-channel'
import App from './components/App'
import { cloneCanvas } from './canvas'

const channel = new Channel('matry')
const reactRoot = ReactDOM.createRoot(document.getElementById('editor'))
let canvasDOM = cloneCanvas()

function render(editorState) {
  if (!editorState) {
    return
  }

  reactRoot.render(
    <React.StrictMode>
      <App
        {...editorState}
        canvasDOM={canvasDOM}
      />
    </React.StrictMode>,
  )
}

channel.listen((e) => {
  const message = e.data

  switch (message.action) {
    case 'state_did_change':
      canvasDOM = cloneCanvas()
      render(message.data)
      break
    case 'confirm_replace_content':
      render()
      break
    default:
      break
  }
})
