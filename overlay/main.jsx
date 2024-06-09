import ReactDOM from 'react-dom/client'
import Overlay from './Overlay'
import { Channel } from '../utils/broadcast-channel'

const reactRoot = ReactDOM.createRoot(document.getElementById('selections'))

function render() {
  reactRoot.render(
    <Overlay />,
  )
}

const channel = new Channel('matry')

channel.listen((e) => {
  const message = e.data

  switch (message.action) {
    case 'canvas_did_render':
      render()
      break
    case 'state_did_change':
      render()
      break
    default:
      break
  }
})
