import CanvasNode from './CanvasNode'
import Extension from './Extension'

export default function FileView({ canvasDOM, selections, extension, extensionProps, hasUnsavedChanges }) {
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
