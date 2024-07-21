/* eslint-disable no-alert */
import { getSharedStyles, resetRules, updateRule } from '../cssom'
import {
  deleteElements, getAllByIds, getAllChildrenByType, leapNextNode, leapPreviousNode, selectAll, selectFirstSiblingNode, selectLastSiblingNode, selectNextNode, selectPreviousNode, serialize,
} from '../dom'
import { openJSONFile } from '../utils'
import { canvasDocument } from '../canvas'
import { Mode } from './mode'
import { randomImage } from '../utils'
import { isSiblings } from '../dom'
import { selectionGuard } from '../utils'
import { isEmpty, uniqBy } from 'lodash'
import { clearFile } from '../../utils/storage'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

const doc = canvasDocument()

class NormalMode extends Mode {
  constructor() {
    super()

    this.commands = {
      Escape: this.clear_selections,
      Backspace: this.delete_selections,
      KeyS: {
        KeyT: this.select_all_text,
        KeyI: this.select_all_image,
      },
      KeyE: {
        // KeyI: {
        //   KeyR: this.replace_random_image,
        //   Enter: this.replace_content,
        // },
        KeyI: this.edit_selections_image,
        KeyS: this.edit_selections_styles,
        KeyT: this.edit_selections_text,
      },
      Tab: this.select_next_sibling,
      KeyA: {
        KeyS: this.append_shape,
        KeyT: this.append_text,
        KeyI: this.append_image,
      },
      KeyT: {
        KeyS: this.toggle_sidebar,
        KeyB: this.toggle_box_model,
      },
      KeyN: {
        KeyP: this.navigate_to_project,
      },
      KeyH: this.help,
      ArrowUp: this.select_previous_sibling,
      ArrowDown: this.select_next_sibling,
      ArrowRight: this.select_first_child,
      ArrowLeft: this.select_parent,
      Slash: this.open_quick_command,
      BracketLeft: this.select_previous_cousin,
      BracketRight: this.select_next_cousin,
      Enter: this.enter_edit_content,
      'shift BracketLeft': this.shift_select_previous_cousin,
      'shift BracketRight': this.shift_select_next_cousin,
      'alt ArrowUp': this.move_selections_up,
      'alt ArrowDown': this.move_selections_down,
      'alt ArrowLeft': this.move_selections_left,
      'alt ArrowRight': this.move_selections_right,
      'shift ArrowUp': this.shift_selection_up,
      'shift ArrowDown': this.shift_selection_down,
      'meta ArrowUp': this.select_first_sibling,
      'meta ArrowDown': this.select_last_sibling,
      'meta ArrowLeft': this.select_root,
      'meta ArrowRight': this.select_first_leaf,
      'meta KeyA': this.select_all,
      'meta KeyC': this.copy_selections,
      'meta KeyS': this.save_document,
      'meta KeyE': this.export_document,
      'meta KeyO': this.open_document,
      'meta Backspace': this.reset,
      'meta Enter': this.toggle_interactive_mode,
    }
    this.commandSubPath = this.commands
  }

  navigate_to_project() {
    return {
      mode: 'project',
    }
  }

  set_selections(state, selection_ids) {
    const result = {
      selections: getAllByIds(selection_ids)
    }

    return result
  }

  move_selections_left(state) {
    for (const selection of state.selections) {
      if (['html', 'body'].includes(selection.id)) {
        continue
      }

      if (selection.parentElement && !['html', 'body'].includes(selection.parentElement.id)) {
        selection.parentElement.before(selection)
      }
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  move_selections_up(state) {
    for (const selection of state.selections) {
      if (['html', 'body'].includes(selection.id)) {
        continue
      }

      if (selection.previousElementSibling) {
        selection.previousElementSibling.before(selection)
      }
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  move_selections_down(state) {
    for (const selection of state.selections) {
      if (['html', 'body'].includes(selection.id)) {
        continue
      }

      if (selection.nextElementSibling) {
        selection.nextElementSibling.after(selection)
      }
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  move_selections_right(state) {
    for (const selection of state.selections) {
      if (['html', 'body'].includes(selection.id)) {
        continue
      }

      if (selection.nextElementSibling) {
        selection.nextElementSibling.prepend(selection)
      }
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  async reset(state) {
    if (window.confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
      await clearFile(state.activeFileId)
      window.location.reload()
    }
  }

  async open_document() {
    const json = await openJSONFile()

    if (json.htmlContent) {
      resetRules()

      const parser = new DOMParser()
      const doc = parser.parseFromString(json.htmlContent, 'text/html')
      doc.body.innerHTML = doc.body.innerHTML
    }
  }

  replace_content({ selections }) {
    const imageSelections = selections.filter((selection) => {
      return selection.getAttribute('data-type') === 'image'
    })

    if (!imageSelections.length) {
      return null
    }

    return {
      extension: 'image',
      extensionProps: {
        count: imageSelections.length,
      }
    }
  }

  open_quick_command() {
    return {
      extension: 'quick',
      extensionProps: {},
    }
  }

  confirm_replace_image_content({ selections }, { urls }) {
    if (!urls.length) {
      return null
    }

    const images = getAllChildrenByType(selections, 'image')

    for (let i = 0, x = 0, l = images.length; i < l; i++) {
      const image = images[i]
      let url = urls[x]
      if (!url) {
        x = 0
        url = urls[x]
      }

      image.setAttribute('src', url)
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  replace_random_image({ selections }) {
    selections.forEach((selection, i) => {
      if (selection.getAttribute('data-type') === 'image') {
        const image = randomImage(selection.offsetWidth, selection.offsetHeight)
        selection.setAttribute('src', image.url)
      }
    })

    return {
      hasUnsavedChanges: true,
    }
  }

  update_selection_attributes(state, data) {
    for (const selection of state.selections) {
      for (const k in data) {
        selection.setAttribute(k, data[k])
      }
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  update_selection_text({ selections }, textContent) {
    const texts = getAllChildrenByType(selections, 'text')

    for (const text of texts) {
      text.innerHTML = textContent
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  update_selection_styles({ selections }, property, value) {
    if (!selections.length) {
      updateRule('body', property, value)
      return
    }

    selections.forEach(({ id }) => {
      updateRule(`#${id}`, property, value)
    })

    return {
      hasUnsavedChanges: true,
    }
  }

  edit_selections_styles({ selections }) {
    return {
      hasUnsavedChanges: true,
      extension: 'css',
      extensionProps: getSharedStyles(selections),
    }
  }

  enter_edit_content(state) {
    if (state.selections.length === 0) {
      return null
    }

    const images = getAllChildrenByType(state.selections, 'image')
    const texts = getAllChildrenByType(state.selections, 'text')

    if (images.length && !texts.length) {

      let imagesSelected = 0
      for (const selection of images) {
        if (selection.getAttribute('data-type') === 'image') {
          imagesSelected += 1
        }
      }
  
      if (imagesSelected === 0) {
        return null
      }
  
      return {
        extension: 'image',
        extensionProps: {
          count: imagesSelected,
        }
      }

    } else if (texts.length && !images.length) {

      const textContents = {}
      for (const selection of texts) {
        if (selection.getAttribute('data-type') === 'text') {
          textContents[selection.id] = selection.innerHTML
        }
      }
  
      if (isEmpty(textContents)) {
        return null
      }
  
      return {
        extension: 'text',
        extensionProps: textContents,
      }

    } else {
      return null
    }
  }

  edit_selections_image(state) {
    const { selections } = state

    if (selections.length === 0) {
      return null
    }

    let imagesSelected = 0
    for (const selection of selections) {
      if (selection.getAttribute('data-type') === 'image') {
        imagesSelected += 1
      }
    }

    if (imagesSelected === 0) {
      return null
    }

    return {
      extension: 'image',
      extensionProps: {
        count: imagesSelected,
      }
    }
  }

  edit_selections_text(state) {
    const { selections } = state

    if (selections.length === 0) {
      throw new Error('You must first select an element to edit')
    }

    const textContents = {}
    for (const selection of selections) {
      if (selection.getAttribute('data-type') === 'text') {
        textContents[selection.id] = selection.innerHTML
      }
    }

    if (isEmpty(textContents)) {
      return null
    }

    return {
      extension: 'text',
      extensionProps: textContents,
    }
  }

  copy_selections(state) {
    const { selections } = state

    if (!selections.length) {
      return null
    }

    if (selections.length > 1) {
      return null
    }

    navigator.clipboard.writeText(JSON.stringify({
      htmlContent: selections.map(serialize),
    }))

    return null
  }

  append_shape(state) {
    let isValid = true
    for (const selection of state.selections) {
      if (selection.getAttribute('data-type') === 'html') {
        isValid = false
      }
    }

    if (!isValid) {
      return null
    }

    return {
      mode: 'append',
      appendingElementType: 'shape',
    }
  }

  append_text(state) {
    let isValid = true
    for (const selection of state.selections) {
      if (selection.getAttribute('data-type') === 'html') {
        isValid = false
      }
    }

    if (!isValid) {
      return null
    }

    return {
      mode: 'append',
      appendingElementType: 'text',
    }
  }

  append_image(state) {
    let isValid = true
    for (const selection of state.selections) {
      if (selection.getAttribute('data-type') === 'html') {
        isValid = false
      }
    }

    if (!isValid) {
      return null
    }

    return {
      mode: 'append',
      appendingElementType: 'image',
    }
  }

  select_first_sibling(state) {
    return {
      selections: selectionGuard(selectFirstSiblingNode(state.selections)),
    }
  }

  select_last_sibling(state) {
    return {
      selections: selectionGuard(selectLastSiblingNode(state.selections)),
    }
  }

  select_previous_sibling(state) {
    const doc = canvasDocument()
    const { selections } = state

    if (!selections.length) {
      const html = doc.querySelector('[data-type="html"]')

      return {
        selections: [html],
      }
    }

    return {
      selections: selectionGuard(selectPreviousNode(selections)),
    }
  }

  select_next_sibling(state) {
    if (state.selections.length === 0) {
      return {
        selections: [canvasDocument().querySelector('[data-type="html"]')],
      }
    }

    return {
      selections: selectionGuard(selectNextNode(state.selections)),
    }
  }

  select_previous_cousin(state) {
    const newSelections = leapPreviousNode(state.selections)

    if (!newSelections.length) {
      return null
    }

    return {
      selections: selectionGuard(newSelections),
    }
  }

  select_next_cousin(state) {
    const newSelections = leapNextNode(state.selections)

    if (!newSelections.length) {
      return null
    }

    return {
      selections: selectionGuard(newSelections),
    }
  }

  shift_select_previous_cousin(state) {
    const newSelections = leapPreviousNode(state.selections)

    if (!newSelections.length) {
      return null
    }

    return {
      selections: selectionGuard(
        uniqBy([...newSelections, ...state.selections], (s) => s.id)
      )
    }
  }

  shift_select_next_cousin(state) {
    const newSelections = leapNextNode(state.selections)

    if (!newSelections.length) {
      return null
    }

    return {
      selections: selectionGuard(
        uniqBy([...newSelections, ...state.selections], (s) => s.id)
      )
    }
  }

  select_parent(state) {
    const { selections } = state

    if (selections.length === 0) {
      return {
        selections: [canvasDocument().querySelector('[data-type="html"]')],
      }
    }

    const s = {
      selections: selectionGuard(selections.map((selection) => {
        if (selection.getAttribute('data-type') === 'html') {
          return selection
        }

        return selection.parentElement
      })),
    }

    return s
  }

  select_first_child(state) {
    const { selections } = state

    if (selections.length === 0) {
      return {
        selections: [canvasDocument().querySelector('[data-type="html"]')],
      }
    }

    return {
      selections: selectionGuard(selections.map((selection) => {
        if (['text', 'image'].includes(selection.getAttribute('data-type')) || selection.children.length === 0) {
          return selection
        }

        return selection.querySelector('[data-type]')
        // return selection.firstElementChild
      })),
    }
  }

  select_first_leaf(state) {
    let { selections } = state

    const doc = canvasDocument()

    if (selections.length === 0) {
      selections = [doc.body]
    }

    function walk(node) {
      const type = node.getAttribute('data-type')
      if (['text', 'image', 'video'].includes(type)) {
        return node
      }

      if (node.firstElementChild === null) {
        return node
      }

      return walk(node.firstElementChild)
    }

    return {
      selections: selectionGuard(selections.map(walk)),
    }
  }

  select_node({ selections }, e) {
    if (selections.length !== 1) {
      return {
        selections: [e.target],
      }
    }

    const clickedElements = doc.elementsFromPoint(e.clientX, e.clientY).filter((el) => Boolean(el.id))
    const clickedIndex = clickedElements.findIndex((el) => el.hasAttribute('data-selected'))

    if (clickedIndex === -1 || clickedIndex === (clickedElements.length - 1)) {
      return {
        selections: selectionGuard([e.target]),
      }
    }

    return {
      selections: selectionGuard([clickedElements[clickedIndex + 1]]),
    }
  }

  select_another_node(state, e) {
    return {
      selections: selectionGuard([...state.selections, e.target]),
    }
  }

  select_all(state) {
    return {
      selections: selectionGuard(selectAll(state.selections)),
    }
  }

  clear_selections(state) {
    channel.post({ action: 'exit_extension', data: {} })

    if (state.selections.length > 1) {
      return {
        selections: selectionGuard([state.selections[0]]),
      }
    }

    return {
      selections: selectionGuard([canvasDocument().body]),
    }
  }

  select_root() {
    const newState = {
      selections: selectionGuard([canvasDocument().body]),
    }

    return newState
  }

  delete_selections(state) {
    const { selections } = state

    const siblings = isSiblings(selections)

    let newSelections = selections.map((selection) => {
      let newSelection = selection.nextElementSibling

      if (['html', 'body'].includes(selection.getAttribute('data-type'))) {
        return selection
      }

      if (newSelection === null) {
        newSelection = selection.previousElementSibling
      }

      if (newSelection === null) {
        newSelection = selection.parentElement
      }

      if (newSelection === doc.body) {
        return null
      }

      if (newSelection.hasAttribute('data-selected')) {
        return null
      }

      return newSelection
    }).filter((selection) => selection !== null)

    if (newSelections.length === 0) {
      if (siblings) {
        const parent = selections[0].parentElement
        if (parent && parent.hasAttribute('data-type')) {
          newSelections = [parent]
        }
      } else {
        newSelections = [canvasDocument().body]
      }
    }

    deleteElements(selections)

    return {
      selections: selectionGuard(newSelections),
      hasUnsavedChanges: true,
    }
  }

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
        selections: selectionGuard(newSelections),
      }
    }

    return {
      selections: selectionGuard([...selections, previousElement]),
    }
  }

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
        selections: selectionGuard(newSelections),
      }
    }

    return {
      selections: selectionGuard([...selections, nextElement]),
    }
  }

  select_all_text({ selections }) {
    return {
      selections: selectionGuard(getAllChildrenByType(selections, 'text'))
    }
  }

  select_all_image({ selections }) {
    return {
      selections: selectionGuard(getAllChildrenByType(selections, 'image'))
    }
  }
}

export const normalMode = new NormalMode()
