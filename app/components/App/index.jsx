import { string } from 'prop-types'
import CSSInput from '../CSSInput'

const App = ({ mode }) => (
  <div className="h-screen w-screen overflow-hidden">
    <iframe
      title="canvas"
      id="canvas"
      src="canvas/index.html"
      className="w-screen h-screen"
    />
    {mode === 'style' && (
    <CSSInput />
    )}
    {/* <iframe
        src="extensions/css/index.html"
        className="absolute top-0 left-0"
      /> */}
  </div>
)

App.propTypes = {
  mode: string.isRequired,
}

export default App
