import ReactDOM from 'react-dom/client'
import ImageSearch from './ImageSearch'
import './index.css'

window.addEventListener('keydown', (e) => {
  e.stopPropagation()
})

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))

reactRoot.render(
  <ImageSearch />,
)
