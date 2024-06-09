import { isInBounds, renderOverlay } from './dom'
import { canvasDocument } from './canvas'
import modes from './modes'

window.addEventListener('selections_changed', () => {
  try {
    const state = window.state.current
    renderOverlay(state)

    const lastSelection = state.selections[state.selections.length - 1]
    if (lastSelection && !isInBounds(lastSelection)) {
      state.selections[state.selections.length - 1].scrollIntoView({
        block: 'center',
      })
    }
  } catch (error) {
    console.error(error)
  }
})

window.addEventListener('did_render', () => {
  try {
    renderOverlay(window.state.current)
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
