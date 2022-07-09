const selectCommands = [
  {
    name: 'Select previous sibling',
    keys: ['↑'],
  },
  {
    name: 'Select next sibling',
    keys: ['↓'],
  },
  {
    name: 'Select parent',
    keys: ['←'],
  },
  {
    name: 'Select first child',
    keys: ['→'],
  },
  {
    name: 'Expand selection to previous sibling',
    keys: ['⇧', '↑'],
  },
  {
    name: 'Expand selection to next sibling',
    keys: ['⇧', '↓'],
  },
  {
    name: 'Select last sibling',
    keys: ['⌘', '↓'],
  },
  {
    name: 'Select first sibling',
    keys: ['⌘', '↑'],
  },
  {
    name: 'Save',
    keys: ['⌘', 's'],
  },
  {
    name: 'Select all siblings',
    keys: ['⌘', 'a'],
  },
]

const Help = () => (
  <div
    className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center w-screen h-screen"
    onClick={() => {
      window.parent.postMessage({ action: 'exit_extension', data: {} })
    }}
  >
    <div
      className="p-5 overflow-x-hidden rounded shadow bg-slate-800 text-slate-300 max-h-96"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="pb-1 mb-5 text-lg font-semibold text-white border-b border-dashed border-slate-600">Keyboard Shortcuts</h1>

      <h2 className="mb-3 text-sm font-semibold text-slate-50">Select Mode</h2>

      <ul className="flex flex-col gap-2 text-sm select-none">
        {selectCommands.map(({ name, keys }, i) => (
          <li
            key={`${name}_${i}`}
            className="flex justify-between"
          >
            <span className="mr-12">{name}</span>

            <ul className="flex items-center gap-1">
              {keys.map((key, y) => (
                <li
                  key={`key_${name}_${y}`}
                  className="block w-6 p-1 leading-none text-center rounded-sm bg-slate-600"
                >
                  {key}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default Help
