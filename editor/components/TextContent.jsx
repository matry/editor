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
    }
  }, [])

  useEffect(() => {
    if (!value) {
      return
    }

    if (inputRef.current?.innerHTML !== value) {
      inputRef.current.innerHTML = value
    }

    channel.post({
      action: 'update_selection_text',
      data: {
        value,
      },
    })
  }, [value])

  return (
    <div className="flex justify-center items-center h-screen w-full bg-black relative overflow-x-hidden" id="root">
      <div
        ref={inputRef}
        contentEditable
        tabIndex={0}
        role="textbox"
        placeholder="write some text here"
        className="text-gray-50 placeholder:text-gray-300 appearance-none bg-none border-none bg-transparent focus:outline-none absolute inset-0 p-5 text-xs"
        onInput={(e) => {
          e.stopPropagation()
          setValue(e.target.innerHTML)
        }}

        onBlur={() => {
          channel.post({ action: 'exit_extension', data: {} })
        }}

        onKeyDown={(e) => {
          e.stopPropagation()

          if (e.key === 'Escape') {
            channel.post({ action: 'exit_extension', data: {} })
          }

          if (e.metaKey && e.code === 'KeyS') {
            e.preventDefault()
            channel.post({ action: 'exit_extension', data: { save: true } })
          }
        }}
      />
    </div>
  )
}
