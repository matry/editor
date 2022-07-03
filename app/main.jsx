import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))
const render = ({ extension, extensionProps }) => {
  reactRoot.render(
    <React.StrictMode>
      <App extension={extension} extensionProps={extensionProps} />
    </React.StrictMode>,
  )
}

window.addEventListener('message', (e) => {
  const message = e.data

  if (!message.action) {
    return
  }

  switch (message.action) {
    case 'request_extension':
      render({ extension: message.data.id, params: message.data.params || {} })
      break
    case 'exit_extension':
      render('')
      document.getElementById('canvas').contentWindow.focus()
      break
    default:
      document.getElementById('canvas').contentWindow.postMessage(message)
      break
  }
})

render('')
