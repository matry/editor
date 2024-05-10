import ReactDOM from 'react-dom/client'
import Help from './Help'
import './index.css'
import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))

reactRoot.render(
  <Help />,
)

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    channel.post({ action: 'exit_extension', data: {} })
  }
})
