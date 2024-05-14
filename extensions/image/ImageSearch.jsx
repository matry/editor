import { useState, useRef, useEffect } from 'react'
import { randomId } from '../../controller/utils'
import { isInBounds } from '../../controller/dom'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

const url = ''

const IMAGE_SEARCH_ID = 'image-search'

export default function ImageSearch() {
  const searchRef = useRef()
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])

  useEffect(() => {
    const activeItem = searchResults[activeIndex]
    if (activeItem && activeItem.id) {
      const activeElement = document.getElementById(activeItem.id)
      if (activeElement) {
        activeElement.focus()
      }
    } else {
      searchRef.current?.focus()
    }

  }, [activeIndex])

  return (
    <div className="h-screen text-slate-300">

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()

          setIsLoading(true)

          const response = await fetch(`/api/image-search?q=${searchText}`)
          const data = await response.json()
          setSearchResults(data)
          setIsLoading(false)
        }}
        onKeyDown={(e) => {
          e.stopPropagation()

          if (e.key === 'Escape') {
            if (document.activeElement?.id === IMAGE_SEARCH_ID) {
              channel.post({ action: 'exit_extension', data: {} })
            } else {
              searchRef.current?.focus()
            }

            return
          }

          if (e.key === 'Enter') {
            if (document.activeElement?.hasAttribute('data-link')) {
              const imageLink = document.activeElement.getAttribute('data-link')
              channel.post({
                action: 'confirm_replace_content',
                data: {
                  urls: [imageLink],
                },
              })
            }

            return
          }

          let newActiveIndex = -1

          switch (e.key) {
            case 'ArrowUp':
              if (activeIndex === 0) {
                newActiveIndex = -1
              } else {
                newActiveIndex = Math.min(
                  Math.max(
                    activeIndex - 2,
                    -1,
                  ),
                  searchResults.length - 1,
                )
              }
              break
            case 'ArrowDown':
              if (activeIndex === -1) {
                newActiveIndex = 0
              } else {
                newActiveIndex = Math.min(
                  Math.max(
                    activeIndex + 2,
                    0,
                  ),
                  searchResults.length - 1,
                )
              }
              break
            case 'ArrowRight':
              if (activeIndex > -1) {
                newActiveIndex = Math.min(
                  Math.max(
                    activeIndex + 1,
                    0,
                  ),
                  searchResults.length - 1,
                )
              }
              break
            case 'ArrowLeft':
              newActiveIndex = Math.min(
                Math.max(
                  activeIndex - 1,
                  0,
                ),
                searchResults.length - 1,
              )
              break
            default:
              newActiveIndex = activeIndex
              break
          }

          setActiveIndex(newActiveIndex)
        }}
        className="text-white h-full p-3"
      >
        <input
          id={IMAGE_SEARCH_ID}
          ref={searchRef}
          type="text"
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          className="text-white text-sm block bg-transparent border-none outline-none"
          value={searchText}
          placeholder="Search for an image"
        />
        <input type="submit" className="hidden" />

        {isLoading && (
          <div className="w-full h-full items-center flex justify-center text-2xl text-white">loading</div>
        )}

        {!isLoading && (
          <ul className="grid grid-cols-2 gap-3 pt-5">
            {searchResults.map((result, i) => {
              return (
                <li
                  tabIndex="0"
                  data-link={result.src}
                  id={result.id}
                  key={`link_${i}`}
                  className="aspect-square overflow-hidden border-slate-700 border-2 focus:outline-none focus:border-white focus:shadow-md focus:shadow-teal-500"
                >
                  <img
                    src={result.src}
                    className="w-full h-full object-cover"
                  />
                </li>
              )
            })}
          </ul>
        )}
      </form>
    </div>
  )
}
