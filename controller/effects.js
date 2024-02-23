import { getBox } from 'css-box-model'
import modes from './modes'
import { isInBounds } from './dom'
import { canvasDocument } from './canvas'

window.addEventListener('selections_changed', () => {
  const doc = canvasDocument()

  try {
    const { selections } = window.state.current

    const previousSelections = doc.querySelectorAll('[data-selected="on"]')

    previousSelections.forEach((selection) => selection.removeAttribute('data-selected'))

    // previousSelections.forEach((selection) => {
    //   selection.removeAttribute('data-selected')
    //   const sel = document.querySelector(`[data-selection="${selection.id}"]`)
    //   if (sel) {
    //     sel.remove()
    //   }
    // })

    console.log(selections)

    selections.forEach((selection) => selection.setAttribute('data-selected', 'on'))

    // selections.forEach((selection) => {
    //   const box = getBox(selection)

    //   const highlighter = document.createElement('div')
    //   highlighter.setAttribute('data-selection', selection.id)
    //   highlighter.style.opacity = 0.75
    //   highlighter.style.pointerEvents = 'none'

    //   const marginBox = document.createElement('div')
    //   marginBox.style.position = 'fixed'
    //   marginBox.style.top = box.marginBox.top
    //   marginBox.style.right = box.marginBox.right
    //   marginBox.style.bottom = box.marginBox.bottom
    //   marginBox.style.left = box.marginBox.left
    //   marginBox.style.width = box.marginBox.width
    //   marginBox.style.height = box.marginBox.height
    //   marginBox.style.backgroundColor = '#fdb68d' // red

    //   const borderBox = document.createElement('div')
    //   borderBox.style.position = 'fixed'
    //   borderBox.style.top = box.borderBox.top
    //   borderBox.style.right = box.borderBox.right
    //   borderBox.style.bottom = box.borderBox.bottom
    //   borderBox.style.left = box.borderBox.left
    //   borderBox.style.width = box.borderBox.width
    //   borderBox.style.height = box.borderBox.height
    //   borderBox.style.backgroundColor = '#F8CB9C' // orange

    //   const paddingBox = document.createElement('div')
    //   paddingBox.style.position = 'fixed'
    //   paddingBox.style.top = box.paddingBox.top
    //   paddingBox.style.right = box.paddingBox.right
    //   paddingBox.style.bottom = box.paddingBox.bottom
    //   paddingBox.style.left = box.paddingBox.left
    //   paddingBox.style.width = box.paddingBox.width
    //   paddingBox.style.height = box.paddingBox.height
    //   paddingBox.style.backgroundColor = '#C2DDB6' // green

    //   const contentBox = document.createElement('div')
    //   contentBox.style.position = 'fixed'
    //   contentBox.style.top = box.contentBox.top
    //   contentBox.style.right = box.contentBox.right
    //   contentBox.style.bottom = box.contentBox.bottom
    //   contentBox.style.left = box.contentBox.left
    //   contentBox.style.width = box.contentBox.width
    //   contentBox.style.height = box.contentBox.height
    //   contentBox.style.backgroundColor = '#9FC4E7' // blue

    //   highlighter.appendChild(marginBox)
    //   highlighter.appendChild(borderBox)
    //   highlighter.appendChild(paddingBox)
    //   highlighter.appendChild(contentBox)

    //   document.body.appendChild(highlighter)

    //   selection.setAttribute('data-selected', 'on')
    // })

    const lastSelection = selections[selections.length - 1]
    if (lastSelection && !isInBounds(lastSelection)) {
      selections[selections.length - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  } catch (error) {
    window.alert(error)
  }
})

window.addEventListener('mode_changed', async () => {
  const doc = canvasDocument()

  try {
    const currentState = window.state.current
    const mode = modes[currentState.mode]

    if (!mode) {
      return
    }

    if (typeof mode['on_enter'] === 'function') {
      await mode['on_enter'](currentState)
    }

    doc.body.setAttribute('data-mode', currentState.mode)
  } catch (error) {
    window.alert(error)
  }
})
