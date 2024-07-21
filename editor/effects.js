import { isInBounds } from './dom'
import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

channel.listen((e) => {
  const state = window.state.current

  switch (e.data.action) {
    case 'selections_changed':
      const lastSelection = state.selections[state.selections.length - 1]
      if (lastSelection) {
        if (!isInBounds(lastSelection)) {
          state.selections[state.selections.length - 1].scrollIntoView({
            block: 'center',
          })
        }

        const editorSelection = document.getElementById(lastSelection.id)
        if (!isInBounds(editorSelection, window)) {
          editorSelection.scrollIntoView({
            block: 'center',
          })
        }
      }

      break
    case 'mode_changed':
      document.body.setAttribute('data-mode', e.data.data)
      window.focus()

      break
    default:
      break
  }
})
