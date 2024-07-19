import { LoremIpsum } from 'lorem-ipsum'
import { randomColor, randomId } from './utils'

const lorem = new LoremIpsum()

export const config = {
  defaults: {
    file: {
      content: () => {
        return `<html data-type="html" id="${randomId()}" data-styles='{"base":{}}'><head><style data-style-layer="base"></style></head><body data-type="body" id="${randomId()}" data-styles='{"base":{}}'><span id="${randomId()}" data-type="text" data-styles='{"base":{}}'>press h for help</span></body></html>`
      },
    },
    shape: {
      tag: 'div',
      styles: () => {
        return {
          base: {
            'display': 'block',
            'width': '100%',
            'padding': '10px',
            'background-color': randomColor(),
            'box-sizing': 'border-box',
          },
        }
      },
      content: () => {
        return null
      },
    },
    text: {
      tag: 'span',
      styles: () => {
        return {
          base: {
            'display': 'block',
            'color': randomColor(false),
            'box-sizing': 'border-box',
            'user-select': 'none',
            'line-height': '1',
          },
        }
      },
      content: () => {
        return lorem.generateSentences(1)
      },
    },
    image: {
      tag: 'img',
      styles: () => {
        return {
          base: {
            'display': 'block',
            'user-select': 'none',
            'max-width': '100%',
            'box-sizing': 'border-box',
          },
        }
      },
      content: () => {
        return '/placeholder-square.jpg'
      },
    },
  },
}
