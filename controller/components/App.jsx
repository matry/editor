import { object, string } from 'prop-types'
import CanvasNode from './CanvasNode'
import Extension from './Extension'

const App = ({ currentView, extension, extensionProps, canvasDOM, selections, hasUnsavedChanges, keySequence }) => {
  if (currentView === 'editor') {
    return (
      <div
        className="h-full bg-black relative w-full"
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

  return (
    <div>no view selected, this is an illegal state</div>
  )
}

App.propTypes = {
  currentView: string,
  extension: string,
  extensionProps: object,
}

App.defaultProps = {
  currentView: 'editor',
  extension: '',
  extensionProps: {},
}

export default App
