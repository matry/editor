import classNames from 'classnames'
import {
  func, arrayOf, string, bool,
} from 'prop-types'
import {
  forwardRef, useEffect, useRef, useState,
} from 'react'

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

const FormInput = forwardRef(({
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

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault()

        onSubmit(value)
      }}
      className="relative m-0"
    >
      <input
        ref={ref}
        type="text"
        value={value}
        placeholder={placeholder}
        className={classNames(
          'bg-transparent focus:outline-none text-slate-50 selection:bg-slate-600 border-none p-6',
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
        className="absolute left-0 right-0 w-full py-4 mt-1 overflow-x-hidden rounded top-full bg-slate-700 bg-opacity-90 max-h-72"
      >
        {suggestions.map((suggestion, i) => (
          <li
            key={suggestion}
            className={classNames(
              'py-2 px-6 hover:bg-slate-400 transition-all hover:text-white cursor-pointer whitespace-nowrap',
              {
                'bg-slate-400': highlightIndex === i,
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

FormInput.propTypes = {
  align: string,
  placeholder: string,
  value: string,
  values: arrayOf(string),
  showAllByDefault: bool,
  setValue: func.isRequired,
  onSubmit: func.isRequired,
}

FormInput.defaultProps = {
  align: 'left',
  placeholder: '',
  value: '',
  values: [],
  showAllByDefault: false,
}

export default FormInput
