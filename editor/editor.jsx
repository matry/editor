import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import { Channel } from '../utils/broadcast-channel'

function getCanvasDOM() {
  try {
    const html = document.getElementById('canvas-frame').contentDocument.querySelector('html').cloneNode(true)
    return html
  } catch (error) {
    // do nothing
    return null
  }
}

const channel = new Channel('matry')

const appState = {
  currentView: 'file',
  extension: '',
  extensionProps: {},
  canvasDOM: null,
  selections: [],
  keySequence: [],
  hasUnsavedChanges: false,
}

const reactRoot = ReactDOM.createRoot(document.getElementById('editor'))
const render = () => {
  reactRoot.render(
    <React.StrictMode>
      <App
        currentView={appState.currentView}
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
      appState.canvasDOM = getCanvasDOM()
      render()
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
