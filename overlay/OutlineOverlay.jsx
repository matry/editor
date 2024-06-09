import { getBox } from 'css-box-model'

export default function OutlineOverlay(props) {

  return props.selections.map((selection) => {
    if (selection.dataset.type === 'body') {
      return null
    }

    const box = getBox(selection)
    const color = props.mode === 'append' ? 'orange' : 'blue'

    return (
      <div
        key={selection.id}
        data-selection={selection.id}
        style={{
          outline: `2px solid ${color}`,
          outlineOffset: '-1px',
          position: 'fixed',
          top: box.borderBox.top,
          right: box.borderBox.right,
          bottom: box.borderBox.bottom,
          left: box.borderBox.left,
          width: box.borderBox.width,
          height: box.borderBox.height,
        }}
      />
    )
  })
}
