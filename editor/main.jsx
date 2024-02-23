import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import { Channel } from '../utils/broadcast-channel'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))
const render = ({ extension, extensionProps }) => {
  reactRoot.render(
    <React.StrictMode>
      <App extension={extension} extensionProps={extensionProps} />
    </React.StrictMode>,
  )
}

const channel = new Channel('matry')

channel.listen((e) => {
  const message = e.data

  switch (message.action) {
    case 'canvas_did_load':
      // document.getElementById('canvas').contentWindow.focus()
      break
    case 'request_extension':
      render({ extension: message.data.id, extensionProps: message.data.params || {} })
      break
    case 'exit_extension':
      render({})
      // document.getElementById('canvas').contentWindow.focus()
      break
    default:
      // in theory this should no longer be needed since the application root is not the coordinator
      // channel.post(message)
      break
  }
})

render('')
