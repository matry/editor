import modes from './modes'
import { isInBounds } from './dom'

window.addEventListener('selections_changed', () => {
  try {
    const { selections } = window.state.current

    const previousSelections = document.querySelectorAll('[data-selected="on"]')
    previousSelections.forEach((selection) => selection.removeAttribute('data-selected'))
  
    selections.forEach((selection) => selection.setAttribute('data-selected', 'on'))
  
    const lastSelection = selections[selections.length - 1]
  
    if (lastSelection && !isInBounds(lastSelection)) {
      selections[selections.length - 1].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  
    if (selections.length === 0) {
      document.body.removeAttribute('data-after')
    } else {
      const firstSelection = `${selections[0].getAttribute('data-type')}#${selections[0].id}`
      const additionalText = selections.length > 1 ? `, and ${selections.length - 1} others` : ''
      document.body.setAttribute('data-after', `${firstSelection}${additionalText}`)
    }
  } catch (error) {
    window.alert(error)
  }
})

window.addEventListener('mode_changed', async () => {
  try {
    const currentState = window.state.current
    const mode = modes[currentState.mode]

    if (!mode) {
      return
    }

    if (typeof mode['on_enter'] === 'function') {
      await mode['on_enter'](currentState)
    }

  } catch (error) {
    window.alert(error)
  }
})
