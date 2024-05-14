import axios from 'axios'
import url from 'url'

function randomId (prefix = 'id', postfix = '', length = 8) {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

  if (!length) {
    length = Math.floor(Math.random() * chars.length)
  }

  let str = ''
  for (let i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }

  const pre = prefix ? `${prefix}_` : ''
  const post = postfix ? `_${postfix}` : ''

  return `${pre}${str}${post}`
}

export const config = {}

export async function GET(request: Request) {
  try {
    const parsedUrl = url.parse(request.url, true)
    const queryParams = parsedUrl.query

    const domain = 'https://www.googleapis.com/customsearch/v1'
    const imageSearchUrl = `${domain}?key=${process.env.IMAGE_SEARCH_API_KEY}&cx=${process.env.IMAGE_SEARCH_CX}&searchType=image`
    const imageSearchRes = await axios.get(`${imageSearchUrl}&q=${queryParams.q || ''}`)

    const data = imageSearchRes.data.items.map((item) => {
      return {
        id: randomId(),
        src: item.link,
        mime: item.mime,
        width: item.image.width,
        height: item.image.height,
      }
    })

    return new Response(JSON.stringify(data))

  } catch (error) {
    console.error(error)
    return new Response(`Error: ${error.message}`)
  }
}
