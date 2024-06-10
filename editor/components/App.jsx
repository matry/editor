import { object, string } from 'prop-types'
import FileView from './FileView'
import WorkspaceView from './WorkspaceView'
import ProjectView from './ProjectView'
import Extension from './Extension'

const App = (props) => {
  let content = null
  let extensionContent = null

  switch (props.mode) {
    case 'workspace':
      content = (
        <WorkspaceView />
      )
      break
    case 'project':
      content = (
        <ProjectView
          {...props}
        />
      )
      break
    default:
      content = (
        <FileView
          {...props}
        />
      )
      break
  }

  switch (props.extension) {
    case 'css':
      extensionContent = (
        <Extension
          {...props}
        />
      )
      break
    case 'image':
      extensionContent = (
        <Extension
          {...props}
        />
      )
      break
    case 'quick':
      extensionContent = (
        <Extension
          {...props}
        />
      )
      break
    default:
      break
  }

  if (content) {
    return (
      <div className="flex flex-col h-full pb-4 relative">
        <div className="text-neutral-600 text-3xl py-2 px-4 flex select-none flex-grow-0">
          <span title="project" className="px-1 py-2 leading-none cursor-pointer hover:text-white">›</span>
          <span title="file" className={`px-1 py-2 leading-none cursor-pointer ${props.hasUnsavedChanges ? 'text-[#10CFFF]' : 'text-white'}`}>›</span>
          {/* <span title="style" className="px-1 py-2 leading-none cursor-pointer hover:text-white">›</span> */}
        </div>
        {content}
        <div
          className="absolute inset-0 bottom-5"
        >
          {extensionContent}
        </div>
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
