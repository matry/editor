/* eslint-disable jsx-a11y/no-autofocus */
import { all } from 'known-css-properties'
import { useState, useRef } from 'react'
import classNames from 'classnames'

const cssProperties = all.filter((property) => !property.startsWith('-'))

const CSSInput = () => {
  const propRef = useRef()
  const [prop, setProp] = useState('')
  const [val, setVal] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(-1)

  const filter = (newProp) => cssProperties.filter((property) => property.includes(newProp))

  return (
    <div
      className="absolute top-0 left-0 right-0 w-screen h-screen flex justify-center items-center z-10"
      onClick={() => {
        window.parent.postMessage({ action: 'exit_extension', data: {} })
      }}
    >
      <form
        className="bg-slate-800 text-white p-6 rounded relative overflow-visible shadow"
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => {
          e.preventDefault()

          window.parent.postMessage({
            action: 'update_selection_styles',
            data: {
              property: prop,
              value: val,
            },
          })

          setProp('')
          setVal('')
          setSuggestions([])
          setHighlightIndex(-1)

          propRef.current.focus()
        }}
      >
        <div className="flex">
          <input
            ref={propRef}
            autoFocus
            type="text"
            value={prop}
            className="bg-transparent focus:outline-none text-slate-50 selection:bg-slate-600 border-none"
            onChange={(e) => {
              setProp(e.target.value)
              setSuggestions(filter(e.target.value))
              setHighlightIndex(-1)
            }}
            onKeyDown={(e) => {
              if (e.code === 'Escape') {
                window.parent.postMessage({ action: 'exit_extension', data: {} })
              }

              if (!suggestions.length) {
                return
              }

              switch (e.code) {
                case 'ArrowDown':
                  e.preventDefault()
                  setHighlightIndex(Math.min(highlightIndex + 1, suggestions.length - 1))
                  break
                case 'ArrowUp':
                  e.preventDefault()
                  setHighlightIndex(Math.max(highlightIndex - 1, 0))
                  break
                case 'Enter':
                  setProp(suggestions[highlightIndex])
                  setSuggestions([])
                  setHighlightIndex(-1)
                  e.preventDefault()
                  break
                default:
                  break
              }
            }}
          />
          <input
            type="text"
            value={val}
            className="bg-transparent focus:outline-none text-slate-50 selection:bg-slate-600 border-none text-right"
            onChange={(e) => {
              setVal(e.target.value)
            }}
            onFocus={() => {
              setSuggestions([])
              setHighlightIndex(-1)
            }}
            onKeyDown={(e) => {
              if (e.code === 'Escape') {
                window.parent.postMessage({ action: 'exit_extension', data: {} })
              }
            }}
          />
        </div>
        <input type="submit" className="hidden" />

        {suggestions.length > 0 && (
          <ul
            className="top-full absolute left-0 right-0 bg-slate-500 py-4 rounded mt-1 max-h-72 overflow-x-hidden"
          >
            {suggestions.map((suggestion, i) => (
              <li
                key={suggestion}
                className={classNames(
                  'py-2 px-6 hover:bg-slate-400 transition-all hover:text-white cursor-pointer',
                  {
                    'bg-slate-400': highlightIndex === i,
                    'bg-transparent': highlightIndex !== i,
                  },
                )}
                onClick={() => {
                  setProp(suggestion)
                  setSuggestions([])
                  setHighlightIndex(-1)
                }}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  )
}

export default CSSInput
