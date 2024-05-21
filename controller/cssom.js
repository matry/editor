import { canvasDocument, canvasWindow } from './canvas'

export const getStylesObjectById = (stylesheet, id) => {
  // const styles = {}

  // Array.from(stylesheet.cssRules).forEach((rule) => {
  //   const styleId = rule.selectorText.split('#')[1]

  //   if (id !== styleId) {
  //     return
  //   }

  //   Array.from(rule.style).forEach((property) => {
  //     styles[property] = rule.style[property]
  //   })
  // })

  // return styles
}

export const getSharedStyles = (elements) => {
  const styleObjects = elements.map((element) => {
    const styles = JSON.parse(element.dataset.styles)
    return styles.base
  })

  const sharedStyles = !styleObjects.length ? {} : styleObjects.reduce((previous, current) => {
    const result = {}

    Object.keys(previous).forEach((key) => {
      if (previous[key] === current[key]) {
        result[key] = previous[key]
      }
    })

    return result
  })

  return sharedStyles
}

export const getId = (rule) => rule.selectorText.split('#')[1]

export const resetRules = () => {
  const win = canvasWindow()

  if (win.baseStyleSheet) {
    const rules = Array.from(win.baseStyleSheet.cssRules)

    rules.forEach((rule, i) => {
      try {
        win.baseStyleSheet.deleteRule(i)
      } catch (error) {
        // do nothing
      }
    })
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
    styles.base[property] = value
    element.setAttribute('data-styles', JSON.stringify(styles))
  } catch (error) {
    // do nothing
  }
}

export const appendNewRules = (stylesheet, id, rules) => {
  // const cssString = Object.entries(rules).map(([property, value]) => `${property}: ${value};`).join('\n')

  // const finalString = `
  //   #${id} {
  //     ${cssString}
  //   }
  // `

  // stylesheet.insertRule(finalString)
}

export const appendStoredRules = (stylesheet, rules) => {
  // rules.forEach((cssText) => {
  //   stylesheet.insertRule(cssText)
  // })
}
