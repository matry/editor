import ReactDOM from 'react-dom/client'
import CSSInput from './CSSInput'
import './index.css'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))

reactRoot.render(
  <CSSInput />,
)

// window.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape') {
//     window.parent.postMessage({ action: 'exit_style_mode' })
//   }
// })
