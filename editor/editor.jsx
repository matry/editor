import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { Channel } from '../utils/broadcast-channel'

function getCanvasDOM() {
  try {
    return document.getElementById('canvas-frame').contentDocument.querySelector('html').cloneNode(true)
  } catch (error) {
    // do nothing
    return null
  }
}

const channel = new Channel('matry')
const reactRoot = ReactDOM.createRoot(document.getElementById('editor'))
let canvasDOM = getCanvasDOM()

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
    // case 'append_key':
    //   render()
    //   break
    // case 'execute_key':
    //   render()
    //   break
    // case 'reset_key':
    //   render()
    //   break
    // case 'exit_extension':
    //   render()
    //   break
    case 'state_did_change':
      canvasDOM = getCanvasDOM()
      render(message.data)
      break
    case 'confirm_replace_content':
      render()
      break
    default:
      break
  }
})
