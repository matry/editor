import { canvasDocument, populateCanvas } from './canvas'
import { State } from './state.js'
import { readBlobs } from './utils'
import { channel } from './listener'
// import { initZoom } from './zoom'
import modes from './modes'
import './editor.jsx'
import './effects'
import { initCanvasDOMObserver } from './observer'
import './index.css'
import { initStorage } from '../utils/storage.js'
import { styleInitialCanvas } from './cssom.js'

initApp()

async function initApp() {
  const storage = await initStorage()

  populateCanvas(storage.activeFile)
  styleInitialCanvas()

  const doc = canvasDocument()

  initCanvasDOMObserver()

  window.state = new State({}, (newState, update) => {
    Object.keys(update).forEach((updateKey) => {
      let data = update[updateKey]

      if (updateKey === 'selections') {
        data = newState.selections.map((s) => s.id)
      }

      channel.post({
        action: `${updateKey}_changed`,
        data,
      })
    })

    channel.post({
      action: 'state_did_change',
      data: {
        projects: newState.projects,
        files: newState.files,
        activeProjectId: newState.activeProjectId,
        activeFileId: newState.activeFileId,
        extension: newState.extension,
        extensionProps: newState.extensionProps,
        overlay: newState.overlay,
        mode: newState.mode,
        selections: newState.selections.map((selection) => selection.id), // selections holds the elements themselves, and they do not serialize
        copiedIds: newState.copiedIds,
        cutIds: newState.cutIds,
        appendingElementType: newState.appendingElementType,
        clipboardText: newState.clipboardText,
        clipboardSelection: newState.clipboardSelection,
        clipboardFiles: newState.clipboardFiles,
        hasUnsavedChanges: newState.hasUnsavedChanges,
      },
    })
  })

  // initialize the state so that it triggers a channel message
  window.state.current = {
    projects: storage.projects,
    files: storage.files,
    activeProjectId: '',
    activeFileId: '',
    hasUnsavedChanges: false,
    mode: 'normal',
    selections: [doc.body],
    copiedIds: [],
    cutIds: [],
    showBoxModel: false,
    overlay: 'outline',
    appendingElementType: null,
    clipboardText: '',
    clipboardSelection: null,
    clipboardFiles: null,
    extension: '',
    extensionProps: {},
  }

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

  channel.listen((e) => {
    const message = e.data

    switch (message.action) {
      case 'exit_extension':
        window.state.current = {
          mode: 'normal',
          extension: '',
          extensionProps: {},
        }
        window.focus()
        break
      case 'confirm_replace_content':
        modes.normal.confirm_replace_content(window.state.current, { urls: message.data.urls })
        break
      case 'update_selection_text':
        modes.normal.update_selection_text(window.state.current, message.data.value)
        break
      case 'update_selection_styles':
        modes.normal.update_selection_styles(window.state.current, message.data.property, message.data.value, message.data.styles)
        break
      case 'update_selection_attributes':
        modes.normal.update_selection_attributes(window.state.current, message.data)
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

  window.state.current = {
    selections: [doc.body],
    activeFileId: storage.activeFile.id,
    activeProjectId: storage.activeProject.id,
  }
}
