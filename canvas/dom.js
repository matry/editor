import { LoremIpsum } from 'lorem-ipsum'
import { randomColor, randomId, randomNumber } from './utils'
import { randomImage } from './utils'

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
})

export const randomStyles = (id) => {
  return `#${id} {
    width: 100%;
    min-height: 50px;
    background-color: ${randomColor()};
  }`
}

export const constructTemplate = (elementType) => {
  switch (elementType) {
    case 'text':
      return constructTextTemplate()
    case 'image':
      return constructImageTemplate()
    case 'video':
      return constructVideoTemplate()
    default:
      return constructShapeTemplate()
  }
}

export const constructShapeTemplate = () => {
  const id = randomId()

  return {
    id,
    cssRules: {
      'display': 'block',
      'width': '100$%',
      'min-height': '50px',
      'padding': '10px',
      'background-color': randomColor(),
    },
    template: `<div data-type="shape" id=${id}></div>`,
  }
}

export const constructTextTemplate = () => {
  const text = lorem.generateWords(2)
  const id = randomId()

  return {
    id,
    cssRules: {
      'display': 'block',
      'width': '100%',
      'padding': '10px',
      'user-select': 'none',
      'background-color': randomColor(),
    },
    template: `<span data-type="text" id="${id}">${text}</span>`,
  }
}

export const constructImageTemplate = () => {
  const id = randomId()
  const { url, width, height } = randomImage()

  return {
    id,
    cssRules: {
      'display': 'block',
      'user-select': 'none',
    },
    template: `<img data-type="image" width="${width}px" height="${height}px" id="${id}" src="${url}" />`,
  }
}

export const constructVideoTemplate = () => {
  const id = randomId()
  return {
    id,
    cssRules: {
      'display': 'block',
    },
    template: `
      <iframe data-type="video" id="${id}" width="560" height="315" src="https://www.youtube.com/embed/9ZfN87gSjvI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `
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
  }

  const parser = new DOMParser()

  const doc = parser.parseFromString(template, 'text/html')
  const element = doc.body.firstElementChild
  target.insertAdjacentElement(insertionPoint, element)

  return element
}

export const firstSelection = () => {
  return window.state.current.selections[0] || null
}

export const lastSelection = () => {
  return window.state.current.selections[window.state.current.selections.length - 1] || null
}

export const selectAll = (selections) => {
  if (!selections.length) {
    return Array.from(document.body.children)
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
    return
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
  if (!selections.length) {
    const bodyChildren = Array.from(document.body.children)

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

  return selections.map((selection) => {
    return selection.parentElement.firstElementChild
  }).filter((selection, index, self) => self.indexOf(selection) === index)
}

export const selectLastSiblingNode = (selections) => {
  if (!selections.length) {
    return selections
  }

  return selections.map((selection) => {
    return selection.parentElement.lastElementChild
  }).filter((selection, index, self) => self.indexOf(selection) === index)
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
    element.remove()
  })
}

export const isInBounds = (element) => {
  if (!element) {
    return true
  }

  const { top, right, bottom, left } = element.getBoundingClientRect()

  return top >= 0 && left >= 0 && right <= window.innerWidth && bottom <= window.innerHeight
}

export const serialize = (element) => {
  const serializer = new XMLSerializer()

  return serializer.serializeToString(element)
}
