import ReactDOM from 'react-dom/client'
import Help from './Help'
import './index.css'
import { channel } from '../listener'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))

reactRoot.render(
  <Help />,
)

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    channel.post({ action: 'exit_extension', data: {} })
  }
})
