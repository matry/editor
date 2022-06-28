import modes from './modes'
import { State } from './state'
import './effects'
import { initStyle } from './cssom'

window.state = new State({
  mode: 'select',
  selections: [],
  copiedIds: [],
  cutIds: [],
  appendingElementType: null,
  clipboardText: '',
  stylesheet: initStyle(),
}, (newState, update) => {
  Object.keys(update).forEach((updateKey) => {
    window.dispatchEvent(new CustomEvent(`${updateKey}_changed`))
  })
})

window.addEventListener('message', ({ data }) => {
  if (!data.action) {
    return
  }

  switch (data.action) {
    case 'update_selection_styles':
      modes['select']['update_selection_style'](window.state.current, data.data.property, data.data.value)
      break
    default:
      break
  }
})

window.addEventListener('keydown', async (e) => {
  const {
    metaKey, shiftKey, ctrlKey, altKey, code,
  } = e

  const keyboardShortcut = [
    metaKey ? 'meta' : '',
    ctrlKey ? 'ctrl' : '',
    altKey ? 'alt' : '',
    shiftKey ? 'shift' : '',
    code,
  ].filter((key) => key !== '').join(' ').trim()

  // console.log(`shortcut: ${keyboardShortcut}`)

  const mode = modes[window.state.current.mode]

  if (!mode) {
    return
  }

  const action = mode.commands[keyboardShortcut]

  if (typeof mode[action] !== 'function') {
    return
  }

  e.preventDefault()

  try {
    const currentState = window.state.current
    const newState = await mode[action](currentState, e)
    if (newState) {
      window.state.current = newState
    }
  } catch (error) {
    console.error(error)
    window.alert(error)
  }
})

document.body.addEventListener('click', (e) => {
  e.preventDefault()
  e.stopPropagation()

  const { target } = e

  if (!target.id) {
    return
  }

  const mode = modes[window.state.current.mode]

  if (!mode) {
    return
  }

  const {
    metaKey, shiftKey, ctrlKey, altKey,
  } = e

  const mouseCommand = [
    metaKey ? 'meta' : '',
    ctrlKey ? 'ctrl' : '',
    altKey ? 'alt' : '',
    shiftKey ? 'shift' : '',
    'onclick',
  ].filter((key) => key !== '').join(' ').trim()

  // console.log(`mouse: ${mouseCommand}`)

  const action = mode.commands[mouseCommand]

  if (typeof mode[action] !== 'function') {
    return
  }

  try {
    const newState = mode[action](window.state.current, e)
    if (newState) {
      window.state.current = newState
    }
  } catch (error) {
    window.alert(error)
  }
})
