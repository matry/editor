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
      className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center w-screen h-screen"
      onClick={() => {
        window.parent.postMessage({ action: 'exit_extension', data: {} })
      }}
    >
      <div
        className="relative flex gap-2 overflow-visible text-white rounded shadow bg-slate-800 bg-opacity-90"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="absolute w-full p-5 mb-2 rounded bg-slate-700 bottom-full bg-opacity-90">
          <ul>
            {Object.entries(currentStyles).map(([key, val]) => (
              <li key={key} className="flex items-center justify-between w-full mb-1">
                <span className="text-slate-300">{key}</span>
                <span className="font-semibold">{val}</span>
              </li>
            ))}
          </ul>
        </div>
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
  )
}

App.propTypes = {
  styles: object.isRequired,
}

export default App
