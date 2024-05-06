import { object, string } from 'prop-types'
import CanvasNode from './CanvasNode'
import Extension from './Extension'

const App = ({ extension, extensionProps, canvasDOM, selections, hasUnsavedChanges, keySequence }) => {
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

      <Extension
        extension={extension}
        extensionProps={extensionProps}
      />

      <div
        className={`absolute top-0 left-0 triangle ${hasUnsavedChanges ? 'active' : ''}`}
      />
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
