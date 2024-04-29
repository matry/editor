import { getBox } from 'css-box-model'
import { channel } from '../listener'
import { canvasDocument } from '../canvas'

export class Mode {
  commands = {}
  commandSubPath = {}

  constructor() {}

  on_command(key, state) {
    let newState = null

    switch (typeof this.commandSubPath[key]) {
      case 'object':
        channel.post({ action: 'append_key', data: key })
        this.commandSubPath = this.commandSubPath[key]
        break
      case 'function':
        channel.post({ action: 'execute_key', data: key })
        newState = this.commandSubPath[key](state)
        this.commandSubPath = this.commands
        break
      default:
        channel.post({ action: 'reset_key', data: key })
        this.commandSubPath = this.commands
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
      mode: 'select',
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
}
