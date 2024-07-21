import classNames from 'classnames'
import {
  forwardRef, useEffect, useRef, useState,
} from 'react'
import properties from '../../utils/css-properties'
import { Channel } from '../../utils/broadcast-channel'
import { uniq } from 'lodash'

const channel = new Channel('matry')

const cssProperties = properties.map((property) => {
  return property.property
})

function getPropertyObject(propertyName) {
  return properties.find((p) => p.property === propertyName)
}

const filter = (val) => {
  const exactMatches = []
  const startsWithMatches = []
  const fuzzyMatches = []

  cssProperties.forEach((property) => {
    if (property === val) {
      exactMatches.push(property)
      return
    }

    if (property.startsWith(val)) {
      startsWithMatches.push(property)
      return
    }

    if (property.includes(val)) {
      fuzzyMatches.push(property)
    }
  })

  const result = uniq([
    ...exactMatches,
    ...startsWithMatches,
    ...fuzzyMatches,
  ])

  return result
}

const StylePropertyInput = forwardRef(({
  align,
  value,
  setValue,
  placeholder,
  showAllByDefault,
  onSubmit,
}, ref) => {
  const formRef = useRef()
  const [suggestions, setSuggestions] = useState([])
  const [highlightIndex, setHighlightIndex] = useState(-1)

  // useEffect(() => {
  //   if (document.activeElement !== ref.current) {
  //     return
  //   }

  //   if (!showAllByDefault) {
  //     return
  //   }

  //   setSuggestions(cssProperties)
  // }, [values])

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

        const foundProperty = getPropertyObject(value)

        onSubmit(
          value,
          foundProperty ? foundProperty.values : [],
        )
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
          setSuggestions(filter(e.target.value))
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
        className="absolute left-0 right-0 max-w-full mt-1 overflow-x-hidden top-full bg-neutral-700 bg-opacity-90 max-h-72"
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

              const foundProperty = getPropertyObject(suggestion)

              onSubmit(suggestion, foundProperty ? foundProperty.values : [])
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

export default StylePropertyInput
