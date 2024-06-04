import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

document.addEventListener('DOMContentLoaded', () => {
  window.baseStyleSheet = new CSSStyleSheet()
  document.adoptedStyleSheets = [window.baseStyleSheet]

  const observer = new MutationObserver((mutations) => {
    const styleUpdates = new Map()

    for (const mutation of mutations) {
      switch (mutation.type) {
        case 'childList':
          for (const addedNode of mutation.addedNodes) {
            try {
              const styles = JSON.parse(addedNode.dataset.styles)

              const rule = `
                #${addedNode.id} {
                  ${
                    Object.entries(styles.base).map(([k, v]) => {
                      return `${k}: ${v};`
                    }).join(' ')
                  }
                }
              `

              window.baseStyleSheet.insertRule(rule)
            } catch (error) {
              // do nothing
            }
          }
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
            cssRule.styleMap.set(styleProp, styles[styleProp])
          }
        }
      }
    }

  })

  observer.observe(document.querySelector('html'), {
    attributes: true,
    childList: true,
    subtree: true,
  })

  channel.post({
    action: 'canvas_did_load',
    data: {},
  })
})
