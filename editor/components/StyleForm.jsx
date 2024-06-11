import { object } from 'prop-types'
import { useEffect, useState, useRef } from 'react'
import { Channel } from '../../utils/broadcast-channel'
import properties from '../../utils/css-properties'
import FormInput from './FormInput'

const channel = new Channel('matry')

const cssProperties = properties.map(({ property }) => property)

const StyleForm = ({ styles }) => {
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
      className="text-xs h-screen bg-black relative"
      onClick={() => {
        channel.post({ action: 'exit_extension', data: {} })
      }}
    >
      <div
        className="relative overflow-visible text-white"
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <div className="p-5 overflow-x-hidden rounded bottom-full">
          <ul>
            {Object.entries(currentStyles).map(([stateKey, stateVal]) => {
              return (
                <li key={stateKey} className="w-full">
                  <h3 className="text-gray-100 font-semibold mb-2 text-sm">{stateKey}</h3>
                  <ul>
                    {Object.entries(stateVal).map(([styleKey, styleVal]) => {
                      return (
                        <li key={styleKey} className="flex items-center justify-between w-full mb-1">
                          <span className="text-gray-300">{styleKey}</span>
                          <span>{styleVal}</span>
                        </li>
                      )
                    })}
                  </ul>
                </li>
              )
            })}
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
              channel.post({
                action: 'update_selection_styles',
                data: {
                  property: property,
                  value: newValue,
                },
              })

              const newCurrentStyles = {
                base: {
                  ...currentStyles.base,
                },
              }

              if (newValue === '') {
                delete newCurrentStyles.base[property]
              } else {
                newCurrentStyles.base[property] = newValue
              }

              setCurrentStyles(newCurrentStyles)

              setProperty('')
              setValue('')

              propRef.current.focus()
            }}
          />
        </div>
      </div>
    </div>
  )
}

StyleForm.propTypes = {
  styles: object.isRequired,
}

export default StyleForm
