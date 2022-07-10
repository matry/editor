import ReactDOM from 'react-dom/client'
import { getParams } from '../../utils/url'
import App from './App'
import './index.css'

const reactRoot = ReactDOM.createRoot(document.getElementById('root'))

const styles = getParams(window.location.search)

reactRoot.render(
  <App styles={styles} />,
)
