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
  keySequence: [],
  hasUnsavedChanges: false,
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
        keySequence={appState.keySequence}
        hasUnsavedChanges={appState.hasUnsavedChanges}
      />
    </React.StrictMode>,
  )
}

const channel = new Channel('matry')

channel.listen((e) => {
  const message = e.data

  switch (message.action) {
    case 'append_key':
      appState.keySequence.push(message.data)
      render()
      break
    case 'execute_key':
      appState.keySequence = []
      render()
      break
    case 'reset_key':
      appState.keySequence = []
      render()
      break
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
      break
    case 'state_did_change':
      appState.hasUnsavedChanges = message.data.hasUnsavedChanges
      appState.selections = message.data.selections
      appState.canvasDOM = getCanvasDOM()
      render()
      break
    case 'confirm_replace_content':
      appState.extension = ''
      appState.extensionProps = {}
      render()
      break
    default:
      break
  }
})

render('')
