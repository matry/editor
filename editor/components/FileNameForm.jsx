import { useEffect, useRef, useState } from 'react'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

export default function FileNameForm({ initialName }) {
  const ref = useRef(null)
  const [name, setName] = useState(initialName || '')

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [])

  return (
    <div
      className="text-xs absolute bottom-0 left-0 right-0 flex justify-end flex-col px-5 pt-32 bg-gradient-to-t from-black to-transparent text-neutral-300"
      onClick={() => {
        channel.post({ action: 'exit_extension', data: {} })
      }}
    >
      <form
        className="relative m-0 w-full bg-neutral-800"
        onSubmit={(e) => {
          e.preventDefault()

          if (name !== '') {
            channel.post({
              action: 'update_file_name',
              data: name,
            })
            channel.post({ action: 'exit_extension', data: {} })
          }
        }}
      >
        <input
          ref={ref}
          type="text"
          placeholder="Enter a unique name"
          className="bg-transparent focus:outline-none text-neutral-50 selection:bg-neutral-600 border-none w-full px-5 py-2"
          value={name}
          onKeyDown={(e) => {
            e.stopPropagation()

            if (e.code === 'Escape') {
              channel.post({ action: 'exit_extension', data: {} })
            }

            if (e.metaKey && e.code === 'KeyS') {
              e.preventDefault()

              if (name !== '') {
                channel.post({
                  action: 'update_file_name',
                  data: name,
                })
              }

              channel.post({ action: 'exit_extension', data: { save: true } })
            }
          }}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
      </form>
    </div>
  )
}
