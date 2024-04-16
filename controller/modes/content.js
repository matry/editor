import { canvasDocument, canvasWindow } from '../canvas'
import { channel } from '../listener'

const win = canvasWindow()
const doc = canvasDocument()

const content = {
  commands: {
    'Escape': 'exit',
    'Enter': 'exit',
  },

  on_enter({ selections }) {
    const selection = selections[0]

    if (selection.firstChild && selection.firstChild.nodeType === 3) {
      selection.setAttribute('contenteditable', 'true')

      selection.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          channel.post({ action: 'exit_extension', data: {} })
          selection.blur()
        }
      })

      selection.focus()

      const documentSelection = win.getSelection()
      const range = doc.createRange()
      range.selectNodeContents(selection)
      documentSelection.removeAllRanges()
      documentSelection.addRange(range)
    }
  },

  exit({ selections }) {
    selections[0].blur()
    selections[0].removeAttribute('contenteditable')

    return {
      mode: 'select',
    }
  },
}

export default content
