import { isInBounds } from './dom'
import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

channel.listen((e) => {
  const state = window.state.current

  if (e.data.action === 'selections_changed') {
    const lastSelection = state.selections[state.selections.length - 1]
    if (lastSelection && !isInBounds(lastSelection)) {
      state.selections[state.selections.length - 1].scrollIntoView({
        block: 'center',
      })
    }
  }

  if (e.data.action === 'mode_changed') {
    document.body.setAttribute('data-mode', e.data.data)
  }
})
