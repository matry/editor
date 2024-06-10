import { Mode } from './mode'

class ProjectMode extends Mode {
  constructor() {
    super()

    this.commands = {
      Escape: this.escape,
    }
    this.commandSubPath = this.commands
  }

  escape() {
    console.log('hi there we are in the project yay')
  }
}

export const projectMode = new ProjectMode()
