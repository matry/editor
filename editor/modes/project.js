import { createFile } from '../../utils/storage'
import { populateCanvas } from '../canvas'
import { styleInitialCanvas } from '../cssom'
import { Mode } from './mode'

class ProjectMode extends Mode {
  constructor() {
    super()

    this.commands = {
      Escape: this.escape,
      ArrowUp: this.select_previous_file,
      ArrowDown: this.select_next_file,
      // Enter: this.edit_file,
      // KeyN: {
      //   KeyF: this.new_file,
      // },
    }
    this.commandSubPath = this.commands
  }

  escape() {
    return {
      mode: 'normal',
    }
  }

  edit_file_name({ files, activeFileId }) {
    const file = files.find((f) => {
      return f.id === activeFileId
    })

    const name = file ? file.name : ''

    return {
      extension: 'file_name',
      extensionProps: {
        name,
      },
    }
  }

  edit_file() {
    return null
  }

  select_previous_file() {
    return null
  }

  select_next_file() {
    return null
  }

  new_file() {
    return null
  }
}

export const projectMode = new ProjectMode()
