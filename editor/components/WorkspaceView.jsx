
/*

account
  workspace
    project
      file
        element
          style
            property
            value
              color
                

*/

const projects = [
  {
    id: 'a',
    name: 'My Project A',
  },
  {
    id: 'b',
    name: 'Homework Assignment',
  },
  {
    id: 'c',
    name: 'Test',
  },
  {
    id: 'd',
    name: 'Another Attempt',
  },
  {
    id: 'e',
    name: 'Silo',
  },
  {
    id: 'f',
    name: 'Framework Template Thing',
  },
]

export default function WorkspaceView() {
  const activeIndex = 3

  return (
    <div
      className="p-4 bg-black h-full"
    >
      <h2 className="text-neutral-200 text-sm leading-none mb-3">Projects</h2>

      <ul className="text-neutral-400 text-xs leading-none">
        {projects.map((project, i) => {
          return (
            <li
              key={project.id}
              className={`py-1 hover:text-white cursor-pointer ${i === activeIndex ? 'text-teal-500 hover:text-teal-500' : ''}`}
            >
              {project.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
