import classNames from 'classnames'
import {
  forwardRef, useEffect, useRef, useState,
} from 'react'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

const filter = (val, values) => {
  const exactMatches = []
  const startsWithMatches = []
  const fuzzyMatches = []

  values.forEach((value) => {
    if (value === val) {
      exactMatches.push(value)
      return
    }

    if (value.startsWith(val)) {
      startsWithMatches.push(value)
      return
    }

    if (value.includes(val)) {
      fuzzyMatches.push(value)
    }
  })

  return [
    ...exactMatches,
    ...startsWithMatches,
    ...fuzzyMatches,
  ]
}

const StyleValueInput = forwardRef(({
  align,
  value,
  setValue,
  values,
  placeholder,
  showAllByDefault,
  onSubmit,
}, ref) => {
  const formRef = useRef()
  const [suggestions, setSuggestions] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(-1)

  useEffect(() => {
    if (document.activeElement !== ref.current) {
      return
    }

    if (!showAllByDefault) {
      return
    }

    setSuggestions(values)
  }, [values])

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()

        onSubmit(value)
      }}
      onKeyDown={(e) => {
        e.stopPropagation()
      }}
      className="relative m-0"
    >
      <input
        ref={ref}
        type="text"
        value={value}
        placeholder={placeholder}
        className={classNames(
          'bg-transparent focus:outline-none text-neutral-50 selection:bg-neutral-600 border-none w-full px-5 py-2',
          {
            'text-right': align === 'right',
            'text-left': align === 'left',
          },
        )}
        onChange={(e) => {
          setValue(e.target.value)
          setSuggestions(filter(e.target.value, values))
          setHighlightIndex(0)
        }}
        onKeyDown={(e) => {
          if (e.code === 'Escape') {
            if (highlightIndex > -1) {
              setHighlightIndex(-1)
              setSuggestions([])
            } else {
              channel.post({ action: 'exit_extension', data: {} })
            }
          }

          if (e.metaKey && e.code === 'KeyS') {
            e.preventDefault()
            channel.post({ action: 'exit_extension', data: { save: true } })
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
            case 'Tab':
              e.preventDefault()
              setSuggestions([])
              setHighlightIndex(-1)
              onSubmit(value)
              break
            case 'Enter':
              if (!suggestions[highlightIndex]) {
                return
              }

              setValue(suggestions[highlightIndex])
              setSuggestions([])
              setHighlightIndex(-1)
              break
            default:
              break
          }
        }}
      />
      <input type="submit" className="hidden" />
      {suggestions.length > 0 && (
        <ul
          className="absolute left-0 right-0 max-w-full mt-1 overflow-x-hidden top-full bg-neutral-700 text-neutral-50 bg-opacity-90 max-h-72"
        >
          {suggestions.map((suggestion, i) => (
            <li
              key={suggestion}
              className={classNames(
                'py-2 px-6 hover:bg-neutral-400 transition-all hover:text-white cursor-pointer whitespace-nowrap',
                {
                  'bg-neutral-400': highlightIndex === i,
                  'bg-transparent': highlightIndex !== i,
                },
              )}
              onClick={() => {
                setValue(suggestion)
                setSuggestions([])
                setHighlightIndex(-1)
                onSubmit(suggestion)
              }}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  )
})

export default StyleValueInput
