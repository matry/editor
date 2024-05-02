import ReactDOM from 'react-dom/client'
import ImageInput from './ImageInput'
import './index.css'
import { getParams } from '../../utils/url'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))

const params = getParams(window.location.search)

reactRoot.render(
  <ImageInput />,
)
