import { canvasDocument } from './canvas'

export const initStyle = (sheet) => {
  const doc = canvasDocument()

  sheet = sheet || new CSSStyleSheet()

  doc.adoptedStyleSheets = [sheet]

  return sheet
}

export const getStylesById = (stylesheet, id) => {
  const rules = []

  Array.from(stylesheet.cssRules).forEach((rule) => {
    const styleId = rule.selectorText.split('#')[1]

    if (id !== styleId) {
      return
    }

    rules.push({
      property: rule.style[0],
      value: rule.style[rule.style[0]],
    })
  })

  return rules
}

export const getCSSTextById = (stylesheet, id) => {
  const result = Array.from(stylesheet.cssRules)
    .map((rule) => {
      const styleId = rule.selectorText.split('#')[1]

      if (styleId !== id) {
        return null
      }

      return rule.cssText
    })
    .filter((rule) => rule !== null)

  return result
}

export const getStylesObjectById = (stylesheet, id) => {
  const styles = {}

  Array.from(stylesheet.cssRules).forEach((rule) => {
    const styleId = rule.selectorText.split('#')[1]

    if (id !== styleId) {
      return
    }

    Array.from(rule.style).forEach((property) => {
      styles[property] = rule.style[property]
    })
  })

  return styles
}

export const getSharedStylesByIds = (stylesheet, ids) => {
  const styleObjects = ids.map((id) => getStylesObjectById(stylesheet, id))

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

export const replaceAllRules = (stylesheet, cssRules) => {
  const rules = Array.from(stylesheet.cssRules)

  rules.forEach((rule, i) => {
    try {
      stylesheet.deleteRule(i)
    } catch (error) {
      // do nothing
    }
  })

  cssRules.forEach((cssRule) => {
    stylesheet.insertRule(cssRule)
  })
}

export const updateRule = (stylesheet, selectorText, property, value) => {
  const rules = Array.from(stylesheet.cssRules)
  const index = rules.findIndex((rule) => rule.selectorText === selectorText)

  const rule = rules[index]

  const newStyles = {}

  if (index !== -1) {
    stylesheet.deleteRule(index)
    Array.from(rule.style).forEach((p) => {
      newStyles[p] = rule.style[p]
    })
  }

  newStyles[property] = value

  const cssString = Object.entries(newStyles).map(([p, v]) => `${p}: ${v};`).join('\n')

  stylesheet.insertRule(`${selectorText} { ${cssString} }`)
}

export const appendRule = (id, property, value) => {
  const { stylesheet } = window.state.current

  const styles = getStylesById(stylesheet, id)

  styles.forEach((style, i) => {
    if (style.property === property) {
      stylesheet.deleteRule(i)
    }
  })

  stylesheet.insertRule(`#${id} { ${property}: ${value}; }`)
}

export const appendRules = (stylesheet, id, rules) => {
  const existingStyles = getStylesObjectById(stylesheet, id)

  const cssString = Object.entries(rules).map(([property, value]) => {
    if (existingStyles.hasOwnProperty(property)) {
      delete existingStyles[property]
    }

    return `${property}: ${value};`
  }).join('\n')

  const existingString = Object.entries(existingStyles).map(([property, value]) => `${property}: ${value};`).join('\n')

  const finalString = `
    #${id} {
      ${existingString}
      ${cssString}
    }
  `

  stylesheet.insertRule(finalString)
}

export const appendNewRules = (stylesheet, id, rules) => {
  const cssString = Object.entries(rules).map(([property, value]) => `${property}: ${value};`).join('\n')

  const finalString = `
    #${id} {
      ${cssString}
    }
  `

  stylesheet.insertRule(finalString)
}

export const appendStoredRules = (stylesheet, rules) => {
  rules.forEach((cssText) => {
    stylesheet.insertRule(cssText)
  })
}
