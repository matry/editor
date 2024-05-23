import { canvasDocument, canvasWindow } from './canvas'

export const getSharedStyles = (elements) => {
  const styleObjects = elements.map((element) => {
    let styles = null

    try {
      styles = JSON.parse(element.dataset.styles)
    } catch (error) {
      console.error(error)
      styles = {
        base: {},
      }
    }

    return styles
  })

  const sharedStyles = styleObjects.reduce((previous, current) => {
    const result = {
      base: {},
    }

    Object.keys(previous.base).forEach((key) => {
      if (previous[key] === current.base[key]) {
        result.base[key] = previous[key]
      }
    })

    return result
  })

  return sharedStyles
}

export const resetRules = () => {
  const sheet = canvasWindow()?.baseStyleSheet

  if (sheet) {
    for (let i = 0, l = Array.from(sheet.cssRules).length; i < l; i++) {
      try {
        sheet.deleteRule(i)
      } catch (error) {
        // do nothing
      }
    }
  }
}

export const updateRule = (selectorText, property, value) => {
  const doc = canvasDocument()

  const element = doc.querySelector(selectorText)

  if (!element) {
    return
  }

  try {
    const styles = JSON.parse(element.dataset.styles)

    if (value !== '') {
      styles.base[property] = value
    } else {
      delete styles.base[property]
    }

    element.setAttribute('data-styles', JSON.stringify(styles))
  } catch (error) {
    // do nothing
  }
}
