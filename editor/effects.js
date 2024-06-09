import { isInBounds } from './dom'
import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

channel.listen((e) => {
  if (e.data.action === 'selections_changed') {
    const state = window.state.current

    const lastSelection = state.selections[state.selections.length - 1]
    if (lastSelection && !isInBounds(lastSelection)) {
      state.selections[state.selections.length - 1].scrollIntoView({
        block: 'center',
      })
    }
  }
})
