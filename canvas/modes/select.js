import { saveAs } from 'file-saver'
import {
  getStylesObjectById, replaceAllRules, updateRule,
} from '../cssom'
import {
  deleteElements, selectAll, selectFirstSiblingNode, selectLastSiblingNode, selectNextNode, selectPreviousNode, serialize,
} from '../dom'
import { getSelectionTypes } from '../utils'

const select = {
  commands: {
    'shift KeyS': 'append_shape',
    'shift KeyT': 'append_text',
    'shift KeyI': 'append_image',
    'shift KeyV': 'append_video',
    ArrowUp: 'select_previous_sibling',
    ArrowDown: 'select_next_sibling',
    ArrowLeft: 'select_parent',
    ArrowRight: 'select_first_child',
    'shift ArrowUp': 'shift_selection_up',
    'shift ArrowDown': 'shift_selection_down',
    'meta ArrowUp': 'select_first_sibling',
    'meta ArrowDown': 'select_last_sibling',
    'meta KeyA': 'select_all',
    'meta KeyC': 'copy_selections',
    'meta KeyV': 'paste_selections',
    onclick: 'select_node',
    'meta onclick': 'select_another_node',
    Escape: 'clear_selections',
    Backspace: 'delete_selections',
    'Enter': 'edit_selections',
    'Slash': 'style_selections',
    'shift Digit4': 'replace_content',
    'meta KeyS': 'save_document',
    'meta KeyO': 'open_document',
  },

  save_document({ stylesheet }) {
    const serializer = new XMLSerializer()

    const json = JSON.stringify({
      cssRules: Array.from(stylesheet.cssRules).map((rule) => rule.cssText),
      htmlContent: serializer.serializeToString(document.body),
    })

    const file = new Blob([json], {
      type: 'application/json',
    })

    saveAs(file, 'file.json')
  },

  open_document({ stylesheet }) {
    const input = document.createElement('input')
    input.type = 'file'
    input.setAttribute('accept', '.json')
    input.onchange = () => {
      const [file] = Array.from(input.files)

      if (!file) {
        return
      }

      const reader = new FileReader()

      reader.addEventListener('load', (e) => {
        const loadedJson = JSON.parse(e.target.result)

        if (loadedJson.htmlContent) {
          const parser = new DOMParser()
          const doc = parser.parseFromString(loadedJson.htmlContent, 'text/html')
          document.body.innerHTML = doc.body.innerHTML
        }

        if (loadedJson.cssRules) {
          replaceAllRules(stylesheet, loadedJson.cssRules)
        }
      })

      reader.readAsText(file)
    }
    input.click()
  },

  replace_content({ selections }) {
    const types = getSelectionTypes(selections)

    if (types.length > 1) {
      throw new Error('Sorry, you can only edit one type of content at a time')
    }

    if (!['text', 'image'].includes(types[0])) {
      throw new Error('Sorry, this content cannot be edited')
    }

    window.parent.postMessage({
      action: 'request_extension',
      data: {
        id: types[0],
        params: {
          count: selections.length,
        },
      },
    })
  },

  confirm_replace_content({ selections }, { images }) {
    selections.forEach((selection, i) => {
      selection.setAttribute('src', images[i])
    })
  },

  update_selection_style({ stylesheet, selections }, property, value) {
    if (!selections.length) {
      updateRule(stylesheet, 'body', property, value)
      return
    }

    selections.forEach(({ id }) => {
      updateRule(stylesheet, `#${id}`, property, value)
    })
  },

  style_selections() {
    window.parent.postMessage({ action: 'request_extension', data: { id: 'css' } })
  },

  edit_selections({ selections }) {
    if (selections.length === 0 || selections.length > 1) {
      throw new Error('You can only edit one element at a time')
    }

    if (selections[0].getAttribute('data-type') === 'text') {
      return {
        mode: 'content',
      }
    }

    throw new Error('This element does not have editable content')
  },

  copy_selections(state) {
    const { selections, stylesheet } = state

    if (!selections.length) {
      return null
    }

    if (selections.length > 1) {
      window.alert('Sorry, multi-line copy is not yet available')
      return null
    }

    const copiedContent = {
      htmlContent: serialize(selections[0]),
      cssRules: getStylesObjectById(stylesheet, selections[0].id),
    }

    navigator.clipboard.writeText(JSON.stringify(copiedContent))

    return null
  },

  async paste_selections(state) {
    const { selections } = state

    if (!selections.length) {
      return null
    }

    if (selections.length > 1) {
      window.alert('Sorry, multi-line paste is not yet available')
      return null
    }

    const clipboardText = await navigator.clipboard.readText()

    return {
      mode: 'append',
      clipboardText,
    }
  },

  append_shape() {
    return {
      mode: 'append',
      appendingElementType: 'shape',
    }
  },

  append_text() {
    return {
      mode: 'append',
      appendingElementType: 'text',
    }
  },

  append_image() {
    return {
      mode: 'append',
      appendingElementType: 'image',
    }
  },

  append_video() {
    return {
      mode: 'append',
      appendingElementType: 'video',
    }
  },

  select_first_sibling(state) {
    return {
      selections: selectFirstSiblingNode(state.selections),
    }
  },

  select_last_sibling(state) {
    return {
      selections: selectLastSiblingNode(state.selections),
    }
  },

  select_previous_sibling(state) {
    const { selections } = state

    return {
      selections: selectPreviousNode(selections),
    }
  },

  select_next_sibling(state) {
    const { selections } = state

    return {
      selections: selectNextNode(selections),
    }
  },

  select_parent(state) {
    const { selections } = state

    if (selections.length === 0) {
      return null
    }

    return {
      selections: selections.map((selection) => {
        if (selection.parentElement === document.body) {
          return selection
        }

        return selection.parentElement
      }),
    }
  },

  select_first_child(state) {
    const { selections } = state

    if (selections.length === 0 && document.body.firstElementChild) {
      return {
        selections: [document.body.firstElementChild],
      }
    }

    return {
      selections: selections.map((selection) => {
        if (selection.getAttribute('data-type') !== 'shape' || selection.children.length === 0) {
          return selection
        }

        return selection.firstElementChild
      }),
    }
  },

  select_node({ selections }, e) {
    if (selections.length !== 1) {
      return {
        selections: [e.target],
      }
    }

    const clickedElements = window.document.elementsFromPoint(e.clientX, e.clientY).filter((el) => Boolean(el.id))
    const clickedIndex = clickedElements.findIndex((el) => el.hasAttribute('data-selected'))

    if (clickedIndex === -1 || clickedIndex === (clickedElements.length - 1)) {
      return {
        selections: [e.target],
      }
    }

    return {
      selections: [clickedElements[clickedIndex + 1]],
    }
  },

  select_another_node(state, e) {
    return {
      selections: [...state.selections, e.target],
    }
  },

  select_all(state) {
    return {
      selections: selectAll(state.selections),
    }
  },

  clear_selections(state) {
    if (state.selections.length > 1) {
      return {
        selections: [state.selections[0]],
      }
    }

    return {
      selections: [],
    }
  },

  delete_selections(state) {
    const { selections } = state

    const newSelections = selections.map((selection) => {
      let newSelection = selection.nextElementSibling

      if (newSelection === null) {
        newSelection = selection.previousElementSibling
      }

      if (newSelection === null) {
        newSelection = selection.parentElement
      }

      if (newSelection === document.body) {
        return null
      }

      if (newSelection.hasAttribute('data-selected')) {
        return null
      }

      return newSelection
    }).filter((selection) => selection !== null)

    deleteElements(selections)

    return {
      selections: newSelections,
    }
  },

  shift_selection_up({ selections }) {
    if (!selections.length) {
      return {
        selections,
      }
    }

    const previousElement = selections[selections.length - 1].previousElementSibling

    if (!previousElement) {
      return {
        selections,
      }
    }

    if (previousElement.hasAttribute('data-selected')) {
      const newSelections = [...selections]
      newSelections.pop()
      return {
        selections: newSelections,
      }
    }

    return {
      selections: [...selections, previousElement],
    }
  },

  shift_selection_down({ selections }) {
    if (!selections.length) {
      return {
        selections,
      }
    }

    const nextElement = selections[selections.length - 1].nextElementSibling

    if (!nextElement) {
      return {
        selections,
      }
    }

    if (nextElement.hasAttribute('data-selected')) {
      const newSelections = [...selections]
      newSelections.pop()
      return {
        selections: newSelections,
      }
    }

    return {
      selections: [...selections, nextElement],
    }
  },
}

export default select
