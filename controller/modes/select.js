/* eslint-disable no-alert */
import {
  getSharedStylesByIds,
  getStylesObjectById, replaceAllRules, updateRule,
} from '../cssom'
import {
  deleteElements, selectAll, selectFirstSiblingNode, selectLastSiblingNode, selectNextNode, selectPreviousNode, serialize,
} from '../dom'
import { channel } from '../listener'
import {
  clearStorage,
  downloadJSONFile, getSelectionTypes, openJSONFile, storeJSONFile,
} from '../utils'
import { canvasDocument, canvasWindow } from '../canvas'
import { Mode } from './mode'
import { randomImage } from '../utils'
import { downloadHTMLFile } from '../utils'
import { isSiblings } from '../dom'

const doc = canvasDocument()
const win = canvasWindow()

class SelectMode extends Mode {
  constructor() {
    super()

    this.commands = {
      Escape: this.clear_selections,
      Backspace: this.delete_selections,
      BracketLeft: this.toggle_editor,
      KeyE: {
        KeyI: {
          KeyR: this.replace_random_image,
        },
        KeyS: this.style_selections,
        KeyT: this.edit_selections_text,
      },
      KeyD: this.delete_selections,
      Tab: this.select_next_sibling,
      KeyA: {
        KeyS: this.append_shape,
        KeyT: this.append_text,
        KeyI: this.append_image,
        KeyV: this.append_video,
      },
      KeyB: this.toggle_box_model,
      ArrowUp: this.select_previous_sibling,
      ArrowDown: this.select_next_sibling,
      ArrowRight: this.select_first_child,
      ArrowLeft: this.select_parent,
      'shift ArrowUp': this.shift_selection_up,
      'shift ArrowDown': this.shift_selection_down,
      'meta ArrowUp': this.select_first_sibling,
      'meta ArrowDown': this.select_last_sibling,
      'meta KeyA': this.select_all,
      'meta KeyC': this.copy_selections,
      'meta KeyS': this.save_document,
      'meta KeyE': this.export_document,
      'meta KeyO': this.open_document,
      'meta Backspace': this.reset,
      'shift Slash': this.help,
    }
    this.commandSubPath = this.commands
  }

  reset() {
    if (window.confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
      clearStorage()
      window.location.reload()
    }
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

  async open_document({ stylesheet }) {
    const json = await openJSONFile()

    if (json.htmlContent) {
      const parser = new DOMParser()
      const doc = parser.parseFromString(json.htmlContent, 'text/html')
      doc.body.innerHTML = doc.body.innerHTML
    }

    if (json.cssRules) {
      replaceAllRules(stylesheet, json.cssRules)
    }
  }

  replace_content({ selections }) {
    const types = getSelectionTypes(selections)

    if (types.length > 1) {
      throw new Error('Sorry, you can only edit one type of content at a time')
    }

    if (!['text', 'image'].includes(types[0])) {
      throw new Error('Sorry, this content cannot be edited')
    }

    channel.post({
      action: 'request_extension',
      data: {
        id: types[0],
        params: {
          count: selections.length,
        },
      },
    })
  }

  confirm_replace_content({ selections }, { images, urls }) {
    selections.forEach((selection, i) => {
      if (selection.getAttribute('data-type') === 'image') {
        selection.setAttribute('src', urls[i] || urls[0])
      }
    })

    return {
      hasUnsavedChanges: true,
    }
  }

  replace_random_image({ selections, stylesheet }) {
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

  update_selection_text({ selections }, textContent) {
    for (const selection of selections) {
      if (selection.getAttribute('data-type') === 'text') {
        selection.innerHTML = textContent
      }
    }

    return {
      hasUnsavedChanges: true,
    }
  }

  update_selection_style({ stylesheet, selections }, property, value) {
    if (!selections.length) {
      updateRule(stylesheet, 'body', property, value)
      return
    }

    selections.forEach(({ id }) => {
      updateRule(stylesheet, `#${id}`, property, value)
    })

    return {
      hasUnsavedChanges: true,
    }
  }

  style_selections({ stylesheet, selections }) {
    const styles = getSharedStylesByIds(stylesheet, selections.map((selection) => selection.id))
    channel.post({
      action: 'request_extension',
      data: {
        id: 'css',
        params: styles,
      },
    })

    return {
      hasUnsavedChanges: true,
    }
  }

  edit_selections_image(state) {
    const { selections } = state

    if (selections.length === 0) {
      throw new Error('You must first select an element to edit')
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

    channel.post({
      action: 'request_extension',
      data: {
        id: 'image',
        params: {
          count: imagesSelected,
        },
      },
    })
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
    if (Object.keys(textContents).length > 0) {
      channel.post({
        action: 'request_extension',
        data: {
          id: 'text',
          params: textContents,
        },
      })
    }

    return null
  }

  copy_selections(state) {
    const { selections, stylesheet } = state

    if (!selections.length) {
      return null
    }

    if (selections.length > 1) {
      return null
    }

    const copiedContent = {
      htmlContent: serialize(selections[0]),
      cssRules: getStylesObjectById(stylesheet, selections[0].id),
    }

    navigator.clipboard.writeText(JSON.stringify(copiedContent))

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

  append_video(state) {
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
      appendingElementType: 'video',
    }
  }

  select_first_sibling(state) {
    return {
      selections: selectFirstSiblingNode(state.selections),
    }
  }

  select_last_sibling(state) {
    return {
      selections: selectLastSiblingNode(state.selections),
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
      selections: selectPreviousNode(selections),
    }
  }

  select_next_sibling(state) {
    const { selections } = state

    if (selections.length === 0) {
      return {
        selections: [doc.querySelector('[data-type="html"]')],
      }
    }

    return {
      selections: selectNextNode(selections),
    }
  }

  select_parent(state) {
    const doc = canvasDocument()
    const { selections } = state

    if (selections.length === 0) {
      return {
        selections: [doc.querySelector('[data-type="html"]')],
      }
    }

    return {
      selections: selections.map((selection) => {
        if (selection.getAttribute('data-type') === 'html') {
          return selection
        }

        return selection.parentElement
      }),
    }
  }

  select_first_child(state) {
    const { selections } = state

    if (selections.length === 0) {
      return {
        selections: [doc.querySelector('[data-type="html"]')],
      }
    }

    return {
      selections: selections.map((selection) => {
        if (['text', 'image', 'video'].includes(selection.getAttribute('data-type')) || selection.children.length === 0) {
          return selection
        }

        return selection.querySelector('[data-type]')
        // return selection.firstElementChild
      }),
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
        selections: [e.target],
      }
    }

    return {
      selections: [clickedElements[clickedIndex + 1]],
    }
  }

  select_another_node(state, e) {
    return {
      selections: [...state.selections, e.target],
    }
  }

  select_all(state) {
    return {
      selections: selectAll(state.selections),
    }
  }

  clear_selections(state) {
    channel.post({ action: 'exit_extension', data: {} })

    if (state.selections.length > 1) {
      return {
        selections: [state.selections[0]],
      }
    }

    return {
      selections: [canvasDocument().body],
    }
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
      selections: newSelections,
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
        selections: newSelections,
      }
    }

    return {
      selections: [...selections, previousElement],
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
        selections: newSelections,
      }
    }

    return {
      selections: [...selections, nextElement],
    }
  }
}

export const selectMode = new SelectMode()
