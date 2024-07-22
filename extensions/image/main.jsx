import ReactDOM from 'react-dom/client'
import ImageSearch from './ImageSearch'
import './main.css'

// window.addEventListener('keydown', (e) => {
//   e.stopPropagation()
// })

ReactDOM.createRoot(document.getElementById('image-search')).render(
  <ImageSearch />,
)
