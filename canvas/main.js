import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

function appendRule(nodes) {
  for (const node of nodes) {
    try {
      const styles = JSON.parse(node.dataset.styles)

      const rule = `
        #${node.id} {
          ${
            Object.entries(styles.base).map(([k, v]) => {
              return `${k}: ${v};`
            }).join(' ')
          }
        }
      `

      window.baseStyleSheet.insertRule(rule)

      if (node.childNodes.length) {
        appendRule(node.childNodes)
      }
    } catch (error) {
      // do nothing
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.baseStyleSheet = new CSSStyleSheet()
  document.adoptedStyleSheets = [window.baseStyleSheet]

  // I hate having to do this
  window.baseStyleSheet.insertRule('#html {}')
  window.baseStyleSheet.insertRule('#body {}')

  const observer = new MutationObserver((mutations) => {
    const styleUpdates = new Map()

    for (const mutation of mutations) {
      switch (mutation.type) {
        case 'childList':
          appendRule(mutation.addedNodes)
          break
        case 'attributes':
          if (mutation.attributeName === 'data-styles') {
            const target = mutation.target
            const styles = JSON.parse(target.dataset.styles || '{"base":{}}')
            styleUpdates.set(`#${target.id}`, styles.base)
          }

          break
        case 'characterData':
          break
        default:
          break
      }
    }

    for (const cssRule of window.baseStyleSheet.cssRules) {
      if (styleUpdates.has(cssRule.selectorText)) {
        let styles = styleUpdates.get(cssRule.selectorText)
        for (const styleProp in styles) {
          let styleVal = styles[styleProp]
          if (styleVal !== cssRule.styleMap.get(styleProp)) {
            cssRule.styleMap.delete(styleProp)
            try {
              // since the CSSOM is typed, this can fail
              cssRule.styleMap.set(styleProp, styles[styleProp])
            } catch (error) {
              console.warn(error)
            }
          }
        }
      }
    }

  })

  observer.observe(document.getElementById('html'), {
    attributes: true,
    childList: true,
    subtree: true,
  })

  channel.post({
    action: 'canvas_did_load',
    data: {},
  })
})
