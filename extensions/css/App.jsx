import { object } from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { properties } from '../../utils/css'
import FormInput from './FormInput'

const cssProperties = properties.map(({ property }) => property)

const App = ({ styles }) => {
  const [possibleValues, setPossibleValues] = useState([])
  const [property, setProperty] = useState('')
  const [currentStyles, setCurrentStyles] = useState(styles)
  const [value, setValue] = useState('')
  const propRef = useRef()
  const valRef = useRef()

  useEffect(() => {
    if (propRef.current) {
      propRef.current.focus()
    }
  }, [])

  return (
    <div
      className="z-10 text-xs"
      onClick={() => {
        window.parent.postMessage({ action: 'exit_extension', data: {} })
      }}
    >
      <div
        className="relative overflow-visible text-white rounded shadow bg-slate-800 bg-opacity-90"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="p-5 overflow-x-hidden rounded bg-slate-700 bottom-full bg-opacity-90">
          <ul>
            {Object.entries(currentStyles).map(([key, val]) => (
              <li key={key} className="flex items-center justify-between w-full mb-1">
                <span className="text-slate-300">{key}</span>
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </div>
        <div
          className="flex"
        >
          <FormInput
            ref={propRef}
            value={property}
            values={cssProperties}
            setValue={setProperty}
            onSubmit={(newProperty) => {
              setProperty(newProperty)

              const foundProperty = properties.find((p) => p.property === newProperty)

              if (!foundProperty || !foundProperty.values) {
                return
              }

              setPossibleValues(foundProperty.values)
              valRef.current.focus()
            }}
          />
          <FormInput
            ref={valRef}
            align="right"
            value={value}
            values={possibleValues}
            setValue={setValue}
            showAllByDefault
            onSubmit={(newValue) => {
              setValue(newValue)

              window.parent.postMessage({
                action: 'update_selection_styles',
                data: {
                  property,
                  value: newValue,
                },
              })

              setProperty('')
              setValue('')

              const newCurrentStyles = {
                ...currentStyles,
              }

              newCurrentStyles[property] = newValue

              setCurrentStyles(newCurrentStyles)

              propRef.current.focus()
            }}
          />
        </div>
      </div>
    </div>
  )
}

App.propTypes = {
  styles: object.isRequired,
}

export default App
