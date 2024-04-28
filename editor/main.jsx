import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import { Channel } from '../utils/broadcast-channel'
import { getCanvasDOM } from './dom-listener'

const appState = {
  extension: '',
  extensionProps: {},
  canvasDOM: null,
  selections: [],
}

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))
const render = () => {
  reactRoot.render(
    <React.StrictMode>
      <App
        extension={appState.extension}
        extensionProps={appState.extensionProps}
        canvasDOM={appState.canvasDOM}
        selections={appState.selections}
      />
    </React.StrictMode>,
  )
}

const channel = new Channel('matry')

channel.listen((e) => {
  const message = e.data

  switch (message.action) {
    case 'canvas_did_load':
      
      break
    case 'request_extension':
      appState.extension = message.data.id
      appState.extensionProps =  message.data.params || {}
      render()
      break
    case 'exit_extension':
      appState.extension = ''
      appState.extensionProps = {}
      render()
      // document.getElementById('canvas').contentWindow.focus()
      break
    case 'state_did_change':
      appState.selections = message.data.selections
      appState.canvasDOM = getCanvasDOM()
      render()
      break
    default:
      // in theory this should no longer be needed since the application root is not the coordinator
      // channel.post(message)
      break
  }
})

render('')
