import { LoremIpsum } from 'lorem-ipsum'
import { randomColor } from '../utils/colors'

const lorem = new LoremIpsum()

export const config = {
  defaults: {
    shape: {
      styles: () => {
        return {
          'padding': '10px',
          'background-color': randomColor(),
        }
      },
      content: () => {
        return null
      },
    },
    text: {
      styles: () => {
        return {
          'padding': '10px',
          'background-color': randomColor(false),
        }
      },
      content: () => {
        return lorem.generateSentences(1)
      },
    },
  },
}
