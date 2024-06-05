import { object, string } from 'prop-types'
import FileView from './FileView'
import WorkspaceView from './WorkspaceView'

const App = ({ currentView, extension, extensionProps, canvasDOM, selections, hasUnsavedChanges }) => {
  let content = null

  if (currentView === 'file') {
    content = (
      <FileView
        canvasDOM={canvasDOM}
        selections={selections}
        extension={extension}
        extensionProps={extensionProps}
      />
    )
  }

  if (currentView === 'workspace') {
    content = (
      <WorkspaceView />
    )
  }

  if (content) {
    return (
      <div className="flex flex-col h-full pb-4">
        <div className="text-neutral-600 text-3xl py-2 px-4 flex select-none flex-grow-0">
          <span title="project" className="px-1 py-2 leading-none cursor-pointer hover:text-white">›</span>
          <span title="file" className={`px-1 py-2 leading-none cursor-pointer ${hasUnsavedChanges ? 'text-[#10CFFF]' : 'text-white'}`}>›</span>
          {/* <span title="style" className="px-1 py-2 leading-none cursor-pointer hover:text-white">›</span> */}
        </div>
        {content}
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
