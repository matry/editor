import { getBox } from 'css-box-model'

export default function BoxModelOverlay(props) {
  return props.selections.map((selection) => {
    const box = getBox(selection)

    return (
      <div
        key={selection.id}
        data-selection={selection.id}
        style={{
          opacity: 0.75,
          pointerEvents: 'none',
        }}
      >
        <div
          data-layer="margin-box"
          style={{
            position: 'fixed',
            top: box.marginBox.top,
            right: box.marginBox.right,
            bottom: box.marginBox.bottom,
            left: box.marginBox.left,
            width: box.marginBox.width,
            height: box.marginBox.height,
            backgroundColor: '#fdb68d', // red
          }}
        />
        <div
          data-layer="border-box"
          style={{
            position: 'fixed',
            top: box.borderBox.top,
            right: box.borderBox.right,
            bottom: box.borderBox.bottom,
            left: box.borderBox.left,
            width: box.borderBox.width,
            height: box.borderBox.height,
            backgroundColor: '#F8CB9C', // orange
          }}
        />
        <div
          data-layer="padding-box"
          style={{
            position: 'fixed',
            top: box.paddingBox.top,
            right: box.paddingBox.right,
            bottom: box.paddingBox.bottom,
            left: box.paddingBox.left,
            width: box.paddingBox.width,
            height: box.paddingBox.height,
            backgroundColor: '#C2DDB6', // green
          }}
        />
        <div
          data-layer="content-box"
          style={{
            position: 'fixed',
            top: box.contentBox.top,
            right: box.contentBox.right,
            bottom: box.contentBox.bottom,
            left: box.contentBox.left,
            width: box.contentBox.width,
            height: box.contentBox.height,
            backgroundColor: '#9FC4E7', // blue
          }}
        />
      </div>
    )
  })
}
