import CanvasNode from './CanvasNode'
import Extension from './Extension'

export default function FileView(props) {
  return (
    <div
      className="h-full bg-black relative w-full"
    >
      {props.canvasDOM !== null && (
        <>
          <div
            className="w-full h-full absolute inset-0 overflow-x-hidden"
          >
            <CanvasNode
              canvasDOM={props.canvasDOM}
              selections={props.selections}
            />
          </div>
        </>
      )}

      <Extension
        extension={props.extension}
        extensionProps={props.extensionProps}
      />
    </div>
  )
}
