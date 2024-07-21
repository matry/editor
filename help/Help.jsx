import LegendMenu from "./LegendMenu"

const editorCommands = [
  [
    {
      name: 'Toggle interactive/edit mode',
      tooltip: 'up',
      keys: ['⌘', '+', 'enter'],
    },
    {
      name: 'Save file',
      tooltip: 'up',
      keys: ['⌘', '+', 's'],
    },
    {
      name: 'Export file',
      tooltip: 'up',
      keys: ['⌘', '+', 'e'],
    },
    {
      name: 'Clear file',
      tooltip: 'up',
      keys: ['⌘', '+', '⌫'],
    },
  ],
  [
    {
      name: 'Open help (cheatsheet)',
      tooltip: 'up',
      keys: ['h'],
    },
  ],
  [
    {
      name: 'Toggle box model overlay',
      tooltip: 'up',
      keys: ['t', '›', 'b'],
    },
  ],
]

const addCommands = [
  [
    {
      name: 'Add shape as previous sibling',
      tooltip: 'up',
      keys: ['a', '›', 's', '›', '↑'],
    },
    {
      name: 'Add shape as next sibling',
      tooltip: 'down',
      keys: ['a', '›', 's', '›', '↓'],
    },
    {
      name: 'Add shape as first child',
      tooltip: 'right',
      keys: ['a', '›', 's', '›', '→'],
    },
    {
      name: 'Add shape as parent',
      tooltip: 'left',
      keys: ['a', '›', 's','›',  '←'],
    },
  ],
  [
    {
      name: 'Add text as previous sibling',
      tooltip: 'up',
      keys: ['a', '›', 't', '›', '↑'],
    },
    {
      name: 'Add text as next sibling',
      tooltip: 'down',
      keys: ['a', '›', 't', '›', '↓'],
    },
    {
      name: 'Add text as first child',
      tooltip: 'right',
      keys: ['a', '›', 't', '›', '→'],
    },
  ],
  [
    {
      name: 'Add image as previous sibling',
      tooltip: 'up',
      keys: ['a', '›', 'i', '›', '↑'],
    },
    {
      name: 'Add image as next sibling',
      tooltip: 'down',
      keys: ['a', '›', 'i', '›', '↓'],
    },
    {
      name: 'Add image as first child',
      tooltip: 'right',
      keys: ['a', '›', 'i', '›', '→'],
    },
  ],
]

const editCommands = [
  [
    {
      name: 'Delete element',
      tooltip: 'up',
      keys: ['⌫'],
    }
  ],
  [
    {
      name: 'Edit styles',
      tooltip: 'up',
      keys: ['e', '›', 's'],
    },
    {
      name: 'Edit text',
      tooltip: 'up',
      keys: ['e', '›', 't'],
    },
    {
      name: 'Edit image',
      tooltip: 'up',
      keys: ['e', '›', 'i'],
    },
  ],
]

const selectCommands = [
  [
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
  ],
  [
    {
      name: 'Expand selection to previous sibling',
      tooltip: 'shift + up',
      keys: ['⇧', '+', '↑'],
    },
    {
      name: 'Expand selection to next sibling',
      tooltip: 'shift + down',
      keys: ['⇧', '+', '↓'],
    },
  ],
  [
    {
      name: 'Select last sibling',
      tooltip: 'cmd + down',
      keys: ['⌘', '+', '↓'],
    },
    {
      name: 'Select first sibling',
      tooltip: 'cmd + up',
      keys: ['⌘', '+', '↑'],
    },
    {
      name: 'Select all siblings',
      tooltip: 'cmd + a',
      keys: ['⌘', '+', 'a'],
    },
  ],
  [
    {
      name: 'Select all text elements',
      tooltip: 's t',
      keys: ['s', 't'],
    },
    {
      name: 'Select all image elements',
      tooltip: 's i',
      keys: ['s', 'i'],
    },
  ],
]

const Help = () => (
  <div
    className="z-10 w-screen h-full"
  >
    <div
      className="p-5 overflow-x-hidden text-slate-400"
      onClick={(e) => e.stopPropagation()}
    >
      <h1 className="pb-1 mb-5 text-lg font-semibold text-white border-b border-dashed border-slate-600">Cheat Sheet</h1>

      <p className="text-slate-300 text-sm max-w-3xl mb-1">
        Matry is a keyboard-driven tool for designing in the browser.
        It uses a mnemonic keyboard command system that is intended to feel like natural language.
        You can <a className="text-blue-500 underline" href="https://github.com/matry/editor">visit the GitHub repo</a> to learn more.
      </p>

      <p className="text-slate-300 text-sm max-w-prose mb-6">
        Below is a cheatsheet showing the available list of commands.
      </p>

      <div className="flex flex-wrap gap-8">
        <LegendMenu
          title="General"
          commands={editorCommands}
        />

        <LegendMenu
          title="Selecting Elements"
          commands={selectCommands}
        />

        <LegendMenu
          title="Adding Elements"
          commands={addCommands}
        />

        <LegendMenu
          title="Editing Elements"
          commands={editCommands}
        />
      </div>
    </div>
  </div>
)

export default Help
