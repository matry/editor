import { LoremIpsum } from 'lorem-ipsum'
import { randomColor, randomId } from './utils'
import { canvasDocument } from './canvas'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
})

export const randomStyles = (id) => `#${id} {
    width: 100%;
    background-color: ${randomColor()};
  }`

export const constructTextTemplate = (options = {}) => {
  const text = options.text || lorem.generateWords(2)

  const styles = JSON.stringify({
    base: {
      'display': 'block',
      'width': 'auto',
      'user-select': 'none',
      'line-height': 1,
    }
  })

  return {
    template: `
      <span
        data-type="text"
        data-styles='${styles}'
      >
        ${text}
      </span>
    `,
  }
}

export const constructImageTemplate = (options = {}) => {
  let template = ''

  const styles = JSON.stringify({
    base: {
      'display': 'block',
      'user-select': 'none',
      'max-width': '100%',
    },
  })

  if (options.file) {
    template = `<img data-type="image" data-styles='${styles}' width="auto" height="auto" src="${options.file}" />`
  } else {
    const url = '/placeholder-square.jpg'
    const width = '100px'
    const height = '100px'
    template = `<img data-type="image" data-styles='${styles}' width="${width}px" height="${height}px" src="${url}" />`
  }

  return {
    template,
  }
}

export const constructShapeTemplate = () => {
  const styles = JSON.stringify({
    base: {
      display: 'block',
      width: '100%',
      padding: '10px',
      'background-color': randomColor(),
    },
  })

  const template = `
    <div
      data-type="shape"
      data-styles='${styles}'
    >
    </div>
  `

  return {
    template,
  }
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

export const firstSelection = () => window.state.current.selections[0] || null

export const lastSelection = () => window.state.current.selections[window.state.current.selections.length - 1] || null

export const selectAll = (selections) => {
  const doc = canvasDocument()

  if (!selections.length) {
    return Array.from(doc.body.children)
  }

  return Array.from(selections[0].parentElement.children)
}

export const addNodeToSelection = (state, node) => {
  const { selections } = state

  return {
    selections: [...selections, node],
  }
}

export const selectNode = (state, node) => {
  if (!node) {
    return null
  }

  return {
    selections: [node],
  }
}

export const getSelectionSibling = (direction) => {
  const { selections } = window.current.state
  const index = direction === 'next' ? selections.length - 1 : 0
  const currentSelection = selections[index]

  if (!currentSelection) {
    return null
  }

  let resultNode = null

  if (direction === 'previous') {
    resultNode = currentSelection.previousElementSibling
  }

  if (direction === 'next') {
    resultNode = currentSelection.nextElementSibling
  }

  return resultNode
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

export const getSelectionDirection = (selections) => {
  let isUp = true
  let isDown = true

  selections.forEach((selection, i) => {
    const nextElement = selection.nextElementSibling
    const previousElement = selection.previousElementSibling

    const nextSelection = selections[i + 1]
    if (!nextSelection) {
      return
    }

    if (nextSelection !== nextElement) {
      isDown = false
    }

    if (nextSelection !== previousElement) {
      isUp = false
    }
  })

  if (isUp) {
    return 'up'
  }

  if (isDown) {
    return 'down'
  }

  return null
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

export const nestGroupWithinParent = (stylesheet, elements) => {
  const { template } = constructShapeTemplate()
  const parentElement = appendNode(elements[0], template, 'before')

  elements.forEach((element) => {
    parentElement.appendChild(element)
  })

  return parentElement
}

export const nestIndividuallyWithinParent = (stylesheet, elements) => {
  const parentElements = elements.map((element) => {
    if (['html', 'body'].includes(element.parentElement.getAttribute('data-type'))) {
      return null
    }

    const { template } = constructShapeTemplate()

    const parentElement = appendNode(element, template, 'before')
    parentElement.appendChild(element)
    return parentElement
  }).filter(el => el !== null)

  return parentElements
}
