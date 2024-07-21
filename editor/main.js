import { canvasDocument, canvasWindow, populateCanvas } from './canvas'
import { State } from './state.js'
import { Channel } from '../utils/broadcast-channel'
import './editor.jsx'
import './effects'
import { initCanvasDOMObserver } from './observer'
import './index.css'
import { initStorage } from '../utils/storage.js'
import { styleInitialCanvas } from './cssom.js'
import { handleChannelMessage, handleEditorKeydown, handleIframedKeydown, handlePaste } from './handlers.js'

const channel = new Channel('matry')

initApp()

async function initApp() {
  const storage = await initStorage()

  populateCanvas(storage.activeFile)
  styleInitialCanvas()
  initCanvasDOMObserver()

  const doc = canvasDocument()

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

  window.addEventListener('paste', handlePaste)

  channel.listen(handleChannelMessage)

  window.state.current = {
    selections: [doc.body],
    activeFileId: storage.activeFile.id,
    activeProjectId: storage.activeProject.id,
  }

  window.addEventListener('keydown', handleEditorKeydown)

  canvasWindow().addEventListener('keydown', handleIframedKeydown)
}
