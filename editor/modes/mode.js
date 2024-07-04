import { Channel } from '../../utils/broadcast-channel'
import { saveFile } from '../../utils/storage'
import { canvasDocument } from '../canvas'
import { serialize } from '../dom'
import { downloadHTMLFile } from '../utils'

const channel = new Channel('matry')

export class Mode {
  commands = {}
  commandSubPath = {}
  lockedPath = null

  constructor() {}

  on_command(lock, key, state) {
    let newState = null

    const subPath = this.lockedPath || this.commandSubPath

    switch (typeof subPath[key]) {
      case 'object':
        channel.post({ action: 'append_key', data: key })
        if (lock) {
          this.lockedPath = this.commandSubPath
        }
        this.commandSubPath = subPath[key]

        break
      case 'function':
        channel.post({ action: 'execute_key', data: key })
        newState = subPath[key](state)
        this.commandSubPath = this.commands
        break
      default:
        channel.post({ action: 'reset_key', data: key })

        if (this.lockedPath) {
          this.commandSubPath = this.lockedPath
        } else {
          this.commandSubPath = this.commands
        }

        if (this.exit_mode) {
          this.exit_mode()
        }
        break
    }

    return newState
  }

  exit_mode() {
    channel.post({ action: 'exit_extension', data: {} })
    return {
      mode: 'normal',
    }
  }

  toggle_sidebar() {
    if (document.body.classList.contains('sidebar-open')) {
      document.body.classList.remove('sidebar-open')
    } else {
      document.body.classList.add('sidebar-open')
    }

    return null
  }

  toggle_box_model(state) {
    if (state.overlay === 'outline') {
      return {
        overlay: 'box_model'
      }
    }

    return {
      overlay: 'outline',
    }
  }

  help() {
    window.open('/help/index.html', '_blank').focus()
  }

  save_document(state) {
    const doc = canvasDocument()
    const html = doc.querySelector('html')

    saveFile(state.activeFileId, {
      content: serialize(html),
    })

    channel.post({
      action: 'did_save_state',
      data: {},
    })

    return {
      hasUnsavedChanges: false,
    }
  }

  export_document() {
    downloadHTMLFile(serialize(canvasDocument().querySelector('html')))
  }

  focus_editor() {
    return {
      active: true,
      mode: 'normal',
    }
  }

  blur_editor() {
    return {
      active: false,
      mode: 'normal',
    }
  }
}
