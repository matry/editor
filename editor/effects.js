import { isInBounds } from './dom'
import { Channel } from '../utils/broadcast-channel'
import { handleBlurredKeydown, handleFocusedKeydown } from './handlers'

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

  if (e.data.action === 'active_changed') {
    if (document.body.classList.contains('sidebar-open')) {
      document.body.classList.remove('sidebar-open')
    } else {
      document.body.classList.add('sidebar-open')
    }

    if (state.active) {
      window.removeEventListener('keydown', handleBlurredKeydown)
      window.addEventListener('keydown', handleFocusedKeydown)
    } else {
      window.removeEventListener('keydown', handleFocusedKeydown)
      window.addEventListener('keydown', handleBlurredKeydown)
    }
  }
})
