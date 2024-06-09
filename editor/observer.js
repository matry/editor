import { Channel } from '../utils/broadcast-channel'
import { canvasDocument, canvasStyleSheet } from './canvas'
import { appendRule } from './cssom'

const channel = new Channel('matry')

export function initCanvasDOMObserver() {
  const doc = canvasDocument()
  const sheet = canvasStyleSheet()

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

            if (!target.id) {
              continue
            }

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

    if (styleUpdates.size === 0) {
      return
    }

    for (const cssRule of sheet.cssRules) {
      if (styleUpdates.has(cssRule.selectorText)) {
        let styles = styleUpdates.get(cssRule.selectorText)

        for (const styleProp in styles) {
          let styleVal = styles[styleProp]
          let existingStyleValue = cssRule.styleMap.get(styleProp)

          if (existingStyleValue === null || styleVal !== existingStyleValue.toString()) {
            cssRule.styleMap.delete(styleProp)
            try {
              cssRule.style.setProperty(styleProp, styles[styleProp])
            } catch (error) {
              console.warn(error)
            }
          }
        }
      }
    }

    channel.post({ action: 'canvas_did_render' })
  })

  const html = doc.querySelector('html')

  observer.observe(html, {
    attributes: true,
    childList: true,
    subtree: true,
  })
}
