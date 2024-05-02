import { object, string } from 'prop-types'
import CanvasNode from './CanvasNode'

const App = ({ extension, extensionProps, canvasDOM, selections, keySequence }) => {
  const queryParams = Object.keys(extensionProps)
    .map((k) => `${k}=${encodeURIComponent(extensionProps[k])}`)
    .join('&')

  let url = `/extensions/${extension}/index.html`
  if (queryParams) {
    url = `${url}?${queryParams}`
  }

  return (
    <div
      className="h-full bg-gray-900 relative w-full"
    >
      {canvasDOM !== null && (
        <>
          <div
            className="w-full h-full absolute inset-0"
          >
            <CanvasNode
              canvasDOM={canvasDOM}
              selections={selections}
            />
          </div>
        </>
      )}

      {extension !== '' && (
        <div className="w-full h-screen z-10 bg-gray-900 relative">
          <iframe
            key={extension}
            title={extension}
            id={extension}
            src={url}
            className="w-full h-full"
          />
        </div>
      )}
    </div>
  )
}

App.propTypes = {
  extension: string,
  extensionProps: object,
}

App.defaultProps = {
  extension: '',
  extensionProps: {},
}

export default App
