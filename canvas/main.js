import { Channel } from '../utils/broadcast-channel'

const channel = new Channel('matry')

document.addEventListener('DOMContentLoaded', () => {
  window.baseStyleSheet = new CSSStyleSheet()
  document.adoptedStyleSheets = [window.baseStyleSheet]

  const observer = new MutationObserver((mutations) => {
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
            const styles = JSON.parse(mutation.target.dataset.styles)

            const selectorText = `#${mutation.target.id}`
            const rules = Array.from(window.baseStyleSheet.cssRules)
            const index = rules.findIndex((rule) => rule.selectorText === selectorText)

            if (index !== -1) {
              window.baseStyleSheet.deleteRule(index)
            }

            const cssString = Object.entries(styles.base).map(([p, v]) => `${p}: ${v};`).join('\n')
            const ruleText = `
              ${selectorText} {
                ${cssString}
              }
            `

            window.baseStyleSheet.insertRule(ruleText)
          }

          break
        case 'characterData':
          break
        default:
          break
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
