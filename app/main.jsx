import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))
const render = (mode) => {
  reactRoot.render(
    <React.StrictMode>
      <App mode={mode} />
    </React.StrictMode>,
  )
}

window.addEventListener('message', ({ data }) => {
  if (!data.action) {
    return
  }

  switch (data.action) {
    case 'enter_style_mode':
      render('style')
      break
    default:
      break
  }
})

window.addEventListener('exit_style_mode', () => {
  render('')

  document.getElementById('canvas').contentWindow.focus()
})

render('')
