import { useEffect, useState, useRef } from 'react'
import { properties } from '../../utils/css'
import FormInput from './FormInput'

const cssProperties = properties.map(({ property }) => property)

const App = () => {
  const [possibleValues, setPossibleValues] = useState([])
  const [property, setProperty] = useState('')
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
      className="absolute top-0 left-0 right-0 w-screen h-screen flex justify-center items-center z-10"
      onClick={() => {
        window.parent.postMessage({ action: 'exit_extension', data: {} })
      }}
    >
      <div
        className="bg-slate-800 text-white rounded relative overflow-visible shadow flex gap-2"
        onClick={(e) => {
          e.stopPropagation()
        }}
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

            propRef.current.focus()
          }}
        />
      </div>
    </div>
  )
}

export default App
