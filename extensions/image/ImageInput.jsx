import { faker } from '@faker-js/faker'
import { number } from 'prop-types'
import { useRef, useState } from 'react'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

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
            Search
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
