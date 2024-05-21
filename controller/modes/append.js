import { canvasDocument } from '../canvas'
import { appendNewRules } from '../cssom'
import {
  constructTemplate, appendNode, nestGroupWithinParent, isSiblings, nestIndividuallyWithinParent,
} from '../dom'
import { randomId } from '../utils'
import { Mode } from './mode'

class AppendMode extends Mode {
  constructor() {
    super()

    this.commands = {
      Escape: this.exit_mode,
      ArrowUp: this.add_previous_sibling,
      ArrowRight: this.add_last_child,
      ArrowDown: this.add_next_sibling,
      ArrowLeft: this.add_parent,
      BracketLeft: this.toggle_editor,
      'shift Slash': this.help,
      'meta KeyS': this.save_document,
    }
    this.commandSubPath = this.commands
  }

  add_next_sibling(state) {
    const doc = canvasDocument()
    const selections = state.selections.length ? state.selections : [doc.body]

    const newNodes = selections.map((selection, i) => {
      const position = selection === doc.body ? 'last' : 'after'

      if (state.clipboardSelection) {
        const { htmlContent } = JSON.parse(state.clipboardSelection)
        return appendNode(selection, htmlContent, position)
      }

      const options = {}
      if (state.clipboardText && state.appendingElementType === 'text') {
        options.text = state.clipboardText
      }

      if (state.clipboardFiles && state.appendingElementType === 'image') {
        options.file = state.clipboardFiles[i] || state.clipboardFiles[state.clipboardFiles.length - 1]
      }

      const { template } = constructTemplate(state.appendingElementType, options)

      return appendNode(selection, template, position)
    })

    return {
      selections: newNodes,
      mode: 'normal',
      clipboardText: '',
      clipboardSelection: null,
      clipboardFiles: null,
      hasUnsavedChanges: true,
    }
  }

  add_previous_sibling(state) {
    const doc = canvasDocument()
    const selections = state.selections.length ? state.selections : [doc.body]

    const newNodes = selections.map((selection, i) => {
      const position = selection === doc.body ? 'last' : 'before'

      if (state.clipboardSelection) {
        const { htmlContent } = JSON.parse(state.clipboardSelection)
        return appendNode(selection, htmlContent, position)
      }

      const options = {}
      if (state.clipboardText && state.appendingElementType === 'text') {
        options.text = state.clipboardText
      }

      if (state.clipboardFiles && state.appendingElementType === 'image') {
        options.file = state.clipboardFiles[i] || state.clipboardFiles[state.clipboardFiles.length - 1]
      }

      const { template } = constructTemplate(state.appendingElementType, options)

      return appendNode(selection, template, position)
    })

    return {
      selections: newNodes,
      mode: 'normal',
      clipboardText: '',
      clipboardSelection: null,
      clipboardFiles: null,
      hasUnsavedChanges: true,
    }
  }

  add_last_child(state) {
    const doc = canvasDocument()
    const { selections } = state

    const newNodes = selections.map((selection, i) => {
      if (['IMG', 'SPAN'].includes(selection.nodeName)) {
        throw new Error('Sorry, this element cannot have children')
      }

      if (state.clipboardSelection) {
        const { htmlContent } = JSON.parse(state.clipboardSelection)
        return appendNode(selection, htmlContent, 'last')
      }

      const options = {}
      if (state.clipboardText && state.appendingElementType === 'text') {
        options.text = state.clipboardText
      }

      if (state.clipboardFiles && state.appendingElementType === 'image') {
        options.file = state.clipboardFiles[i] || state.clipboardFiles[state.clipboardFiles.length - 1]
      }

      const { template } = constructTemplate(state.appendingElementType, options)

      return appendNode(selection, template, 'last')
    })

    return {
      selections: newNodes,
      mode: 'normal',
      clipboardText: '',
      clipboardSelection: null,
      clipboardFiles: null,
      hasUnsavedChanges: true,
    }
  }

  add_parent({ stylesheet, selections, appendingElementType }) {
    if (appendingElementType !== 'shape') {
      window.alert(`${appendingElementType} elements cannot have children`)
    }

    if (isSiblings(selections)) {
      return {
        selections: [nestGroupWithinParent(stylesheet, selections)],
        mode: 'normal',
        hasUnsavedChanges: true,
      }
    }

    return {
      selections: nestIndividuallyWithinParent(stylesheet, selections),
      mode: 'normal',
      hasUnsavedChanges: true,
    }
  }
}

export const appendMode = new AppendMode()
