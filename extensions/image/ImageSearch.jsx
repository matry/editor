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

        className="text-white h-full p-3 flex flex-col"
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
          <div className="w-full h-full flex-grow items-center flex justify-center text-2xl text-white">
            <div className="w-14 h-14 relative">
              <svg
                className="w-14 h-14 align-middle fill-current overflow-hidden animate-spin"
                viewBox="0 0 1024 1024"
              >
                <path
                  d="M512.056 908.647c-84.516 0-166.416-27.084-235.266-78.637-84.15-63.028-138.741-155.109-153.675-259.2-14.934-104.119 11.559-207.816 74.588-291.994 130.162-173.812 377.438-209.25 551.194-79.172 72.844 54.562 124.819 133.228 146.391 221.484 3.684 15.103-5.569 30.319-20.644 34.003-15.075 3.572-30.319-5.541-34.003-20.644-18.45-75.628-63-143.044-125.466-189.816-148.866-111.516-360.844-81.112-472.444 67.866-54.028 72.141-76.725 161.016-63.9 250.256 12.797 89.241 59.597 168.131 131.737 222.131 149.006 111.656 360.956 81.197 472.5-67.781 29.194-39.009 49.219-82.716 59.456-129.938 3.319-15.188 18.366-24.834 33.441-21.544 15.188 3.291 24.834 18.281 21.544 33.441-12.009 55.181-35.353 106.2-69.413 151.762-63.028 84.15-155.109 138.769-259.256 153.675-18.984 2.756-37.941 4.106-56.784 4.106z"
                />
              </svg>
            </div>
          </div>
        )}

        {!isLoading && (
          <>
            {searchResults.length !== 0 && (
              <div className="w-full aspect-square bg-neutral-700 bg-opacity-20 mt-3 overflow-hidden">
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
                    className="aspect-square"
                  >
                    <button
                      data-index={i}
                      data-link={result.src}
                      ref={(el) => {
                        resultsRefs.current[i] = el
                      }}
                      className="relative w-full h-full overflow-hidden opacity-80 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      onKeyDown={function(e) {
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

                            let prevElement = document.querySelector(`[data-index="${i - 3}"]`)
                            if (prevElement) {
                              prevElement.focus()
                            }
                            break
                          case 'ArrowDown':
                            e.preventDefault()

                            let nextElement = document.querySelector(`[data-index="${i + 3}"]`)
                            if (nextElement) {
                              nextElement.focus()
                            }
                            break
                          case 'ArrowRight':
                            e.preventDefault()

                            let rElement = document.querySelector(`[data-index="${i + 1}"]`)
                            if (rElement) {
                              rElement.focus()
                            }
                            break
                          case 'ArrowLeft':
                            e.preventDefault()

                            let lElement = document.querySelector(`[data-index="${i - 1}"]`)
                            if (lElement) {
                              lElement.focus()
                            }
                            break
                          default:
                            break
                        }
                      }}
                    >
                      <img
                        src={result.src}
                        className="w-full h-full object-cover block"
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
