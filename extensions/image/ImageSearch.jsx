import { useState, useRef, useEffect } from 'react'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

const IMAGE_SEARCH_ID = 'image-search'

export default function ImageSearch() {
  const searchRef = useRef()
  const resultsRefs = useRef([])
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedLinks, setSelectedLinks] = useState([])
  const [highlightSrc, setHighlightSrc] = useState('')

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus()
    }
  }, [])

  useEffect(() => {
    if (resultsRefs.current.length) {
      resultsRefs.current[0].focus()
    }
  }, [searchResults])

  return (
    <div className="h-screen text-slate-300">

      <form
        onFocusCapture={() => {
          const link = document.activeElement.getAttribute('data-link')

          if (link) {
            setHighlightSrc(link)
          }
        }}

        onSubmit={async (e) => {
          e.preventDefault()
          e.stopPropagation()

          setIsLoading(true)

          const response = await fetch(`/api/image-search?q=${searchText}`)
          const data = await response.json()

          setSearchResults(data)
          setIsLoading(false)

          if (searchRef.current) {
            searchRef.current.parentElement.focus()
          }
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
            if (selectedLinks.length) {
              channel.post({
                action: 'confirm_replace_image_content',
                data: {
                  urls: selectedLinks,
                },
              })
              channel.post({ action: 'exit_extension', data: {} })
            } else {
              let link = document.activeElement.getAttribute('data-link')
              if (link) {
                channel.post({
                  action: 'confirm_replace_image_content',
                  data: {
                    urls: [link],
                  },
                })
                channel.post({ action: 'exit_extension', data: {} })
              }
            }

            return
          }

          if (e.metaKey && e.code === 'KeyS') {
            e.preventDefault()

            if (selectedLinks.length) {
              channel.post({
                action: 'confirm_replace_image_content',
                data: {
                  urls: selectedLinks,
                },
              })
              channel.post({ action: 'exit_extension', data: { save: true } })
            } else {
              let link = document.activeElement.getAttribute('data-link')
              if (link) {
                channel.post({
                  action: 'confirm_replace_image_content',
                  data: {
                    urls: [link],
                  },
                })
                channel.post({ action: 'exit_extension', data: { save: true } })
              }
            }

            return
          }

          switch (e.key) {
            case ' ':
              e.preventDefault()

              let linkId = document.activeElement.getAttribute('data-link')

              if (linkId) {
                if (selectedLinks.includes(linkId)) {
                  setSelectedLinks(selectedLinks.filter((n) => n !== linkId))
                } else {
                  setSelectedLinks([...selectedLinks, linkId])
                }
              }

              break
            case 'ArrowUp':
              e.preventDefault()

              let uIndex = document.activeElement.getAttribute('data-index')
              if (uIndex) {
                let newIndex = Number(uIndex) - 3

                let previousElement = document.querySelector(`[data-index="${newIndex}"]`)
                if (previousElement) {
                  previousElement.focus()
                }
              }
              break
            case 'ArrowDown':
              e.preventDefault()

              let dIndex = document.activeElement.getAttribute('data-index')
              if (dIndex) {
                let newIndex = Number(dIndex) + 3

                let nextElement = document.querySelector(`[data-index="${newIndex}"]`)
                if (nextElement) {
                  nextElement.focus()
                }
              }
              break
            case 'ArrowRight':
              e.preventDefault()
              let rIndex = document.activeElement.getAttribute('data-index')
              if (rIndex) {
                let newIndex = Number(rIndex) + 1

                let nextElement = document.querySelector(`[data-index="${newIndex}"]`)
                if (nextElement) {
                  nextElement.focus()
                }
              }
              break
            case 'ArrowLeft':
              e.preventDefault()
              let lIndex = document.activeElement.getAttribute('data-index')
              if (lIndex) {
                let newIndex = Number(lIndex) - 1

                let nextElement = document.querySelector(`[data-index="${newIndex}"]`)
                if (nextElement) {
                  nextElement.focus()
                }
              }
              break
            default:
              break
          }
        }}
        className="text-white h-full p-3"
      >
        <input
          id={IMAGE_SEARCH_ID}
          ref={searchRef}
          autoComplete="off"
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
          <>
            {searchResults.length !== 0 && (
              <div className="w-full aspect-square bg-neutral-700 bg-opacity-20 mt-3">
                {Boolean(highlightSrc) && (
                  <img className="w-full h-full object-cover" src={highlightSrc} />
                )}
              </div>
            )}

            <ul className="grid grid-cols-3 gap-3 mt-3">
              {searchResults.map((result, i) => {
                const isSelected = selectedLinks.includes(result.src)

                return (
                  <li
                    key={`link_${i}`}
                  >
                    <button
                      data-index={i}
                      data-link={result.src}
                      ref={(el) => {
                        resultsRefs.current[i] = el
                      }}
                      className="relative aspect-square overflow-hidden opacity-80 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <img
                        src={result.src}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <span className="w-4 h-4 rounded-full bg-green-500 text-white absolute top-1 right-1 flex items-center justify-center">
                          <svg width="8" height="8" viewBox="0 0 24 24"><path className="fill-white" d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg>
                        </span>
                      )}
                    </button>
                  </li>
                )
              })}
            </ul>
          </>
        )}
      </form>
    </div>
  )
}
