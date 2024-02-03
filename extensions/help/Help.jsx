const selectCommands = [
  {
    name: 'Select previous sibling',
    tooltip: 'up',
    keys: ['↑'],
  },
  {
    name: 'Select next sibling',
    tooltip: 'down',
    keys: ['↓'],
  },
  {
    name: 'Select parent',
    tooltip: 'left',
    keys: ['←'],
  },
  {
    name: 'Select first child',
    tooltip: 'right',
    keys: ['→'],
  },
  {
    name: 'Expand selection to previous sibling',
    tooltip: 'shift + up',
    keys: ['⇧', '↑'],
  },
  {
    name: 'Expand selection to next sibling',
    tooltip: 'shift + down',
    keys: ['⇧', '↓'],
  },
  {
    name: 'Select last sibling',
    tooltip: 'cmd + down',
    keys: ['⌘', '↓'],
  },
  {
    name: 'Select first sibling',
    tooltip: 'cmd + up',
    keys: ['⌘', '↑'],
  },
  {
    name: 'Save',
    tooltip: 'cmd + s',
    keys: ['⌘', 's'],
  },
  {
    name: 'Select all siblings',
    tooltip: 'cmd + a',
    keys: ['⌘', 'a'],
  },
]

const Help = () => (
  <div
    className="z-10 w-screen h-screen"
    onClick={() => {
      window.parent.postMessage({ action: 'exit_extension', data: {} })
    }}
  >
    <div
      className="p-5 overflow-x-hidden bg-slate-800 text-slate-300"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="pb-1 mb-5 text-lg font-semibold text-white border-b border-dashed border-slate-600">Keyboard Shortcuts</h1>

      <h2 className="mb-3 text-sm font-semibold text-slate-50">Select Mode</h2>

      <ul className="flex flex-col gap-2 text-xs select-none">
        {selectCommands.map(({ name, keys, tooltip }, i) => (
          <li
            key={`${name}_${i}`}
            className="flex justify-between"
          >
            <span className="mr-12">{name}</span>

            <ul className="flex items-center gap-1" title={tooltip}>
              {keys.map((key, y) => (
                <li
                  key={`key_${name}_${y}`}
                  className="block w-6 p-1 leading-none text-center rounded-sm bg-slate-600 pointer-events-none"
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
