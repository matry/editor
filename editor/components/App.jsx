import { object, string } from 'prop-types'
import CanvasNode from './CanvasNode'

const App = ({ extension, extensionProps, canvasDOM, selections, hasUnsavedChanges, keySequence }) => {
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

      {!!hasUnsavedChanges && (
        <div
          className="absolute w-2 h-2 rounded-full bg-blue-500 top-2 right-2 origin-top-right"
        />
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
