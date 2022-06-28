import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))
const render = (extension) => {
  reactRoot.render(
    <React.StrictMode>
      <App extension={extension} />
    </React.StrictMode>,
  )
}

window.addEventListener('message', ({ data }) => {
  if (!data.action) {
    return
  }

  if (data.action.startsWith('request_extension')) {
    render('css')
    return
  }

  switch (data.action) {
    case 'exit_extension':
      render('')
      document.getElementById('canvas').contentWindow.focus()
      break
    default:
      document.getElementById('canvas').contentWindow.postMessage(data)
      break
  }
})

render('')
