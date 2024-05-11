import { canvasDocument } from '../canvas'
import { serialize } from '../dom'
import { channel } from '../listener'
import { downloadHTMLFile, storeJSONFile } from '../utils'

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

  toggle_editor() {
    if (document.body.classList.contains('editor-open')) {
      document.body.classList.remove('editor-open')
    } else {
      document.body.classList.add('editor-open')
    }

    return null
  }

  toggle_box_model(state) {
    return {
      showBoxModel: !state.showBoxModel,
    }
  }

  help() {
    window.open('/help/index.html', '_blank').focus()
  }

  save_document({ stylesheet }) {
    storeJSONFile(
      serialize(canvasDocument().body),
      Array.from(stylesheet.cssRules).map((rule) => rule.cssText),
    )

    channel.post({
      action: 'did_save_state',
      data: {},
    })

    return {
      hasUnsavedChanges: false,
    }
  }

  export_document({ stylesheet }) {
    const canvas = canvasDocument()
    const doc = canvas.cloneNode(true)

    const scripts = doc.querySelectorAll('script')
    scripts.forEach((script) => {
      script.remove()
    })

    const cssRules = Array.from(stylesheet.cssRules).map((rule) => rule.cssText).join('\n')

    const style = doc.createElement('style')
    style.textContent = cssRules
    doc.head.appendChild(style)

    const serializer = new XMLSerializer()
    const serializedDoc = serializer.serializeToString(doc)

    downloadHTMLFile(serializedDoc)
  }
}
