import { useEffect, useState, useRef } from 'react'
import { Channel } from '../../utils/broadcast-channel'
import StyleValueInput from './StyleValueInput'
import StylePropertyInput from './StylePropertyInput'

const channel = new Channel('matry')

const StyleEditor = ({ styles }) => {
  const [possibleValues, setPossibleValues] = useState([])
  const [property, setProperty] = useState('')
  const [styleProperty, setStyleProperty] = useState('')
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
      className="text-xs h-full bg-black text-neutral-400 relative overflow-hidden"
      onClick={() => {
        channel.post({ action: 'exit_extension', data: {} })
      }}
    >
      <div
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <ul className="p-5">
          {Object.entries(currentStyles).map(([stateKey, stateVal]) => {
            return (
              <li key={stateKey} className="w-full">
                <h3 className="text-neutral-100 font-semibold mb-2">{stateKey}</h3>
                <ul>
                  {Object.entries(stateVal).map(([styleKey, styleVal]) => {
                    return (
                      <li key={styleKey} className="flex items-center justify-between w-full mb-1">
                        <span className="text-neutral-300">{styleKey}</span>
                        <span>{styleVal}</span>
                      </li>
                    )
                  })}
                </ul>
              </li>
            )
          })}
        </ul>

        <div>
          <StylePropertyInput
            ref={propRef}
            value={property}
            setValue={setProperty}
            onSubmit={(newProperty, newPossibleValues) => {
              if (typeof newProperty === 'object' && newProperty.hasOwnProperty('values')) {
                // setProperty(newProperty.property)
                // setStyleProperty(newProperty.property)
              } else {
                if (newPossibleValues) {
                  setPossibleValues(newPossibleValues)
                }

                setProperty(newProperty)
                setStyleProperty(newProperty)
              }
            }}
          />
          {styleProperty !== '' && (
            <StyleValueInput
              ref={valRef}
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
                setStyleProperty('')
                setValue('')

                propRef.current.focus()
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default StyleEditor
