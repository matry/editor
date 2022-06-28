const content = {
  commands: {
    Escape: 'exit',
  },

  on_enter({ selections }) {
    const selection = selections[0]

    if (selection.firstChild && selection.firstChild.nodeType === 3) {
      selection.setAttribute('contenteditable', 'true')
      selection.focus()
    }
  },

  exit({ selections }) {
    selections[0].blur()
    selections[0].removeAttribute('contenteditable')

    return {
      mode: 'select',
    }
  },
}

export default content
