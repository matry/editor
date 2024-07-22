import CanvasNode from './CanvasNode'

export default function FileView(props) {
  if (!props.canvasDOM) {
    return null
  }

  return (
    <CanvasNode
      canvasDOM={props.canvasDOM}
      selections={props.selections}
    />
  )
}
