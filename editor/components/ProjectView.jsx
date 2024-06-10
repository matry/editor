import { useState, useEffect } from 'react'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

const formatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  hour12: true,
})

export default function ProjectView(props) {
  const [selectedFileIndex] = useState(props.files.findIndex(f => f.id === props.activeFileId) || 0)

  const activeProject = props.projects.find((p) => p.id === props.activeProjectId)

  useEffect(() => {
    const list = document.getElementById('editor-project-list')
    if (!list) {
      return
    }

    const active = list.querySelector('[data-active="on"]')
    if (active) {
      active.focus()
    }

  }, [])



  return (
    <section>
      <header className="text-neutral-200 px-5">
        <h2>{activeProject ? (activeProject.name || 'Untitled Project') : 'Your Project'}</h2>
        <h2>Your Files</h2>
      </header>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
        onKeyDown={(e) => {
          e.stopPropagation()

          if (e.key === 'Escape') {
            channel.post({ action: 'exit_extension', data: {} })
          }
        }}
      >
        <ul id="editor-project-list" className="text-xs px-5">
          {props.files.map((file, i) => {
            const created = new Date(file.created_at)
            const lastModified = new Date(file.last_modified)
            const isActive = i === selectedFileIndex

            return (
              <li
                tabIndex="0"
                key={file.id}
                data-active={isActive ? 'on' : 'off'}
                className={isActive ? 'text-white' : 'text-neutral-500'}
              >
                <span><strong>file id:</strong> {file.id}</span>
                <br />
                <span><strong>file name:</strong> {file.name || 'Untitled'}</span>
                <br />
                <span><strong>created:</strong> {formatter.format(created)}</span>
                <br />
                <span><strong>modified:</strong> {formatter.format(lastModified)}</span>
              </li>
            )
          })}
        </ul>
      </form>
    </section>
  )
}
