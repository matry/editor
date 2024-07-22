import { canvasWindow } from './canvas'
import modes from './modes'
import { readBlobs } from './utils'

export function initHandlers() {
  window.addEventListener('paste', async function onPaste(e) {
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
        for (const selection of selections) {
          const type = selection.getAttribute('data-type')
          if (type === 'text') {
            selection.innerHTML = clipboardText
          } else if (type === 'image') {
            try {
              const url = new URL(clipboardText)
              selection.setAttribute('src', url)
            } catch (error) {
              // do nothing
            }
          }
        }
      }
    }
  })

  window.addEventListener('keydown', async function onKeyDown(e) {
    const {
      metaKey, shiftKey, ctrlKey, altKey, code,
    } = e
  
    const keyboardShortcut = [
      metaKey ? 'meta' : '',
      ctrlKey ? 'ctrl' : '',
      shiftKey ? 'shift' : '',
      altKey ? 'alt' : '',
      code,
    ].filter((k) => k !== '').join(' ').trim()
  
    try {
      const newState = modes[window.state.current.mode].on_command(altKey, keyboardShortcut, window.state.current)
  
      if (newState) {
        e.preventDefault()
        window.state.current = newState
      }
    } catch (error) {
      console.error(error)
    }
  })

  canvasWindow().addEventListener('keydown', async function onIframeKeyDown(e) {
    if (globalThis.parent) {
      const keydownEvent = new KeyboardEvent(e.type, e)
      globalThis.parent.dispatchEvent(keydownEvent)
    }
  })
}

export function handleChannelMessage(e) {
  const message = e.data

  switch (message.action) {
    case 'exit_extension':
      window.state.current = {
        mode: 'normal',
        extension: '',
        extensionProps: {},
      }
      window.focus()

      if (message.data.save) {
        window.state.current = modes.normal.save_document(window.state.current)
      }

      break
    case 'confirm_replace_image_content':
      window.state.current = modes.normal.confirm_replace_image_content(window.state.current, { urls: message.data.urls })
      break
    case 'update_selection_text':
      window.state.current = modes.normal.update_selection_text(window.state.current, message.data.value)
      break
    case 'update_selection_styles':
      window.state.current = modes.normal.update_selection_styles(window.state.current, message.data.property, message.data.value, message.data.styles)
      break
    case 'update_selection_attributes':
      window.state.current = modes.normal.update_selection_attributes(window.state.current, message.data)
      break
    case 'set_selections':
      window.state.current = modes.normal.set_selections(window.state.current, message.data)
      break
    default:
      break
  }
}
