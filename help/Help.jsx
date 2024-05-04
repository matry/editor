import LegendMenu from "./LegendMenu"

const editorCommands = [
  [
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
      name: 'Toggle box model',
      tooltip: 'up',
      keys: ['b'],
    }
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
    {
      name: 'Add text as parent',
      tooltip: 'left',
      keys: ['a', '›', 't', '›', '←'],
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
    {
      name: 'Add image as parent',
      tooltip: 'left',
      keys: ['a', '›', 'i', '›', '←'],
    },
  ],
]

const editCommands = [
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
      name: 'Edit image randomly',
      tooltip: 'up',
      keys: ['e', '›', 'i', '›', 'r'],
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

      <p className="text-slate-300 text-xs max-w-xl">
        This editor is primarily keyboard-driven.
        Below is a cheatsheet showing the available list of commands.
      </p>

      <div className="flex flex-wrap gap-8 mt-6">
        <LegendMenu
          title="Editor"
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
