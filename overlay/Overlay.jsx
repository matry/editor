import BoxModelOverlay from './BoxModelOverlay'
import OutlineOverlay from './OutlineOverlay'

export default function Overlay() {
  if (!window.parent || !window.parent.state || !window.parent.state.current) {
    return null
  }

  const props = window.parent.state.current

  switch (props.overlay) {
    case 'outline':
      return (
        <OutlineOverlay
          mode={props.mode}
          selections={props.selections}
        />
      )
    case 'box_model':
      return (
        <BoxModelOverlay
          mode={props.mode}
          selections={props.selections}
        />
      )
    default:
      break
  }

  return null
}
