import { isInBounds } from './dom'
import { canvasDocument } from './canvas'
import modes from './modes'

window.addEventListener('selections_changed', () => {
  const doc = canvasDocument()

  try {
    const { selections } = window.state.current

    const previousSelections = doc.querySelectorAll('[data-selected="on"]')
    previousSelections.forEach((selection) => selection.removeAttribute('data-selected'))
    previousSelections.forEach((selection) => {
      selection.removeAttribute('data-selected')
      const sel = doc.querySelector(`[data-selection="${selection.id}"]`)
      if (sel) {
        sel.remove()
      }
    })

    selections.forEach((selection) => selection.setAttribute('data-selected', 'on'))

    const lastSelection = selections[selections.length - 1]
    if (lastSelection && !isInBounds(lastSelection)) {
      selections[selections.length - 1].scrollIntoView({
        block: 'center',
      })
    }
  } catch (error) {
    console.error(error)
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

    if (typeof mode.on_enter === 'function') {
      await mode.on_enter(currentState)
    }

    doc.body.setAttribute('data-mode', currentState.mode)
  } catch (error) {
    console.error(error)
  }
})
