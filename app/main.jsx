import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './model'
// import unsaved from './unsaved.png'
// import originalFavicon from './favicon.svg'
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
    case 'canvas_did_load':
      document.getElementById('canvas').contentWindow.focus()
      break
    case 'request_extension':
      render({ extension: message.data.id, extensionProps: message.data.params || {} })
      break
    case 'exit_extension':
      render('')
      document.getElementById('canvas').contentWindow.focus()
      break
    // This was annoying so removing until I find a less-annoying solution
    // case 'did_save_state':
    //   document.getElementById('favicon').setAttribute('href', originalFavicon)
    //   break
    // case 'state_did_change':
    //   document.getElementById('favicon').setAttribute('href', unsaved)
    //   break
    default:
      document.getElementById('canvas').contentWindow.postMessage(message)
      break
  }
})

render('')
