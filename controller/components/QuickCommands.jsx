import { useEffect, useState, useRef } from 'react'
import { Channel } from '../../utils/broadcast-channel'
import QuickInput from './QuickInput'
import quickCommands from '../../utils/quick-commands'

const channel = new Channel('matry')

const availableCommands = Object.keys(quickCommands)

const QuickForm = () => {
  const [property, setProperty] = useState('')
  const [value, setValue] = useState('')
  const cmdRef = useRef()

  useEffect(() => {
    if (cmdRef.current) {
      cmdRef.current.focus()
    }
  }, [])

  return (
    <div
      className="text-xs absolute bottom-0 left-0 right-0"
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
        {/* <div className="p-5 overflow-x-hidden rounded bottom-full">
          <ul>
            {Object.entries(currentStyles).map(([key, val]) => (
              <li key={key} className="flex items-center justify-between w-full mb-1">
                <span className="text-slate-300">{key}</span>
                <span>{val}</span>
              </li>
            ))}
          </ul>
        </div> */}
        <div
          className="flex"
        >
          <QuickInput
            ref={cmdRef}
            value={value}
            values={availableCommands}
            setValue={setValue}
            onSubmit={(newValue) => {
              setValue(newValue)

              const command = quickCommands[newValue]

              if (command) {
                channel.post(command)
              }

              setProperty('')
              setValue('')

              cmdRef.current.focus()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default QuickForm
