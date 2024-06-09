import { randomId } from './utils'
import { canvasDocument } from './canvas'
import { config } from './config'

export const constructTextTemplate = (options = {}) => {
  const tag = config.defaults.text.tag
  const styles = JSON.stringify(config.defaults.text.styles())
  const content = config.defaults.text.content()

  return `<${tag} data-type="text" data-styles='${styles}'>${options.text || content}</${tag}>`
}

export const constructImageTemplate = (options = {}) => {
  const tag = config.defaults.image.tag
  const styles = JSON.stringify(config.defaults.image.styles())
  const content = config.defaults.image.content()

  return `<${tag} data-type="image" data-styles='${styles}' width="100px" height="100px" src="${options.file || content}" />`
}

export const constructShapeTemplate = () => {
  const tag = config.defaults.shape.tag
  const styles = JSON.stringify(config.defaults.shape.styles())

  return `<${tag} data-type="shape" data-styles='${styles}'></${tag}>`
}

export const constructTemplate = (elementType, options) => {
  switch (elementType) {
    case 'text':
      return constructTextTemplate(options)
    case 'image':
      return constructImageTemplate(options)
    default:
      return constructShapeTemplate(options)
  }
}

export const appendNode = (target, template, position) => {
  let insertionPoint = 'beforeend'

  switch (position) {
    case 'before':
      insertionPoint = 'beforebegin'
      break
    case 'after':
      insertionPoint = 'afterend'
      break
    case 'first':
      insertionPoint = 'afterbegin'
      break
    case 'last':
      insertionPoint = 'beforeend'
      break
    default:
      break
  }

  const parser = new DOMParser()

  const parseDoc = parser.parseFromString(template, 'text/html')
  const element = parseDoc.body.firstElementChild

  resetIds(element)

  target.insertAdjacentElement(insertionPoint, element)

  return element
}

export const resetIds = (element) => {

  element.id = randomId()

  for (let i = 0, l = element.children.length; i < l; i++) {
    resetIds(element.children[i])
  }
}

export const selectAll = (selections) => {
  const doc = canvasDocument()

  if (!selections.length) {
    return Array.from(doc.body.children)
  }

  return selections.map((selection) => {
    if (!selection.parentElement || selection.parentElement.id === 'html') {
      return [selection]
    }

    return [...selection.parentElement.children]
  }).flat()
}

export const selectNextNode = (selections) => {
  const doc = canvasDocument()

  if (!selections.length) {
    const bodyChildren = Array.from(doc.body.children)

    if (!bodyChildren) {
      return []
    }

    return [bodyChildren[0]]
  }

  return selections.map((selection) => {
    if (selection.nextElementSibling) {
      return selection.nextElementSibling
    }

    return selection
  }).filter((selection, index, self) => self.indexOf(selection) === index)
}

export const leapNextNode = (selections) => {
  if (!selections.length) {
    return selections
  }

  const newSelections = selections.map((selection) => {
    if (!selection.parentElement || !selection.parentElement.nextElementSibling) {
      return null
    }

    if (selection.parentElement.nextElementSibling.getAttribute('data-type') !== selection.parentElement.getAttribute('data-type')) {
      return null
    }

    const selectionIndex = Array.from(selection.parentElement.children).indexOf(selection)
    const cousin = selection.parentElement.nextElementSibling.children[selectionIndex]

    if (!cousin || cousin.getAttribute('data-type') !== selection.getAttribute('data-type')) {
      return null
    }

    return cousin
  })

  return newSelections.filter((selection) => selection !== null)
}

export const leapPreviousNode = (selections) => {
  if (!selections.length) {
    return selections
  }

  const newSelections = selections.map((selection) => {
    if (!selection.parentElement || !selection.parentElement.previousElementSibling) {
      return null
    }

    if (selection.parentElement.previousElementSibling.getAttribute('data-type') !== selection.parentElement.getAttribute('data-type')) {
      return null
    }

    const selectionIndex = Array.from(selection.parentElement.children).indexOf(selection)
    const cousin = selection.parentElement.previousElementSibling.children[selectionIndex]

    if (!cousin || cousin.getAttribute('data-type') !== selection.getAttribute('data-type')) {
      return null
    }

    return cousin
  })

  return newSelections.filter((selection) => selection !== null)
}

export const selectPreviousNode = (selections) => {
  if (!selections.length) {
    return selections
  }

  return selections.map((selection) => {
    if (selection.previousElementSibling) {
      return selection.previousElementSibling
    }

    return selection
  }).filter((selection, index, self) => self.indexOf(selection) === index)
}

export const selectFirstSiblingNode = (selections) => {
  if (!selections.length) {
    return selections
  }

  return selections.map((selection) => selection.parentElement.firstElementChild).filter((selection, index, self) => self.indexOf(selection) === index)
}

export const selectLastSiblingNode = (selections) => {
  if (!selections.length) {
    return selections
  }

  return selections.map((selection) => selection.parentElement.lastElementChild).filter((selection, index, self) => self.indexOf(selection) === index)
}

export const deleteElements = (elements) => {
  elements.forEach((element) => {
    if (['html', 'body'].includes(element.getAttribute('data-type'))) {
      return
    }

    element.remove()
  })
}

export const isInBounds = (element) => {
  if (!element) {
    return true
  }

  const {
    top, right, bottom, left,
  } = element.getBoundingClientRect()

  return top >= 0 && left >= 0 && right <= window.innerWidth && bottom <= window.innerHeight
}

export const serialize = (element) => {
  const serializer = new XMLSerializer()

  element.normalize()

  return serializer.serializeToString(element)
}

export const isSiblings = (elements) => {
  const parent = elements[0].parentElement
  let result = true

  elements.forEach((element) => {
    if (element.parentElement !== parent) {
      result = false
    }
  })

  return result
}

export const nestGroupWithinParent = (elements) => {
  const template = constructShapeTemplate()
  const parentElement = appendNode(elements[0], template, 'before')

  elements.forEach((element) => {
    parentElement.appendChild(element)
  })

  return parentElement
}

export const nestIndividuallyWithinParent = (elements) => {
  const parentElements = elements.map((element) => {
    if (['html', 'body'].includes(element.parentElement.getAttribute('data-type'))) {
      return null
    }

    const template = constructShapeTemplate()

    const parentElement = appendNode(element, template, 'before')
    parentElement.appendChild(element)
    return parentElement
  }).filter(el => el !== null)

  return parentElements
}

export const getAllChildrenByType = (elements, type) => {
  let results = []

  for (const element of elements) {
    let localResults = element.querySelectorAll(`[data-type="${type}"]`)
    results.push(...localResults)
  }

  return results
}
