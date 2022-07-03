/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-autofocus */
import { faker } from '@faker-js/faker'
import classNames from 'classnames'
import { number } from 'prop-types'
import { useRef, useState } from 'react'

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
  // const [selectedCategory, setSelectedCategory] = useState('')
  // const [images, setImages] = useState([])

  return (
    <div
      className="absolute top-0 left-0 right-0 w-screen h-screen flex justify-center z-10 pt-60 overflow-x-hidden"
      onClick={() => {
        window.parent.postMessage({ action: 'exit_extension', data: {} })
      }}
    >
      <form
        className="bg-slate-800 text-white p-6 rounded relative overflow-visible shadow h-fit"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault()

          window.parent.postMessage({
            action: 'update_selection_styles',
            data: {
              // property: prop,
              // value: val,
            },
          })

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
          />
          <button
            type="submit"
            disabled={!url}
            className="p-2 text-white bg-blue-600 hover:bg-blue-700 cursor-pointer text-sm leading-none mt-3 rounded-full px-4 disabled:opacity-40"
          >
            Ok
          </button>
        </div>

        <div>
          <label
            className="mr-1 block text-xs mb-3"
          >
            Or choose a category
          </label>
          <ul className="grid grid-cols-3 gap-2">
            {categories.map((category) => (
              <li
                key={category}
              >
                <button
                  type="button"
                  className={classNames(
                    'hover:text-blue-500 text-slate-200 bg-transparent cursor-pointer text-sm border border-slate-600 rounded leading-none p-3 w-full',
                  )}
                  onClick={() => {
                    const newImages = []
                    for (let i = 0; i < count; i++) {
                      newImages.push(faker.image[category](100, 100))
                    }

                    window.parent.postMessage({
                      action: 'confirm_replace_content',
                      data: {
                        images: newImages,
                      },
                    })
                  }}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* <input type="submit" className="hidden" /> */}

        {/* {images.length > 0 && (
        <ul
          className="top-full absolute left-0 right-0 mt-1 max-w-full max-h-72 overflow-y-hidden flex gap-2"
        >
          {images.map((image) => (
            <li
              key={image}
              className="overflow-hidden rounded"
            >
              <img src={image} alt="suggested" />
            </li>
          ))}
        </ul>
        )} */}
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
