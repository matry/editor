/* eslint-disable no-alert */
import { Mode } from './mode'
import { clearFile } from '../../utils/storage'

class InteractiveMode extends Mode {
  constructor() {
    super()

    this.commands = {
      KeyH: this.help,
      'meta Backspace': this.reset,
      'meta Enter': this.toggle_interactive_mode,
    }
    this.commandSubPath = this.commands
  }

  async reset(state) {
    if (window.confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
      await clearFile(state.activeFileId)
      window.location.reload()
    }
  }
}

export const interactiveMode = new InteractiveMode()
