import FileView from './FileView'
import WorkspaceView from './WorkspaceView'
import ProjectView from './ProjectView'
import Extension from './Extension'

const App = (props) => {
  let content = null
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

  if (content) {
    return (
      <>
        <div
          className={`absolute top-0 left-0 right-0 h-px ${props.hasUnsavedChanges ? 'bg-[#2acff9]' : 'bg-neutral-700'}`}
        />

        {content}

        {Boolean(props.extension) && (
          <div className="absolute top-px left-0 right-0 bottom-0">
            <Extension
              extension={props.extension}
              extensionProps={props.extensionProps}
            />
          </div>
        )}
      </>
    )
  }

  return null
}

export default App
