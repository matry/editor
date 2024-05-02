
const addCommands = [
  {
    name: 'Add shape as previous sibling',
    tooltip: 'up',
    keys: ['a', 's', '↑'],
  },
  {
    name: 'Add shape as next sibling',
    tooltip: 'down',
    keys: ['a', 's', '↓'],
  },
  {
    name: 'Add shape as first child',
    tooltip: 'right',
    keys: ['a', 's', '→'],
  },
  {
    name: 'Add shape as parent',
    tooltip: 'left',
    keys: ['a', 's', '←'],
  },
  {
    name: 'Add text as previous sibling',
    tooltip: 'up',
    keys: ['a', 't', '↑'],
  },
  {
    name: 'Add text as next sibling',
    tooltip: 'down',
    keys: ['a', 't', '↓'],
  },
  {
    name: 'Add text as first child',
    tooltip: 'right',
    keys: ['a', 't', '→'],
  },
  {
    name: 'Add text as parent',
    tooltip: 'left',
    keys: ['a', 't', '←'],
  },
  {
    name: 'Add image as previous sibling',
    tooltip: 'up',
    keys: ['a', 'i', '↑'],
  },
  {
    name: 'Add image as next sibling',
    tooltip: 'down',
    keys: ['a', 'i', '↓'],
  },
  {
    name: 'Add image as first child',
    tooltip: 'right',
    keys: ['a', 'i', '→'],
  },
  {
    name: 'Add image as parent',
    tooltip: 'left',
    keys: ['a', 'i', '←'],
  },
]

const editCommands = [
  {
    name: 'Edit styles',
    tooltip: 'up',
    keys: ['e', 's'],
  },
  {
    name: 'Edit text',
    tooltip: 'up',
    keys: ['e', 't'],
  },
  {
    name: 'Edit image randomly',
    tooltip: 'up',
    keys: ['e', 'i', 'r'],
  },
]

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
  // {
  //   name: 'Save',
  //   tooltip: 'cmd + s',
  //   keys: ['⌘', 's'],
  // },
  {
    name: 'Select all siblings',
    tooltip: 'cmd + a',
    keys: ['⌘', 'a'],
  },
]

const Help = () => (
  <div
    className="z-10 w-screen h-screen"
  >
    <div
      className="p-5 overflow-x-hidden bg-gray-900 text-slate-300"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="pb-1 mb-5 text-lg font-semibold text-white border-b border-dashed border-slate-600">Legend</h1>

      <p className="text-slate-300 text-xs">This editor is primarily driven by keyboard commands. Refer to the list below.</p>

      <h2 className="mb-3 mt-6 text-sm font-semibold text-slate-50">Selecting Elements</h2>
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

      <h2 className="mb-3 mt-6 text-sm font-semibold text-slate-50">Adding Elements</h2>
      <ul className="flex flex-col gap-2 text-xs select-none">
        {addCommands.map(({ name, keys, tooltip }, i) => (
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

      <h2 className="mb-3 mt-6 text-sm font-semibold text-slate-50">Edit Elements</h2>
      <ul className="flex flex-col gap-2 text-xs select-none">
        {editCommands.map(({ name, keys, tooltip }, i) => (
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
