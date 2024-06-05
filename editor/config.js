import { LoremIpsum } from 'lorem-ipsum'
import { randomColor } from './utils'

const lorem = new LoremIpsum()

export const config = {
  defaults: {
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
            'padding': '10px',
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
