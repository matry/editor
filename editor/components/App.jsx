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
          className={`absolute top-0 left-0 right-0 h-px ${props.hasUnsavedChanges ? 'bg-[#38d7ff]' : 'bg-neutral-700'}`}
        />

        {content}

        <div
          className="absolute inset-0 bottom-5"
        >
          {Boolean(props.extension) && (
            <Extension {...props} />
          )}
        </div>
      </>
    )
  }

  return null
}

export default App
