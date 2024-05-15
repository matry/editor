import { useState, useRef, useEffect } from 'react'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

export default function TextContent({ textContents }) {
  const values = new Set(Object.values(textContents))

  const [value, setValue] = useState(values.size === 1 ? values.values().next().value : '')
  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [])

  useEffect(() => {
    channel.post({
      action: 'update_selection_text',
      data: {
        value,
      },
    })
  }, [value])

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-900 relative overflow-x-hidden" id="root">
      <textarea
        ref={inputRef}
        placeholder="write some text here"
        className="text-gray-50 placeholder:text-gray-300 appearance-none bg-none border-none bg-transparent focus:outline-none absolute inset-0 p-5 text-xs"
        id="textarea"
        spellCheck="false"
        value={value}
        autoFocus

        onInput={(e) => {
          e.stopPropagation()
          setValue(e.target.value)
        }}

        onBlur={() => {
          channel.post({ action: 'exit_extension', data: {} })
        }}

        onChange={(e) => {
          e.stopPropagation()
        }}

        onKeyDown={(e) => {
          e.stopPropagation()

          if (e.key === 'Escape') {
            channel.post({ action: 'exit_extension', data: {} })
          }
        }}
      />
    </div>
  )
}
