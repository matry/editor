import { useEffect, useState, useRef } from 'react'
import { Channel } from '../../utils/broadcast-channel'
import QuickInput from './QuickInput'
import quickCommands from '../../utils/quick-commands'

const channel = new Channel('matry')
const availableCommands = Object.keys(quickCommands)

const QuickForm = () => {
  const [value, setValue] = useState('')
  const cmdRef = useRef()

  useEffect(() => {
    if (cmdRef.current) {
      cmdRef.current.focus()
    }
  }, [])

  return (
    <div
      className="text-xs absolute bottom-0 left-0 right-0 flex justify-end flex-col px-5 pt-32 bg-gradient-to-t from-black to-transparent text-neutral-300"
      onClick={() => {
        channel.post({ action: 'exit_extension', data: {} })
      }}
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

          setValue('')

          cmdRef.current.focus()
        }}
      />
    </div>
  )
}

export default QuickForm
