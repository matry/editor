import { appendRules } from '../cssom'
import { constructTemplate, appendNode } from '../dom'
import { randomId } from '../utils'

const append = {
  commands: {
    'Escape': 'exit_mode',
    'ArrowUp': 'add_previous_sibling',
    'ArrowRight': 'add_last_child',
    'ArrowDown': 'add_next_sibling',
    'ArrowLeft': 'add_parent',
  },

  exit_mode() {
    return {
      mode: 'select',
    }
  },

  add_next_sibling(state) {
    const selections = state.selections.length ? state.selections : [document.body]

    const newNodes = selections.map((selection) => {
      const position = selection === document.body ? 'last' : 'after'

      if (state.clipboardText) {
        const element = appendNode(selection, state.clipboardText, position)

        element.id = randomId()

        return position === 'last' ? selection.lastElementChild : selection.nextElementSibling
      }

      const { id, cssRules, template } = constructTemplate(state.appendingElementType)

      appendRules(state.stylesheet, id, cssRules)

      // Object.entries(cssRules).forEach(([property, value]) => {
      //   appendRule(id, property, value)
      // })

      appendNode(selection, template, position)

      return document.getElementById(id)
    })

    return {
      selections: newNodes,
      mode: 'select',
      clipboardText: '',
    }
  },

  add_previous_sibling(state) {
    const selections = state.selections.length ? state.selections : [document.body]

    const newNodes = selections.map((selection) => {
      const position = selection === document.body ? 'last' : 'before'

      if (state.clipboardText) {
        appendNode(selection, state.clipboardText, position)
        return position === 'last' ? selection.lastElementChild : selection.previousElementSibling
      }

      const { id, cssRules, template } = constructTemplate(state.appendingElementType)

      appendRules(state.stylesheet, id, cssRules)

      appendNode(selection, template, position)
      return document.getElementById(id)
    })

    return {
      selections: newNodes,
      mode: 'select',
      clipboardText: '',
    }
  },

  add_last_child(state) {
    const { selections } = state

    const newNodes = selections.map((selection) => {
      if (['IMG', 'SPAN'].includes(selection.nodeName)) {
        throw new Error('Sorry, this element cannot have children')
      }

      if (state.clipboardText) {
        appendNode(selection, state.clipboardText, 'last')
        return selection.lastElementChild
      }

      const { id, cssRules, template } = constructTemplate(state.appendingElementType)

      appendRules(state.stylesheet, id, cssRules)

      appendNode(selection, template, 'last')
      return document.getElementById(id)
    })

    return {
      selections: newNodes,
      mode: 'select',
      clipboardText: '',
    }
  },

  add_parent() {
    window.alert('This action is not yet available')
  },
}

export default append
