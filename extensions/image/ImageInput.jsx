import { faker } from '@faker-js/faker'
import { number } from 'prop-types'
import { useRef, useState } from 'react'
import { channel } from '../listener'

const categories = [
  'abstract',
  'animals',
  'avatar',
  'business',
  'cats',
  'city',
  'fashion',
  'food',
  'nature',
  'nightlife',
  'people',
  'sports',
  'technics',
  'transport',
]

const ImageInput = ({ count }) => {
  const propRef = useRef()
  const [url, setUrl] = useState('')

  return (
    <div
      className="w-screen h-screen z-10 pt-60 overflow-x-hidden"
      onClick={() => {
        channel.post({ action: 'exit_extension', data: {} })
      }}
    >
      <form
        className="bg-gray-900 text-white p-6 rounded relative overflow-visible shadow"
        onClick={(e) => e.stopPropagation()}
        onBlur={() => {
          channel.post({ action: 'exit_extension', data: {} })
        }}
        onSubmit={(e) => {
          e.preventDefault()

          propRef.current.focus()
        }}
      >
        <div className="mb-5">
          <label
            htmlFor="imgurl"
            className="mr-1 block text-xs"
          >
            Link
          </label>
          <input
            id="imgurl"
            type="text"
            ref={propRef}
            autoFocus
            value={url}
            placeholder="Paste url here"
            className="bg-transparent focus:outline-none text-slate-50 selection:bg-slate-600 border-none w-56 text-sm"
            onChange={(e) => {
              setUrl(e.target.value)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                try {
                  const url = new URL(e.target.value)

                  channel.post({
                    action: 'confirm_replace_content',
                    data: {
                      urls: [e.target.value],
                    },
                  })
                } catch (error) {
                  if (categories.includes(e.target.value)) {
                    const urls = []
                    for (let i = 0; i < count; i++) {
                      urls.push(faker.image[e.target.value](100, 100))
                    }

                    channel.post({
                      action: 'confirm_replace_content',
                      data: {
                        urls,
                      },
                    })
                  } else {
                    channel.post({ action: 'exit_extension', data: {} })
                  }
                }
              }
            }}
          />
        </div>
      </form>
    </div>
  )
}

ImageInput.propTypes = {
  count: number,
}

ImageInput.defaultProps = {
  count: 1,
}

export default ImageInput
