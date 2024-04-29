import { channel } from '../listener'
import { getParams } from '../../utils/url'
import './index.css'

const textContents = getParams(window.location.search)
const textarea = document.getElementById('textarea')
const values = new Set(Object.values(textContents))
const value = values.size === 1 ? values.values().next().value : ''

textarea.value = value

textarea.focus()
textarea.select()

textarea.oninput = (e) => {
  e.stopPropagation()

  channel.post({
    action: 'update_selection_text',
    data: {
      value: e.target.value,
    },
  })
}

textarea.onblur = () => {
  channel.post({ action: 'exit_extension', data: {} })
}

textarea.onchange = (e) => {
  e.stopPropagation()
}

textarea.onkeydown = (e) => {
  e.stopPropagation()

  if (e.key === 'Escape') {
    channel.post({ action: 'exit_extension', data: {} })
  }
}
