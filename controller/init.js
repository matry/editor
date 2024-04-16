import modes from './modes'
import './effects'
import { State } from './state'
import { loadJSONFile, readBlobs, retrieveJSONFile, randomId } from './utils'
import { canvasDocument } from './canvas'
import { channel } from './listener'

export function initializeApp() {
  const doc = canvasDocument()

  doc.body.id = randomId()

  window.state = new State({
    mode: 'select',
    selections: [],
    copiedIds: [],
    cutIds: [],
    appendingElementType: null,
    clipboardText: '',
    clipboardSelection: null,
    clipboardFiles: null,
    stylesheet: doc.adoptedStyleSheets[0],
  }, (newState, update) => {
    Object.keys(update).forEach((updateKey) => {
      window.dispatchEvent(new CustomEvent(`${updateKey}_changed`))
    })

    channel.post({
      action: 'state_did_change',
      data: {
        mode: newState.mode,
        selections: newState.selections.map((selection) => selection.id),
        copiedIds: newState.copiedIds,
        cutIds: newState.cutIds,
        appendingElementType: newState.appendingElementType,
        clipboardText: newState.clipboardText,
        clipboardSelection: newState.clipboardSelection,
        clipboardFiles: newState.clipboardFiles,
      },
    })
  })

  window.addEventListener('paste', async (e) => {
    const { selections } = window.state.current

    const file = e.clipboardData.files[0]
    const item = e.clipboardData.items[0]

    if (file) {
      const clipboardFiles = await readBlobs(e.clipboardData.files)

      if (clipboardFiles.length) {
        const imageSelections = selections.filter((selection) => selection.getAttribute('data-type') === 'image')

        if (imageSelections.length === selections.length) {
          selections.forEach((selection, i) => {
            selection.src = clipboardFiles[i] || clipboardFiles[clipboardFiles.length - 1]
          })
        } else {
          window.state.current = {
            mode: 'append',
            appendingElementType: 'image',
            clipboardFiles,
          }
        }
      }
    } else if (item && item.type.startsWith('text')) {
      const clipboardText = e.clipboardData.getData('text')

      try {
        const { htmlContent, cssRules } = JSON.parse(clipboardText)

        window.state.current = {
          mode: 'append',
          clipboardSelection: clipboardText,
        }

      } catch (error) {
        const textSelections = selections.filter((selection) => selection.getAttribute('data-type') === 'text')

        if (textSelections.length === selections.length) {
          selections.forEach((selection) => {
            selection.innerHTML = clipboardText
          })
        } else {
          window.state.current = {
            mode: 'append',
            appendingElementType: 'text',
            clipboardText,
          }
        }
      }
    }
  })

  channel.listen((e) => {
    const message = e.data
  
    switch (message.action) {
      case 'update_selection_styles':
        modes['select']['update_selection_style'](window.state.current, message.data.property, message.data.value, message.data.styles)
        break
      case 'confirm_replace_content':
        modes['select']['confirm_replace_content'](window.state.current, message.data)
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
    ].filter((k) => k !== '').join(' ').trim()

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

  const jsonFile = retrieveJSONFile()

  if (jsonFile) {
    loadJSONFile(window.state.current.stylesheet, doc.body, jsonFile)
  }
}
