import { object, string } from 'prop-types'
import FileView from './FileView'
import WorkspaceView from './WorkspaceView'

const App = ({ currentView, extension, extensionProps, canvasDOM, selections, hasUnsavedChanges }) => {
  if (currentView === 'file') {
    return (
      <FileView
        canvasDOM={canvasDOM}
        selections={selections}
        extension={extension}
        extensionProps={extensionProps}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    )
  }

  if (currentView === 'workspace') {
    return (
      <WorkspaceView />
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
