import { appendNewRules, appendRules } from '../cssom'
import {
  constructTemplate, appendNode, nestGroupWithinParent, isSiblings, nestIndividuallyWithinParent,
} from '../dom'
import { randomId } from '../utils'

const append = {
  commands: {
    Escape: 'exit_mode',
    ArrowUp: 'add_previous_sibling',
    ArrowRight: 'add_last_child',
    ArrowDown: 'add_next_sibling',
    ArrowLeft: 'add_parent',
  },

  exit_mode() {
    return {
      mode: 'select',
    }
  },

  add_next_sibling(state) {
    const selections = state.selections.length ? state.selections : [document.body]

    const newNodes = selections.map((selection, i) => {
      const position = selection === document.body ? 'last' : 'after'

      if (state.clipboardSelection) {
        const { htmlContent, cssRules } = JSON.parse(state.clipboardSelection)
        const element = appendNode(selection, htmlContent, position)
        element.id = randomId()
        appendNewRules(state.stylesheet, element.id, cssRules)

        return position === 'last' ? selection.lastElementChild : selection.nextElementSibling
      }

      const options = {}
      if (state.clipboardText && state.appendingElementType === 'text') {
        options.text = state.clipboardText
      }

      if (state.clipboardFiles && state.appendingElementType === 'image') {
        options.file = state.clipboardFiles[i] || state.clipboardFiles[state.clipboardFiles.length - 1]
      }

      const { id, cssRules, template } = constructTemplate(state.appendingElementType, options)
      appendRules(state.stylesheet, id, cssRules)
      const newElement = appendNode(selection, template, position)

      return newElement
    })

    return {
      selections: newNodes,
      mode: 'select',
      clipboardText: '',
      clipboardSelection: null,
      clipboardFiles: null,
    }
  },

  add_previous_sibling(state) {
    const selections = state.selections.length ? state.selections : [document.body]

    const newNodes = selections.map((selection, i) => {
      const position = selection === document.body ? 'last' : 'before'

      if (state.clipboardSelection) {
        const { htmlContent, cssRules } = JSON.parse(state.clipboardSelection)
        const element = appendNode(selection, htmlContent, position)
        element.id = randomId()
        appendNewRules(state.stylesheet, element.id, cssRules)

        return position === 'last' ? selection.lastElementChild : selection.previousElementSibling
      }

      const options = {}
      if (state.clipboardText && state.appendingElementType === 'text') {
        options.text = state.clipboardText
      }

      if (state.clipboardFiles && state.appendingElementType === 'image') {
        options.file = state.clipboardFiles[i] || state.clipboardFiles[state.clipboardFiles.length - 1]
      }

      const { id, cssRules, template } = constructTemplate(state.appendingElementType, options)

      appendRules(state.stylesheet, id, cssRules)

      appendNode(selection, template, position)
      return document.getElementById(id)
    })

    return {
      selections: newNodes,
      mode: 'select',
      clipboardText: '',
      clipboardSelection: null,
      clipboardFiles: null,
    }
  },

  add_last_child(state) {
    const { selections } = state

    const newNodes = selections.map((selection, i) => {
      if (['IMG', 'SPAN'].includes(selection.nodeName)) {
        throw new Error('Sorry, this element cannot have children')
      }

      if (state.clipboardSelection) {
        const { htmlContent, cssRules } = JSON.parse(state.clipboardSelection)
        const element = appendNode(selection, htmlContent, 'last')
        element.id = randomId()
        appendNewRules(state.stylesheet, element.id, cssRules)

        return selection.lastElementChild
      }

      const options = {}
      if (state.clipboardText && state.appendingElementType === 'text') {
        options.text = state.clipboardText
      }

      if (state.clipboardFiles && state.appendingElementType === 'image') {
        options.file = state.clipboardFiles[i] || state.clipboardFiles[state.clipboardFiles.length - 1]
      }

      const { id, cssRules, template } = constructTemplate(state.appendingElementType, options)

      appendRules(state.stylesheet, id, cssRules)

      appendNode(selection, template, 'last')
      return document.getElementById(id)
    })

    return {
      selections: newNodes,
      mode: 'select',
      clipboardText: '',
      clipboardSelection: null,
      clipboardFiles: null,
    }
  },

  add_parent({ stylesheet, selections, appendingElementType }) {
    if (appendingElementType !== 'shape') {
      window.alert(`${appendingElementType} elements cannot have children`)
    }

    if (isSiblings(selections)) {
      return {
        selections: [nestGroupWithinParent(stylesheet, selections)],
        mode: 'select',
      }
    }
    return {
      selections: nestIndividuallyWithinParent(stylesheet, selections),
      mode: 'select',
    }
  },
}

export default append
