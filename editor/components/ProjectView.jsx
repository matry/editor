import { useState, useEffect } from 'react'
import { Channel } from '../../utils/broadcast-channel'

const channel = new Channel('matry')

const formatter = new Intl.DateTimeFormat('en-US', {
  // year: 'numeric',
  // month: 'long',
  // day: 'numeric',
  // hour: 'numeric',
  // minute: 'numeric',
  // second: 'numeric',
  // hour12: true,
})

export default function ProjectView(props) {
  const [selectedFileIndex] = useState(props.files.findIndex(f => f.id === props.activeFileId) || 0)

  const activeProject = props.projects.find((p) => p.id === props.activeProjectId)

  return (
    <section className="text-neutral-400 p-3 text-xs">
      <header className="mb-3">
        <dl>
          <dt className="mb-px">project</dt>
          <dd className="text-neutral-100">{activeProject ? (activeProject.name || 'Untitled Project') : 'Your Project'}</dd>
        </dl>
      </header>

      <h2 className="mb-px">files</h2>
      <ul>
        {props.files.map((file, i) => {
          const created = new Date(file.created_at)
          const lastModified = new Date(file.last_modified)
          const isActive = i === selectedFileIndex

          return (
            <li
              key={file.id}
              data-active={isActive ? 'on' : 'off'}
              className="flex items-baseline justify-between"
            >
              <strong className="text-neutral-100">{file.name || 'Untitled'}</strong>
              <span>last modified {formatter.format(lastModified)}</span>
            </li>
          )
        })}
      </ul>

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

        </ul>
      </form>
    </section>
  )
}
