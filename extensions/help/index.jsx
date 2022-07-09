import ReactDOM from 'react-dom/client'
import Help from './Help'
import './index.css'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))

reactRoot.render(
  <Help />,
)

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    window.parent.postMessage({ action: 'exit_extension', data: {} })
  }
})
